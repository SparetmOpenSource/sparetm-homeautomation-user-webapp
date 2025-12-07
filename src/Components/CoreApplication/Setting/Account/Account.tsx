import React, { useMemo } from 'react';
import '../Preferences/Preferences.css'; // Reuse Preferences styles
import { useTheme, useBackDropOpen } from '../../../../Pages/ThemeProvider';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import { LandscapeSizeM, MQTT_CONFIG_MODAL } from '../../../../Data/Constants';
import MqttConfigModal from '../MqttConfigModal/MqttConfigModal';

interface SettingItemConfig {
    id: string;
    type: 'button';
    label: string;
    description: string;
    action?: () => void;
    buttonLabel?: string;
}

interface SettingSectionConfig {
    id: string;
    title: string;
    items: SettingItemConfig[];
}

// --- Configuration ---
const ACCOUNT_SETTINGS_CONFIG: SettingSectionConfig[] = [
    {
        id: 'connection',
        title: 'Connection',
        items: [
            {
                id: 'mqtt_config',
                type: 'button',
                label: 'MQTT Configuration',
                description: 'Configure MQTT broker credentials for device communication',
                buttonLabel: 'Configure MQTT',
                action: () => {},
            },
        ],
    },
];

// --- Sub-Components ---
const ActionSettingItem = ({ config }: { config: SettingItemConfig }) => {
    const { toggleBackDropOpen, toggleBackDropClose } = useBackDropOpen();
    const darkTheme: any = useTheme();

    const handleAction = () => {
        if (config.id === 'mqtt_config') {
            toggleBackDropOpen(
                MQTT_CONFIG_MODAL,
                <MqttConfigModal
                    handleClose={() => toggleBackDropClose(MQTT_CONFIG_MODAL)}
                    darkTheme={darkTheme}
                />,
                LandscapeSizeM,
                false
            );
        } else if (config.action) {
            config.action();
        }
    };

    return (
        <div className="preference-item">
            <div className="preference-info">
                <span className="preference-label">{config.label}</span>
                <p className="preference-description">{config.description}</p>
            </div>
            
            <button 
                className="preference-button"
                onClick={handleAction}
                style={{
                    padding: '0.6rem 1.2rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    background: 'var(--accent-color)',
                    color: 'white',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'opacity 0.2s, background-color 0.2s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
                onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
            >
                {config.buttonLabel}
            </button>
        </div>
    );
};

const PreferenceItem = ({ config }: { config: SettingItemConfig }) => {
    return <ActionSettingItem config={config} />;
};

// --- Main Component ---
const Account = () => {
    const darkTheme = useTheme();
    const colors = useMemo(() => (darkTheme ? dark_colors : light_colors), [darkTheme]);

    const style = {
        '--bg-primary': colors.outer,
        '--bg-secondary': colors.inner,
        '--text-primary': colors.text,
        '--text-secondary': colors.icon,
        '--border-color': colors.border,
        '--accent-color': colors.button,
        '--element-bg': colors.element,
        '--accent-color-alpha': `${colors.button}40`,
    } as React.CSSProperties;

    return (
        <div className="preferences" style={style}>
            <div className="preferences-header">
                <h1>Account</h1>
            </div>

            {ACCOUNT_SETTINGS_CONFIG.map((section) => (
                <div key={section.id} className="preferences-section">
                    <h2>{section.title}</h2>
                    {section.items.map((item) => (
                        <PreferenceItem key={item.id} config={item} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Account;
