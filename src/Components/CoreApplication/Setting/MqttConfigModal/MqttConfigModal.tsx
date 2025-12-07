import { useState } from 'react';
import { useAppSelector } from '../../../../Features/ReduxHooks';
import { useConnectMqtt } from '../../../../Api.tsx/CoreAppApis';
import { displayToastify } from '../../../../Utils/HelperFn';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../../Data/Enum';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import './MqttConfigModal.css';

interface MqttConfigModalProps {
    darkTheme: boolean;
    handleClose: () => void;
}

const MqttConfigModal = ({ darkTheme, handleClose }: MqttConfigModalProps) => {
    const admin = useAppSelector((state: any) => state?.user?.admin);
    const color = darkTheme ? dark_colors : light_colors;

    const [formData, setFormData] = useState({
        mqttServerAddress: '',
        brokerUserName: '',
        brokerPassword: '',
    });

    const { mutate, isLoading } = useConnectMqtt(
        (error: any) => {
            displayToastify(
                error?.response?.data?.message || 'Failed to connect MQTT',
                !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
                TOASTIFYSTATE.ERROR,
            );
        },
        () => {
            displayToastify(
                'MQTT credentials configured successfully!',
                !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
                TOASTIFYSTATE.SUCCESS,
            );
            handleClose();
        },
    );

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

        mutate({
            adminName: admin,
            ...formData,
        } as any);
    };

    return (
        <div
            className="mqtt-config-modal"
            style={{ backgroundColor: color.element }}
        >
            <h2 style={{ color: color.text }}>MQTT Configuration</h2>
            <p style={{ color: color.icon }}>
                Configure your MQTT broker credentials to enable device communication
            </p>

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
                    <button
                        type="button"
                        onClick={handleClose}
                        className="mqtt-btn mqtt-btn-cancel"
                        style={{
                            backgroundColor: color.element,
                            color: color.text,
                            borderColor: color.border,
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="mqtt-btn mqtt-btn-submit"
                        disabled={isLoading}
                        style={{
                            backgroundColor: color.button,
                            color: 'white',
                        }}
                    >
                        {isLoading ? 'Connecting...' : 'Connect'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MqttConfigModal;
