import React, { useMemo } from 'react';
import './Preferences.css';
import useLocalStorage from '../../../../Hooks/UseLocalStorage';
import { useTheme } from '../../../../Pages/ThemeProvider';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import {
    BACKGROUND_BLINK_SETTING,
    NOTIFICATION_SOUNDS_ENABLED_KEY,
    NOTIFICATION_POSITION_KEY,
    BLINK_NOTIFICATIONS_ENABLED_KEY,
    SCREENSAVER_ENABLED_KEY,
    SCREENSAVER_TIMEOUT_KEY,
    SECURITY_LOCK_ENABLED_KEY,
    SECURITY_LOCK_TIMEOUT_KEY,
    ACKNOWLEDGED_NOTIFICATIONS_KEY,
    PAGE_TRANSITIONS_ENABLED_KEY,
    WEBSOCKET_ENABLED_KEY,
} from '../../../../Data/Constants';
import { displayToastify } from '../../../../Utils/HelperFn';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../../Data/Enum';

import { useBackDropOpen } from '../../../../Pages/ThemeProvider';
import { POLICY_MODAL, PolicyModalSize } from '../../../../Data/Constants';
import PolicyModal from '../../../../Components/Others/PolicyModal/PolicyModal';

// --- Types & Interfaces ---
interface SettingOption {
    label: string;
    value: number | string | boolean;
}

interface SettingItemConfig {
    id: string;
    type: 'toggle' | 'select' | 'button' | 'object-toggle' | 'warning';
    label: string;
    description: string;
    storageKey?: string; // Optional for buttons
    defaultValue?: any;
    options?: SettingOption[]; // For 'select' type
    objectKey?: string; // For 'object-toggle' type (key within the object)
    action?: () => void; // For 'button' type
    buttonLabel?: string; // For 'button' type
    dependency?: { key: string; value: any }; // For dependent settings
}

interface SettingSectionConfig {
    id: string;
    title: string;
    items: SettingItemConfig[];
}

