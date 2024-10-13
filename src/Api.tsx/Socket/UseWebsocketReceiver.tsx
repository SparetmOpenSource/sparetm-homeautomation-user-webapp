import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { displayToastify } from '../../Utils/HelperFn';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../Data/Enum';
import { useAppDispatch } from '../../Features/ReduxHooks';
import {
    addMqttUpdate,
    addMqttNotification,
} from '../../Features/Device/DeviceSlice';
import {
    toClientMqttSocketTopic,
    toClientNotificationSocketTopic,
} from '../../Data/Constants';

interface WebSocketMessage {
    topic?: string;
    msg?: string;
    headers?: any;
}

const useWebsocketReceiver = (socketUrl: any) => {
    const topics: any = [
        toClientMqttSocketTopic,
        toClientNotificationSocketTopic,
    ];
    // const [notificationMessages, setNotificationMessages] = useState<
    //     WebSocketMessage[]
    // >([]);
    // const [mqttMessages, setMqttMessages] = useState<WebSocketMessage[]>([]);
    const [notificationMessages, setNotificationMessages] =
        useState<WebSocketMessage>({});
    const [mqttMessages, setMqttMessages] = useState<WebSocketMessage>({});
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!socketUrl || !topics) {
            displayToastify(
                'Invalid socketUrl or topic',
                TOASTIFYCOLOR.DARK,
                TOASTIFYSTATE.ERROR,
            );
            return;
        }

        const stompClient = new Client({
            webSocketFactory: () => new SockJS(socketUrl),
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        stompClient.onConnect = () => {
            topics.forEach((topic: any) => {
                stompClient.subscribe(topic, (message) => {
                    if (
                        message &&
                        message?.headers?.destination ===
                            toClientMqttSocketTopic
                    ) {
                        // setMqttMessages((prevMessages) => [
                        //     ...prevMessages,
                        //     {
                        //         topic:
                        //             message?.headers?.destination ||
                        //             'Unknown topic',
                        //         msg: message?.body || 'No message found',
                        //         headers: message?.headers || {},
                        //     },
                        // ]);
                        setMqttMessages({
                            topic:
                                message?.headers?.destination ||
                                'Unknown topic',
                            msg:
                                JSON.parse(message?.body).length > 0
                                    ? JSON.stringify(
                                          JSON.parse(message?.body)[
                                              JSON.parse(message?.body).length -
                                                  1
                                          ],
                                      )
                                    : JSON.stringify(
                                          JSON.parse(message?.body)[0],
                                      ) || 'No message found',
                            headers: { client: message?.headers?.client } || {},
                        });
                    }
                    if (
                        message &&
                        message?.headers?.destination ===
                            toClientNotificationSocketTopic
                    ) {
                        // setNotificationMessages((prevMessages) => [
                        //     ...prevMessages,
                        //     {
                        //         topic:
                        //             message?.headers?.destination ||
                        //             'Unknown topic',
                        //         msg: message?.body || 'No message found',
                        //         headers: message?.headers || {},
                        //     },
                        // ]);
                        setNotificationMessages({
                            topic:
                                message?.headers?.destination ||
                                'Unknown topic',
                            msg: message?.body || 'No message found',
                            headers: message?.headers || {},
                        });
                    }
                });
            });
        };
        stompClient.activate();
        return () => {
            stompClient.deactivate();
        };
    }, [socketUrl]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        dispatch(addMqttUpdate(mqttMessages));
        console.log(mqttMessages);
    }, [mqttMessages]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        dispatch(addMqttNotification(notificationMessages));
        console.log(notificationMessages);
    }, [notificationMessages]); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useWebsocketReceiver;
