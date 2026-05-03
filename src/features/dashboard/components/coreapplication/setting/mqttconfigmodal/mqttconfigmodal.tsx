import { motion } from 'framer-motion';
import { useState } from 'react';
import { IconContext } from 'react-icons';
import { IoCopyOutline } from 'react-icons/io5';
import { useConnectMqtt, useDeleteMqttConfig, useGetMqttConfig } from '../../../../../../core/api/coreappapis';
import { useBackDropOpen } from '../../../../../../core/router/themeprovider';
import { useAppSelector } from '../../../../../../core/store/reduxhooks';
import { dark_colors, light_colors } from '../../../../../../data/colorconstant';
import { IS_MQTT_CONFIGURED_KEY, LandscapeSizeS } from '../../../../../../data/constants';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../../../../data/enum';
import Confirmation from '../../../../../../shared/commoncomponents/backdrop/confirmation/confirmation';
import Button from '../../../../../../shared/commoncomponents/custombutton/button';
import LoadingFade from '../../../../../../shared/commoncomponents/loadinganimation/loadingfade';
import { copyText, displayToastify } from '../../../../../../utils/helperfn';
import './mqttconfigmodal.css';

interface MqttConfigModalProps {
    darkTheme: boolean;
    handleClose: () => void;
}

const MqttConfigModal = ({ darkTheme, handleClose }: MqttConfigModalProps) => {
    const admin = useAppSelector((state: any) => state?.user?.admin);
    const color = darkTheme ? dark_colors : light_colors;
    const { toggleBackDropOpen, toggleBackDropClose } = useBackDropOpen();

    const [showConfig, setShowConfig] = useState(false);
    const [configData, setConfigData] = useState<any>(null);
    const [isDeleted, setIsDeleted] = useState(false);

    const on_fetch_mqtt_config_Success = (data: any) => {
        const body = data?.data?.data;
        if (body && body.mqttServerAddress) {
            setConfigData(body);
            setShowConfig(true);
        } else {
            setShowConfig(false);
        }
    };

    const { isLoading: isFetchingConfig } = useGetMqttConfig(
        admin,
        darkTheme,
        on_fetch_mqtt_config_Success,
        () => setShowConfig(false),
        !isDeleted
    );

    const { mutate: deleteConfig, isLoading: isDeleting } = useDeleteMqttConfig(
        darkTheme,
        () => {
            displayToastify(
                'Configuration deleted successfully',
                !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
                TOASTIFYSTATE.SUCCESS,
            );
            setIsDeleted(true);
            setShowConfig(false);
            setConfigData(null);
            localStorage.setItem(IS_MQTT_CONFIGURED_KEY, 'false');
        },
        (error: any) => {
            displayToastify(
                error?.response?.data?.message || 'Failed to delete configuration',
                !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
                TOASTIFYSTATE.ERROR,
            );
        }
    );

    const [formData, setFormData] = useState({
        mqttServerAddress: '',
        brokerUserName: '',
        brokerPassword: '',
    });

    const { mutate: connectMqtt, isLoading: isConnecting } = useConnectMqtt(
        darkTheme,
        (data: any) => {
            displayToastify(
                data?.data?.message || 'MQTT Connected Successfully',
                !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
                TOASTIFYSTATE.SUCCESS,
            );
            localStorage.removeItem(IS_MQTT_CONFIGURED_KEY);
            handleClose();
        },
        (error: any) => {
            displayToastify(
                error?.response?.data?.message || 'Failed to connect MQTT',
                !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
                TOASTIFYSTATE.ERROR,
            );
        }
    );

    const handleDelete = () => {
        const backdropId = 'mqtt-delete-confirmation';
        toggleBackDropOpen(
            backdropId,
            <Confirmation
                darkTheme={darkTheme}
                heading="Are you sure you want to delete these credentials?"
                btnOkFn={() => {
                    toggleBackDropClose(backdropId);
                    deleteConfig(admin);
                }}
                btnCancelFn={() =>
                    toggleBackDropClose(backdropId)
                }
                btnOkLabel="Yes"
                btnCancelLabel="Cancel"
            />,
            LandscapeSizeS,
        );
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.mqttServerAddress || !formData.brokerUserName || !formData.brokerPassword) {
            displayToastify(
                'Please fill in all fields',
                !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
                TOASTIFYSTATE.WARN,
            );
            return;
        }

        connectMqtt({
            adminName: admin,
            ...formData,
        } as any);
    };

    const onCancel = (e: any) => {
        e.preventDefault();
        handleClose();
    };

    const onDelete = (e: any) => {
        e.preventDefault();
        handleDelete();
    };

    const isLoading = isConnecting;

    return (
        <div
            className="mqtt-config-modal"
            style={{ backgroundColor: color.element }}
        >
            <h2 style={{ color: color.text }}>MQTT Configuration</h2>
            <p style={{ color: color.icon }}>
                {showConfig
                    ? 'Current MQTT Configuration Details'
                    : 'Configure your MQTT broker credentials to enable device communication'}
            </p>

            {showConfig ? (
                <div className="mqtt-config-details">
                    <div className="mqtt-detail-item">
                        <label style={{ color: color.icon }}>Server Address</label>
                        <div className="mqtt-detail-value">
                            <span style={{ color: color.text }}>{configData?.mqttServerAddress}</span>
                            <motion.span
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => copyText(configData?.mqttServerAddress)}
                                className="mqtt-copy-btn"
                            >
                                <IconContext.Provider value={{ size: '1.2em', color: color.text }}>
                                    <IoCopyOutline />
                                </IconContext.Provider>
                            </motion.span>
                        </div>
                    </div>

                    <div className="mqtt-detail-item">
                        <label style={{ color: color.icon }}>Client ID</label>
                        <div className="mqtt-detail-value">
                            <span style={{ color: color.text }}>{configData?.clientId || 'Not available'}</span>
                            <motion.span
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => copyText(configData?.clientId || '')}
                                className="mqtt-copy-btn"
                            >
                                <IconContext.Provider value={{ size: '1.2em', color: color.text }}>
                                    <IoCopyOutline />
                                </IconContext.Provider>
                            </motion.span>
                        </div>
                    </div>

                    <div className="mqtt-detail-item">
                        <label style={{ color: color.icon }}>Username</label>
                        <div className="mqtt-detail-value">
                            <span style={{ color: color.text }}>{configData?.brokerUserName}</span>
                            <motion.span
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => copyText(configData?.brokerUserName)}
                                className="mqtt-copy-btn"
                            >
                                <IconContext.Provider value={{ size: '1.2em', color: color.text }}>
                                    <IoCopyOutline />
                                </IconContext.Provider>
                            </motion.span>
                        </div>
                    </div>

                    <div className="mqtt-form-actions-display">
                        <Button
                            label="Close"
                            fn={onCancel}
                            textCol={color.text}
                            backCol={color.element}
                            width="100px"
                            border={color.border}
                        />
                        <Button
                            label={isDeleting ? 'Deleting...' : 'Delete Configuration'}
                            fn={onDelete}
                            status={isDeleting}
                            textCol="white"
                            backCol={color.error}
                            width="180px"
                            border="none"
                        />
                    </div>
                </div>
            ) : isFetchingConfig ? (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '200px'
                }}>
                    <LoadingFade />
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="mqtt-form">
                    <div className="mqtt-form-group">
                        <label style={{ color: color.text }}>Server Address</label>
                        <input
                            type="text"
                            name="mqttServerAddress"
                            value={formData.mqttServerAddress}
                            onChange={handleChange}
                            placeholder="SSL://your-broker.cloud:8883"
                            style={{
                                backgroundColor: color.inner,
                                color: color.text,
                                borderColor: color.border,
                            }}
                        />
                    </div>

                    <div className="mqtt-form-group">
                        <label style={{ color: color.text }}>Username</label>
                        <input
                            type="text"
                            name="brokerUserName"
                            value={formData.brokerUserName}
                            onChange={handleChange}
                            placeholder="Enter broker username"
                            style={{
                                backgroundColor: color.inner,
                                color: color.text,
                                borderColor: color.border,
                            }}
                        />
                    </div>

                    <div className="mqtt-form-group">
                        <label style={{ color: color.text }}>Password</label>
                        <input
                            type="password"
                            name="brokerPassword"
                            value={formData.brokerPassword}
                            onChange={handleChange}
                            placeholder="Enter broker password"
                            style={{
                                backgroundColor: color.inner,
                                color: color.text,
                                borderColor: color.border,
                            }}
                        />
                    </div>

                    <div className="mqtt-form-actions">
                        <Button
                            label="Cancel"
                            fn={onCancel}
                            textCol={color.text}
                            backCol={color.element}
                            width="100px"
                            border={color.border}
                        />
                        <Button
                            label={isLoading ? 'Connecting...' : 'Connect'}
                            status={isLoading}
                            textCol="white"
                            backCol={color.button}
                            width="120px"
                            border="none"
                        />
                    </div>
                </form>
            )}
        </div>
    );
};

export default MqttConfigModal;
