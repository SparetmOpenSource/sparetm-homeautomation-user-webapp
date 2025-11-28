import React, { createContext, useContext, useEffect, useRef, useState, useMemo } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useAppDispatch, useAppSelector } from '../Features/ReduxHooks';
import { updateDevice } from '../Features/Device/DeviceSlice';
import { getWebSocketUrl } from '../Api.tsx/ProfileConfigApis';
import { toClientMqttSocketTopic, socketUrlPostFix } from '../Data/Constants';
import { useReactQuery_Get } from '../Api.tsx/useReactQuery_Get';
import { GET_WEBSOCKET_URL_QUERY_ID } from '../Data/QueryConstant';
import { displayToastify, handleClickForBlinkNotification } from '../Utils/HelperFn';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../Data/Enum';
import { useTheme } from '../Pages/ThemeProvider';
import { dark_colors, light_colors } from '../Data/ColorConstant';

// ... (existing code)

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

interface WebSocketContextType {
    connectionStatus: ConnectionStatus;
    connect: () => void;
    disconnect: () => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within WebSocketProvider');
    }
    return context;
};

interface WebSocketProviderProps {
    children: React.ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
    const [wsUrl, setWsUrl] = useState<string | null>(null);
    const clientRef = useRef<Client | null>(null);
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const reconnectAttemptsRef = useRef(0);
    const dispatch = useAppDispatch();
    const darkTheme = useTheme();
    
    const color = useMemo(
        () => (darkTheme ? dark_colors : light_colors),
        [darkTheme],
    );

    const MAX_RECONNECT_ATTEMPTS = 10;
    const BASE_RECONNECT_DELAY = 1000; // 1 second

    const getReconnectDelay = () => {
        // Exponential backoff: 1s, 2s, 4s, 8s, 16s, max 30s
        const delay = Math.min(
            BASE_RECONNECT_DELAY * Math.pow(2, reconnectAttemptsRef.current),
            30000
        );
        return delay;
    };
    
    // Get authentication state from Redux
    const token = useAppSelector((state) => state.user.token);
    const admin = useAppSelector((state) => state.user.admin);
    const profileId = useAppSelector((state) => state.user.profileId);

    // Fetch WebSocket URL using React Query
    // This approach is more secure as the backend can return the actual service URL
    // without exposing internal routing details to the client
    const { 
        isLoading: isLoadingWsUrl, 
        refetch, 
        isFetching 
    } = useReactQuery_Get(
        GET_WEBSOCKET_URL_QUERY_ID,
        () => getWebSocketUrl(),
        (data) => {
            // Handle response structure: { url: ["http://..."], topic: [...] }
            const responseData = data?.data?.body || data?.data;
            
            if (responseData?.url && Array.isArray(responseData.url) && responseData.url.length > 0) {
                // Backend returns complete URL, use it as-is
                const fullUrl = responseData.url[0];
                console.log('[WebSocket] Fetched URL:', fullUrl);
                setWsUrl(fullUrl);
            } else {
                console.error('[WebSocket] Invalid URL response:', responseData);
                setConnectionStatus('error');
            }
        },
        (error) => {
            console.error('[WebSocket] Failed to fetch URL:', error);
            setConnectionStatus('error');
            // If fetching URL fails, schedule a retry
            scheduleReconnect();
        },
        !!token && !!admin && !!profileId, // Only fetch if authenticated AND profile selected
        true, // refetch on mount
        false, // don't refetch on window focus
        false, // no refetch interval
        false, // no background refetch
        300000, // cache for 5 minutes
        300000, // stale after 5 minutes
    );

    const connectToWebSocket = (url: string) => {
        if (clientRef.current?.connected) {
            console.log('[WebSocket] Already connected');
            return;
        }

        try {
            setConnectionStatus('connecting');
            console.log('[WebSocket] Connecting to:', url);

            // Create SockJS instance
            const socket = new SockJS(url);

            // Create STOMP client
            const client = new Client({
                webSocketFactory: () => socket as any,
                debug: (str) => {
                    console.log('[STOMP Debug]', str);
                },
                reconnectDelay: 0, // We handle reconnection manually
                heartbeatIncoming: 10000,
                heartbeatOutgoing: 10000,
            });

            client.onConnect = () => {
                console.log('[WebSocket] Connected successfully');
                setConnectionStatus('connected');
                reconnectAttemptsRef.current = 0;

                // Stop blinking if it was active
                if (blinkIntervalRef.current) {
                    clearInterval(blinkIntervalRef.current);
                    blinkIntervalRef.current = null;
                }
                
                displayToastify(
                    'Real-time connection established',
                    !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
                    TOASTIFYSTATE.SUCCESS,
                );

                // Subscribe to device updates topic
                client.subscribe(toClientMqttSocketTopic, (message) => {
                    try {
                        const payload = JSON.parse(message.body);
                        console.log('[WebSocket] Received update:', payload);

                        // Dispatch Redux action to update device
                        // Expected payload format: { deviceId: string, ...updates }
                        if (payload.deviceId) {
                            dispatch(updateDevice({
                                deviceId: payload.deviceId,
                                updates: payload
                            }));
                        }
                    } catch (error) {
                        console.error('[WebSocket] Error parsing message:', error);
                    }
                });
            };

            client.onStompError = (frame) => {
                console.error('[WebSocket] STOMP error:', frame.headers['message']);
                console.error('[WebSocket] Error details:', frame.body);
                setConnectionStatus('error');
                scheduleReconnect();
            };

            client.onWebSocketClose = () => {
                console.log('[WebSocket] Connection closed');
                setConnectionStatus('disconnected');
                
                // Only show error toast if it wasn't an intentional disconnect
                if (!isIntentionalDisconnectRef.current && reconnectAttemptsRef.current === 0) {
                    displayToastify(
                        'Real-time connection lost',
                        !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
                        TOASTIFYSTATE.ERROR,
                    );
                }
                
                if (!isIntentionalDisconnectRef.current) {
                    scheduleReconnect();
                }
            };

            client.onWebSocketError = (error) => {
                console.error('[WebSocket] WebSocket error:', error);
                setConnectionStatus('error');
            };

            clientRef.current = client;
            client.activate();

        } catch (error) {
            console.error('[WebSocket] Connection error:', error);
            setConnectionStatus('error');
            scheduleReconnect();
        }
    };