// --- Configuration ---
const SETTINGS_CONFIG: SettingSectionConfig[] = [
    {
        id: 'general',
        title: 'General',
        items: [
            {
                id: 'animations',
                type: 'toggle',
                label: 'Animations',
                description: 'Enable smooth page transitions across the application',
                storageKey: PAGE_TRANSITIONS_ENABLED_KEY,
                defaultValue: true,
            },
            {
                id: 'notification_sounds',
                type: 'toggle',
                label: 'Notification Sounds',
                description: 'Enable sound effects for notifications',
                storageKey: NOTIFICATION_SOUNDS_ENABLED_KEY,
                defaultValue: true,
            },
            {
                id: 'clear_acknowledged',
                type: 'button',
                label: 'Clear Acknowledged Notifications',
                description: 'Reset the history of dismissed notifications',
                buttonLabel: 'Clear History',
                // Action is handled in ActionSettingItem component
                action: () => {}, 
            },
            {
                id: 'notification_position',
                type: 'select',
                label: 'Notification Position',
                description: 'Choose where notifications appear on the screen',
                storageKey: NOTIFICATION_POSITION_KEY,
                defaultValue: 'bottom-right',
                options: [
                    { label: 'Top Left', value: 'top-left' },
                    { label: 'Top Center', value: 'top-center' },
                    { label: 'Top Right', value: 'top-right' },
                    { label: 'Bottom Left', value: 'bottom-left' },
                    { label: 'Bottom Center', value: 'bottom-center' },
                    { label: 'Bottom Right', value: 'bottom-right' },
                ],
            },
        ],
    },
    {
        id: 'privacy',
        title: 'Privacy',
        items: [
             {
                id: 'cookie_settings',
                type: 'button',
                label: 'Cookie Preferences',
                description: 'Manage your privacy and cookie settings',
                buttonLabel: 'Manage Cookies',
                action: () => {}, 
            },
        ]
    },
    {
        id: 'realtime_updates',
        title: 'Real-time Updates',
        items: [
            {
                id: 'websocket_enabled',
                type: 'toggle',
                label: 'Enable Real-time Connections',
                description: 'Keep devices and notifications in sync instantly',
                storageKey: WEBSOCKET_ENABLED_KEY,
                defaultValue: true,
            },
            {
                id: 'websocket_warning',
                type: 'warning',
                label: '',
                description: '',
                dependency: { key: WEBSOCKET_ENABLED_KEY, value: false },
            },
        ],
    },
    {
        id: 'blink_notifications',
        title: 'Blink Notifications',
        items: [
            {
                id: 'blink_notifications_master',
                type: 'toggle',
                label: 'Master Switch',
                description: 'Enable visual blink indicators for notifications',
                storageKey: BLINK_NOTIFICATIONS_ENABLED_KEY,
                defaultValue: false,
            },
            {
                id: 'blink_success',
                type: 'object-toggle',
                label: 'Success',
                description: 'Blink on success messages',
                storageKey: BACKGROUND_BLINK_SETTING,
                objectKey: 'SUCCESS',
                defaultValue: { SUCCESS: true, ERROR: true, WARNING: false, INFO: false },
            },
            {
                id: 'blink_error',
                type: 'object-toggle',
                label: 'Error',
                description: 'Blink on error messages',
                storageKey: BACKGROUND_BLINK_SETTING,
                objectKey: 'ERROR',
                defaultValue: { SUCCESS: true, ERROR: true, WARNING: false, INFO: false },
            },
            {
                id: 'blink_warning',
                type: 'object-toggle',
                label: 'Warning',
                description: 'Blink on warning messages',
                storageKey: BACKGROUND_BLINK_SETTING,
                objectKey: 'WARNING',
                defaultValue: { SUCCESS: true, ERROR: true, WARNING: false, INFO: false },
            },
            {
                id: 'blink_info',
                type: 'object-toggle',
                label: 'Info',
                description: 'Blink on info messages',
                storageKey: BACKGROUND_BLINK_SETTING,
                objectKey: 'INFO',
                defaultValue: { SUCCESS: true, ERROR: true, WARNING: false, INFO: false },
            },
        ],
    },
    {
        id: 'screensaver',
        title: 'Screensaver',
        items: [
            {
                id: 'screensaver_enabled',
                type: 'toggle',
                label: 'Enable Screensaver',
                description: 'Automatically show screensaver when inactive',
                storageKey: SCREENSAVER_ENABLED_KEY,
                defaultValue: false,
            },
            {
                id: 'screensaver_timeout',
                type: 'select',
                label: 'Activation Delay',
                description: 'Time to wait before showing screensaver',
                storageKey: SCREENSAVER_TIMEOUT_KEY,
                defaultValue: 60000,
                options: [
                    { label: '30 Seconds', value: 30000 },
                    { label: '1 Minute', value: 60000 },
                    { label: '5 Minutes', value: 300000 },
                    { label: '10 Minutes', value: 600000 },
                ],
            },
            {
                id: 'security_lock_enabled',
                type: 'toggle',
                label: 'Security Auto-Lock',
                description: 'Lock the application after inactivity (requires unlock)',
                storageKey: SECURITY_LOCK_ENABLED_KEY,
                defaultValue: false,
            },
            {
                id: 'security_lock_timeout',
                type: 'select',
                label: 'Auto-Lock Delay',
                description: 'Time to wait before locking the screen',
                storageKey: SECURITY_LOCK_TIMEOUT_KEY,
                defaultValue: 300000,
                options: [
                    { label: '1 Minute', value: 60000 },
                    { label: '5 Minutes', value: 300000 },
                    { label: '15 Minutes', value: 900000 },
                    { label: '30 Minutes', value: 1800000 },
                ],
            },
        ],
    },
];

// --- Sub-Components ---

