import { useState } from 'react';
import { useAppSelector } from '../../../../Features/ReduxHooks';
import { getMqttConfig, featureUrl } from '../../../../Api.tsx/CoreAppApis';
import { updateHeaderConfig } from '../../../../Api.tsx/Axios';
import { useReactQuery_Get } from '../../../../Api.tsx/useReactQuery_Get';
import { usePostUpdateData, useDeleteData } from '../../../../Api.tsx/useReactQuery_Update';
import { displayToastify } from '../../../../Utils/HelperFn';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../../Data/Enum';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import './MqttConfigModal.css';
import LoadingFade from '../../../Others/LoadingAnimation/LoadingFade';
import { useBackDropOpen } from '../../../../Pages/ThemeProvider';
import Confirmation from '../../../Others/BackDrop/Confirmation/Confirmation';
import { LandscapeSizeS, IS_MQTT_CONFIGURED_KEY } from '../../../../Data/Constants';
import Button from '../../../Others/CustomButton/Button';

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
        const body = data?.data?.body;
        if (body && body.mqttServerAddress) {
            setConfigData(body);
            setShowConfig(true);
        } else {
            setShowConfig(false);
        }
    };

    const get_Mqtt_Config = () => {
        return getMqttConfig(admin);
    };

    const { isLoading: isFetchingConfig } = useReactQuery_Get(
        'get_mqtt_config',
        get_Mqtt_Config,
        on_fetch_mqtt_config_Success,
        () => setShowConfig(false),
        !isDeleted, // fetch_on_click_status / enabled
        true, // refetch_on_mount
        false, // refetch_on_window_focus
        false, // refetch_interval
        false, // refetch_interval_in_background
        300000, // cache_time (5 mins)
        0 // stale_time
    );

    const { mutate: deleteConfig, isLoading: isDeleting } = useDeleteData(
        featureUrl.del_mqtt_config + '%id%',
        updateHeaderConfig,
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

    const { mutate: connectMqtt, isLoading: isConnecting } = usePostUpdateData(
        featureUrl.mqtt_connect,
        updateHeaderConfig,
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
                    <div className="mqtt-detail-row">
                        <label style={{ color: color.text }}>Server Address:</label>
                        <span style={{ color: color.text }}>{configData?.mqttServerAddress}</span>
                    </div>
                    <div className="mqtt-detail-row">
                        <label style={{ color: color.text }}>Username:</label>
                        <span style={{ color: color.text }}>{configData?.brokerUserName}</span>
                    </div>

                    <div className="mqtt-form-actions">
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
