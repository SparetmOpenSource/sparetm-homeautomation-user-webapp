import { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { displayToastify } from '../../Utils/HelperFn';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../Data/Enum';

interface WebSocketMessage {
    topic?: string;
    msg?: string;
    headers?: any;
}

const useWebsocketSender = (socketUrl: string, topic: string) => {
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const isConnected = useRef(false);

    // useEffect(() => {
    //     if (!socketUrl || !topic) {
    //         displayToastify(
    //             'Invalid socketUrl or topic',
    //             TOASTIFYCOLOR.DARK,
    //             TOASTIFYSTATE.ERROR,
    //         );
    //         return;
    //     }

    //     const client = new Client({
    //         webSocketFactory: () => new SockJS(socketUrl),
    //         reconnectDelay: 5000,
    //         heartbeatIncoming: 4000,
    //         heartbeatOutgoing: 4000,
    //     });

    //     client.onConnect = () => {
    //         isConnected.current = true;
    //         displayToastify(
    //             'WebSocket connected successfully',
    //             TOASTIFYCOLOR.DARK,
    //             TOASTIFYSTATE.ERROR,
    //         );
    //     };

    //     client.onStompError = (error) => {
    //         displayToastify(
    //             `WebSocket connection error: ${error?.headers?.message}`,
    //             TOASTIFYCOLOR.DARK,
    //             TOASTIFYSTATE.ERROR,
    //         );
    //     };

    //     client.activate();
    //     setStompClient(client);

    //     return () => {
    //         isConnected.current = false;
    //         client.deactivate();
    //     };
    // }, [socketUrl, topic]); // eslint-disable-line react-hooks/exhaustive-deps

    // const sendMessage = (msg: WebSocketMessage) => {
    //     if (stompClient && isConnected.current && msg.msg) {
    //         stompClient.publish({
    //             destination: topic,
    //             body: msg?.msg,
    //             headers: msg?.headers || {},
    //         });
    //         displayToastify(
    //             'Message sent successfully',
    //             TOASTIFYCOLOR.DARK,
    //             TOASTIFYSTATE.SUCCESS,
    //         );
    //     } else {
    //         displayToastify(
    //             'WebSocket is not connected or message is empty',
    //             TOASTIFYCOLOR.DARK,
    //             TOASTIFYSTATE.ERROR,
    //         );
    //     }
    // };

    // return { sendMessage };
};

export default useWebsocketSender;
