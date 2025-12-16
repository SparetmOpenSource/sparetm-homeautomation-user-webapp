import React, { createContext, useContext, useEffect, useRef, useState, useMemo } from 'react';
import useLocalStorage from '../Hooks/UseLocalStorage';
import { Client } from '@stomp/stompjs';

import { useAppDispatch, useAppSelector } from '../Features/ReduxHooks';
import { updateDevice, addDevice, removeDevice, updateAllDevices, updateDeviceDataStore, deleteDeviceDataStore } from '../Features/Device/DeviceSlice';
import { setNotification } from '../Features/Notification/NotificationSlice';
import { getWebSocketUrl } from '../Api.tsx/ProfileConfigApis';
import { RoutePath, WEBSOCKET_TOPIC_EVENTS } from '../Data/Constants';
import { useReactQuery_Get } from '../Api.tsx/useReactQuery_Get';
import { GET_WEBSOCKET_URL_QUERY_ID } from '../Data/QueryConstant';
import { displayToastify, handleClickForBlinkNotification, playNotificationSound } from '../Utils/HelperFn';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../Data/Enum';
import { ACKNOWLEDGED_NOTIFICATIONS_KEY, NOTIFICATION_SOUNDS_ENABLED_KEY, WEBSOCKET_ENABLED_KEY } from '../Data/Constants';
import { useTheme } from '../Pages/ThemeProvider';
import { useLocation } from 'react-router-dom';
import { dark_colors, light_colors } from '../Data/ColorConstant';
import { RootUrl } from '../Api.tsx/Axios';

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
    const [wsTopic, setWsTopic] = useState<string | null>(null);
    const clientRef = useRef<Client | null>(null);
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const reconnectAttemptsRef = useRef(0);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const darkTheme = useTheme();
    const lastNotificationIdRef = useRef<string | null>(null); // Track last notification that played sound
    
    // Use hooks for settings and storage
    const [acknowledgedIds] = useLocalStorage<string[]>(ACKNOWLEDGED_NOTIFICATIONS_KEY, []);
    const [notificationSoundsEnabled] = useLocalStorage(NOTIFICATION_SOUNDS_ENABLED_KEY, true);
    const [isWebSocketEnabled] = useLocalStorage(WEBSOCKET_ENABLED_KEY, true);

    // Refs to hold latest values for WebSocket callback (avoids stale closures)
    const acknowledgedIdsRef = useRef(acknowledgedIds);
    const notificationSoundsEnabledRef = useRef(notificationSoundsEnabled);

    useEffect(() => {
        acknowledgedIdsRef.current = acknowledgedIds;
    }, [acknowledgedIds]);

    useEffect(() => {
        notificationSoundsEnabledRef.current = notificationSoundsEnabled;
    }, [notificationSoundsEnabled]);
    
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
        isFetching,
        isError
    } = useReactQuery_Get(
        GET_WEBSOCKET_URL_QUERY_ID,
        () => getWebSocketUrl(),
        (data) => {
            // Handle response structure: { url: ["http://..."], topic: [...] }
            const responseData = data?.data?.body || data?.data;
            
            if (responseData?.url && Array.isArray(responseData.url) && responseData.url.length > 0) {
                // Backend returns complete URL, but we need to ensure it matches our current gateway
                // to avoid Mixed Content errors (e.g. backend says http://localhost but we are on https://ngrok)
                const backendUrl = new URL(responseData.url[0]);
                const fullUrl = `${RootUrl.gateway}${backendUrl.pathname}${backendUrl.search}`;
                
                console.log('[WebSocket] Fetched URL:', fullUrl);
                setWsUrl(fullUrl);
                
                // Extract topic from response
                if (responseData?.topic && Array.isArray(responseData.topic) && responseData.topic.length > 0) {
                    const topic = responseData.topic[0];
                    console.log('[WebSocket] Fetched Topic:', topic);
                    setWsTopic(topic);
                } else {
                    console.warn('[WebSocket] No topic in response, using default');
                    setWsTopic(WEBSOCKET_TOPIC_EVENTS); // Fallback to constant
                }
            } else {
                console.error('[WebSocket] Invalid URL response:', responseData);
                setConnectionStatus('error');
            }
        },
        (error) => {
            console.error('[WebSocket] Failed to fetch URL:', error);
            setConnectionStatus('error');
        },
        !!token && !!admin && !!profileId && location.pathname.startsWith(RoutePath.CoreApplication), // Only fetch if authenticated AND profile selected AND on core app routes
        true, // refetch on mount
        false, // don't refetch on window focus
        false, // no refetch interval
        false, // no background refetch
        300000, // cache for 5 minutes
        300000, // stale after 5 minutes
    );

    // Handle WebSocket URL fetch error
    useEffect(() => {
        if (isError) {
            scheduleReconnect();
        }
    }, [isError]); // eslint-disable-line react-hooks/exhaustive-deps

    // Effect to disconnect if NOT on core app route
    useEffect(() => {
        if (!location.pathname.startsWith(RoutePath.CoreApplication)) {
            if (clientRef.current?.connected) {
                console.log('[WebSocket] Disconnecting due to non-core route:', location.pathname);
                disconnect();
            }
        }
    }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

    const connectToWebSocket = (url: string) => {
        if (clientRef.current?.connected) {
            console.log('[WebSocket] Already connected');
            return;
        }

        try {
            setConnectionStatus('connecting');
            console.log('[WebSocket] Connecting to:', url);

            // Security Check: Prevent Mixed Content Error
            // If we are on HTTPS, we cannot connect to HTTP (insecure) WebSocket
            if (window.location.protocol === 'https:' && url.startsWith('http://')) {
                console.warn('[WebSocket] Security Block: Cannot connect to insecure WebSocket (' + url + ') from secure page (HTTPS). Connection aborted to prevent SecurityError.');
                setConnectionStatus('error');
                return;
            }

            // Convert HTTP URL to WebSocket URL
            // If backend uses SockJS, the raw WebSocket endpoint is usually at /websocket appended to the endpoint
            // However, often just replacing http->ws works if not restricted.
            // Let's assume standard behavior: replace protocol.
            let wsUrl = url.replace('http://', 'ws://').replace('https://', 'wss://');
            
            // Append /websocket if it's a SockJS endpoint to bypass SockJS protocol handshake (implied by previous SockJS usage)
            // If the URL already ends in /websocket, don't append.
            if (!wsUrl.endsWith('/websocket')) {
               wsUrl = `${wsUrl}/websocket`; 
            }

            console.log('[WebSocket] Connecting to native endpoint:', wsUrl);

            // Create STOMP client with native brokerURL
            const client = new Client({
                brokerURL: wsUrl,
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
                const topicToUse = wsTopic || WEBSOCKET_TOPIC_EVENTS;
                console.log('[WebSocket] Subscribing to topic:', topicToUse);
                client.subscribe(topicToUse, (message) => {
                    try {
                        const payload = JSON.parse(message.body);
                        console.log('[WebSocket] Received update:', payload);

                        // Handle structured messages (New Format)
                        if (payload.type && payload.payload) {
                            switch (payload.type) {
                                case 'DEVICE_ADD':
                                    dispatch(addDevice(payload.payload));
                                    break;
                                case 'DEVICE_DELETE':
                                    dispatch(removeDevice(payload.payload)); // payload is deviceId string
                                    break;
                                case 'GLOBAL_UPDATE':
                                    dispatch(updateAllDevices(payload.payload)); // payload is { status: boolean }
                                    break;
                                case 'DEVICE_UPDATE':
                                    if (payload.payload.deviceId) {
                                        dispatch(updateDevice({
                                            deviceId: payload.payload.deviceId,
                                            updates: payload.payload
                                        }));
                                    }
                                    break;
                                case 'DEVICE_DATA_STORE_UPDATE':
                                    if (payload.payload.deviceId && payload.payload.data) {
                                        dispatch(updateDeviceDataStore({
                                            deviceId: payload.payload.deviceId,
                                            data: payload.payload.data
                                        }));
                                    }
                                    break;
                                case 'DEVICE_DATA_STORE_DELETE':
                                    if (payload.payload.deviceId && payload.payload.keys) {
                                        dispatch(deleteDeviceDataStore({
                                            deviceId: payload.payload.deviceId,
                                            keys: payload.payload.keys
                                        }));
                                    }
                                    break;
                                case 'NOTIFICATION':
                                    if (payload.payload.id && payload.payload.message) {
                                        // Check if notification is already acknowledged BEFORE dispatching
                                        // We use the REF value here to avoid stale closures in the callback
                                        const isNotAcknowledged = !acknowledgedIdsRef.current.includes(payload.payload.id);
                                        
                                        if (isNotAcknowledged) {
                                            // Dispatch every time the server sends it (updates timestamp)
                                            dispatch(setNotification({
                                                id: payload.payload.id,
                                                message: payload.payload.message,
                                                type: payload.payload.type || 'INFO'
                                            }));
                                            
                                            // Play sound for EVERY server payload if not acknowledged
                                            // We check the sound setting from the REF
                                            lastNotificationIdRef.current = payload.payload.id;
                                            if (notificationSoundsEnabledRef.current) {
                                                playNotificationSound();
                                            }
                                        }
                                    }
                                    break;
                                default:
                                    console.warn('[WebSocket] Unknown message type:', payload.type);
                            }
                        } 
                        // Fallback for legacy format (Direct device object)
                        else if (payload.deviceId) {
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
            // Only refetch if we don't have a URL yet or if it's explicitly invalid
            if (!wsUrl) {
                console.log('[WebSocket] Refetching URL before reconnect...');
                refetch();
            } else {
                // Otherwise just try to connect with existing URL
                connect();
            }
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

    // Auto-connect when authenticated, URL is available, AND WebSocket is enabled
    useEffect(() => {
        if (token && admin && profileId && wsUrl && !isLoadingWsUrl && !isFetching && isWebSocketEnabled) {
            connect();
        } else if (!token || !admin || !profileId || !isWebSocketEnabled) {
            disconnect();
        }
        // Note: We intentionally do NOT return disconnect() here.
        // disconnect() resets the reconnection attempts, which we don't want
        // when just refetching the URL or updating state.
    }, [token, admin, profileId, wsUrl, isLoadingWsUrl, isFetching, isWebSocketEnabled]); // eslint-disable-line react-hooks/exhaustive-deps

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
