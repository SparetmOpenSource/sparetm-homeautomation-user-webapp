import { useMemo, useCallback } from 'react';
import { useBackDropOpen, useTheme } from '../../../../../../core/router/Themeprovider';
import { LandscapeSizeM, MQTT_CONFIG_MODAL } from '../../../../../../data/Constants';
import MqttConfigModal from '../mqttconfigmodal/Mqttconfigmodal';
import SettingsPage from '../shared/SettingsPage';
import { SettingSectionConfig } from '../shared/SettingsTypes';
import '../preferences/Preferences.css';

const Account = () => {
    const { toggleBackDropOpen, toggleBackDropClose } = useBackDropOpen();
    const darkTheme: any = useTheme();

    const handleMqttConfig = useCallback(() => {
        toggleBackDropOpen(
            MQTT_CONFIG_MODAL,
            <MqttConfigModal
                handleClose={() => toggleBackDropClose(MQTT_CONFIG_MODAL)}
                darkTheme={darkTheme}
            />,
            LandscapeSizeM,
            false
        );
    }, [darkTheme, toggleBackDropClose, toggleBackDropOpen]);

    const ACCOUNT_SETTINGS_CONFIG: SettingSectionConfig[] = useMemo(() => [
        {
            id: 'Connection',
            title: 'Connection',
            items: [
                {
                    id: 'mqtt_config',
                    type: 'Button',
                    label: 'MQTT Configuration',
                    description: 'Configure MQTT broker credentials for device communication',
                    buttonLabel: 'Configure MQTT',
                    action: handleMqttConfig,
                },
            ],
        },
    ], [handleMqttConfig]);

    return <SettingsPage title="Account" config={ACCOUNT_SETTINGS_CONFIG} />;
};

export default Account;