// Component for settings that require localStorage (Toggle, Select, Object-Toggle)
const StorageSettingItem = ({ config }: { config: SettingItemConfig }) => {
    // Unconditional hook call - this component is ONLY rendered for storage-based items
    const [value, setValue] = useLocalStorage(config.storageKey!, config.defaultValue);
    
    // Dependency Logic
    const [screensaverEnabled] = useLocalStorage(SCREENSAVER_ENABLED_KEY, false);
    const [blinkEnabled] = useLocalStorage(BLINK_NOTIFICATIONS_ENABLED_KEY, false);
    const [securityLockEnabled] = useLocalStorage(SECURITY_LOCK_ENABLED_KEY, false);

    let isDisabled = false;
    if (config.id === 'screensaver_timeout' && !screensaverEnabled) isDisabled = true;
    if (config.type === 'object-toggle' && !blinkEnabled) isDisabled = true;
    if (config.id === 'security_lock_timeout' && !securityLockEnabled) isDisabled = true;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (config.type === 'toggle') {
            setValue((e.target as HTMLInputElement).checked);
        } else if (config.type === 'select') {
            const val = e.target.value;
            setValue(isNaN(Number(val)) ? val : Number(val));
        } else if (config.type === 'object-toggle' && config.objectKey) {
            const newValue = (e.target as HTMLInputElement).checked;
            setValue((prev: any) => ({
                ...prev,
                [config.objectKey!]: newValue,
            }));
        }
    };

    const isChecked = config.type === 'object-toggle' && config.objectKey 
        ? value?.[config.objectKey] ?? false 
        : !!value;

    return (
        <div className="preference-item">
            <div className="preference-info">
                <span className="preference-label">{config.label}</span>
                <p className="preference-description">{config.description}</p>
            </div>
            
            {(config.type === 'toggle' || config.type === 'object-toggle') && (
                <label className="toggle-switch" style={{ opacity: isDisabled ? 0.5 : 1 }}>
                    <input 
                        type="checkbox" 
                        checked={isChecked}
                        onChange={handleChange}
                        disabled={isDisabled}
                    />
                    <span className="toggle-slider"></span>
                </label>
            )}

            {config.type === 'select' && config.options && (
                <select 
                    className="preference-select"
                    value={value}
                    onChange={handleChange}
                    disabled={isDisabled}
                >
                    {config.options.map((opt) => (
                        <option key={opt.value.toString()} value={opt.value.toString()}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};

// Component for Warning Message (Special Case)
const WarningMessageItem = ({ config }: { config: SettingItemConfig }) => {
    const [isEnabled] = useLocalStorage(config.dependency?.key || '', true);
    const darkTheme = useTheme();
    const colors = useMemo(() => (darkTheme ? dark_colors : light_colors), [darkTheme]);

    if(isEnabled) return null;

    return (
        <div 
            className="preference-warning"
            style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: `${colors.error}20`,
                border: `1px solid ${colors.error}`,
                borderRadius: '0.5rem',
                color: colors.text,
                fontSize: '0.9rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
            }}
        >
            <strong style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: colors.error }}>
                ⚠️ Functionality Restricted
            </strong>
            <p style={{ margin: 0, opacity: 0.9 }}>
                Disabling real-time connections will turn of the following features:
            </p>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', opacity: 0.8, lineHeight: '1.4' }}>
                <li>Live device status updates from other users</li>
                <li>Real-time push notifications</li>
                <li>Instant dashboard synchronization</li>
                <li>Global connectivity alerts</li>
            </ul>
        </div>
    );
};

// Component for action-based settings (Buttons) - No localStorage hook needed
const ActionSettingItem = ({ config }: { config: SettingItemConfig }) => {
    // Specific logic for Clear History button
    const [acknowledgedList, setAcknowledgedList] = useLocalStorage(ACKNOWLEDGED_NOTIFICATIONS_KEY, []);
    const { toggleBackDropOpen, toggleBackDropClose } = useBackDropOpen();
    const darkTheme: any = useTheme();

    let isDisabled = false;
    if (config.id === 'clear_acknowledged') {
        isDisabled = !acknowledgedList || acknowledgedList.length === 0;
    }

    const handleAction = () => {
        if (config.id === 'clear_acknowledged') {
            // Use hook setter to clear and trigger updates
            setAcknowledgedList([]);
            displayToastify(
                'Notification history cleared!',
                TOASTIFYCOLOR.DARK, 
                TOASTIFYSTATE.SUCCESS
            );
        } else if (config.id === 'cookie_settings') {
             toggleBackDropOpen(
                POLICY_MODAL,
                <PolicyModal 
                    handleClose={() => toggleBackDropClose(POLICY_MODAL)} 
                    darkTheme={darkTheme}
                    initialTab="settings"
                />,
                PolicyModalSize,
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
                disabled={isDisabled}
                style={{
                    padding: '0.6rem 1.2rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    background: isDisabled ? 'var(--element-bg)' : 'var(--accent-color)',
                    color: isDisabled ? 'var(--text-secondary)' : 'white',
                    fontWeight: 600,
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    fontSize: '0.9rem',
                    transition: 'opacity 0.2s, background-color 0.2s',
                    opacity: isDisabled ? 0.6 : 1,
                }}
                onMouseOver={(e) => !isDisabled && (e.currentTarget.style.opacity = '0.9')}
                onMouseOut={(e) => !isDisabled && (e.currentTarget.style.opacity = '1')}
            >
                {config.buttonLabel}
            </button>
        </div>
    );
};

// Wrapper to decide which component to render
const PreferenceItem = ({ config }: { config: SettingItemConfig }) => {
    if (config.type === 'button') {
        return <ActionSettingItem config={config} />;
    }
    // For warning items
    if (config.type === 'warning' as any) {
        return <WarningMessageItem config={config} />;
    }
    // For all other types that use storage
    return <StorageSettingItem config={config} />;
};

// --- Main Component ---
const Preferences = () => {
    const darkTheme = useTheme();
    const colors = useMemo(() => (darkTheme ? dark_colors : light_colors), [darkTheme]);

    // Dynamic style object for CSS variables
    const style = {
        '--bg-primary': colors.outer,
        '--bg-secondary': colors.inner,
        '--text-primary': colors.text,
        '--text-secondary': colors.icon,
        '--border-color': colors.border,
        '--accent-color': colors.button,
        '--element-bg': colors.element,
        '--accent-color-alpha': `${colors.button}40`, // 25% opacity approximation
    } as React.CSSProperties;

    return (
        <div className="preferences" style={style}>
            <div className="preferences-header">
                <h1>Preferences</h1>
            </div>

            {SETTINGS_CONFIG.map((section) => (
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

export default Preferences;