    const blinkIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const isIntentionalDisconnectRef = useRef(false);

    const scheduleReconnect = () => {
        if (isIntentionalDisconnectRef.current) return;

        if (reconnectAttemptsRef.current >= MAX_RECONNECT_ATTEMPTS) {
            // Only show error and blink ONCE when we hit the limit
            if (reconnectAttemptsRef.current === MAX_RECONNECT_ATTEMPTS) {
                console.error('[WebSocket] Max reconnection attempts reached');
                setConnectionStatus('error');
                
                displayToastify(
                    'Failed to reconnect. Please refresh the page.',
                    !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
                    TOASTIFYSTATE.ERROR,
                );
                
                // Initial blink
                handleClickForBlinkNotification(color, 'ERROR', dispatch);
                
                // Start persistent blink interval (every 5 seconds)
                if (blinkIntervalRef.current) clearInterval(blinkIntervalRef.current);
                blinkIntervalRef.current = setInterval(() => {
                    handleClickForBlinkNotification(color, 'ERROR', dispatch);
                }, 5000);

                // Increment to ensure we don't re-enter this block
                reconnectAttemptsRef.current += 1;
            }
            return;
        }

        const delay = getReconnectDelay();
        reconnectAttemptsRef.current += 1;

        console.log(
            `[WebSocket] Reconnecting in ${delay}ms (attempt ${reconnectAttemptsRef.current}/${MAX_RECONNECT_ATTEMPTS})`
        );
        
        displayToastify(
            `Reconnecting... (Attempt ${reconnectAttemptsRef.current})`,
            !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.WARN,
        );

        reconnectTimeoutRef.current = setTimeout(() => {
            // Refetch URL before reconnecting to handle dynamic server ports
            console.log('[WebSocket] Refetching URL before reconnect...');
            refetch();
        }, delay);
    };

    const connect = () => {
        if (!token || !admin || !profileId) {
            console.log('[WebSocket] Not authenticated or no profile selected, skipping connection');
            return;
        }

        if (!wsUrl) {
            console.log('[WebSocket] URL not available yet');
            return;
        }

        isIntentionalDisconnectRef.current = false;
        connectToWebSocket(wsUrl);
    };

    const disconnect = () => {
        console.log('[WebSocket] Disconnecting...');
        isIntentionalDisconnectRef.current = true;
        
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
            reconnectTimeoutRef.current = null;
        }

        if (blinkIntervalRef.current) {
            clearInterval(blinkIntervalRef.current);
            blinkIntervalRef.current = null;
        }

        if (clientRef.current) {
            clientRef.current.deactivate();
            clientRef.current = null;
        }

        setConnectionStatus('disconnected');
        reconnectAttemptsRef.current = 0;
    };

    // Auto-connect when authenticated and URL is available
    useEffect(() => {
        if (token && admin && profileId && wsUrl && !isLoadingWsUrl && !isFetching) {
            connect();
        } else if (!token || !admin || !profileId) {
            disconnect();
        }
        // Note: We intentionally do NOT return disconnect() here.
        // disconnect() resets the reconnection attempts, which we don't want
        // when just refetching the URL or updating state.
    }, [token, admin, profileId, wsUrl, isLoadingWsUrl, isFetching]); // eslint-disable-line react-hooks/exhaustive-deps

    // Cleanup on unmount only
    useEffect(() => {
        return () => {
            disconnect();
        };
    }, []);

    const value: WebSocketContextType = {
        connectionStatus,
        connect,
        disconnect,
    };

    return (
        <WebSocketContext.Provider value={value}>
            {children}
        </WebSocketContext.Provider>
    );
};
