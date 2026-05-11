import { useMemo, useCallback } from 'react';
import { useBackDropOpen, useTheme } from '../../../../../../core/router/Themeprovider';
import {
    ACKNOWLEDGED_NOTIFICATIONS_KEY,
    BACKGROUND_BLINK_SETTING,
    BLINK_NOTIFICATIONS_ENABLED_KEY,
    NOTIFICATION_POSITION_KEY,
    NOTIFICATION_SOUNDS_ENABLED_KEY,
    PAGE_TRANSITIONS_ENABLED_KEY,
    POLICY_MODAL,
    PolicyModalSize,
    SCREENSAVER_ENABLED_KEY,
    SCREENSAVER_TIMEOUT_KEY,
    SECURITY_LOCK_ENABLED_KEY,
    SECURITY_LOCK_TIMEOUT_KEY,
    WEBSOCKET_ENABLED_KEY,
} from '../../../../../../data/Constants';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../../../../data/Enum';
import useLocalStorage from '../../../../../../hooks/useLocalStorage';
import { displayToastify } from '../../../../../../utils/HelperFn';
import PolicyModal from '../../../../../home/components/homecomponents/policymodal/Policymodal';
import SettingsPage from '../shared/SettingsPage';
import { SettingSectionConfig } from '../shared/SettingsTypes';
import './Preferences.css';

const Preferences = () => {
    // Hooks required for specific actions
    const [, setAcknowledgedList] = useLocalStorage(ACKNOWLEDGED_NOTIFICATIONS_KEY, []);
    const { toggleBackDropOpen, toggleBackDropClose } = useBackDropOpen();
    const darkTheme: any = useTheme();

    // Action Handlers
    const handleClearHistory = useCallback(() => {
        setAcknowledgedList([]);
        displayToastify(
            'Notification history cleared!',
            TOASTIFYCOLOR.DARK, 
            TOASTIFYSTATE.SUCCESS
        );
    }, [setAcknowledgedList]);

    const handleCookieSettings = useCallback(() => {
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
    }, [darkTheme, toggleBackDropClose, toggleBackDropOpen]);

    // Configuration array
    const SETTINGS_CONFIG: SettingSectionConfig[] = useMemo(() => [
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
                    type: 'Button',
                    label: 'Clear Acknowledged Notifications',
                    description: 'Reset the history of dismissed notifications',
                    buttonLabel: 'Clear History',
                    action: handleClearHistory, 
                    dependency: { key: ACKNOWLEDGED_NOTIFICATIONS_KEY, value: [] } // Disables if empty array
                },
                {
                    id: 'notification_position',
                    type: 'Select',
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
                    type: 'Button',
                    label: 'Cookie Preferences',
                    description: 'Manage your privacy and cookie settings',
                    buttonLabel: 'Manage Cookies',
                    action: handleCookieSettings, 
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
                    dependency: { key: BLINK_NOTIFICATIONS_ENABLED_KEY, value: false }, // disable if master switch is off
                },
                {
                    id: 'blink_error',
                    type: 'object-toggle',
                    label: 'Error',
                    description: 'Blink on error messages',
                    storageKey: BACKGROUND_BLINK_SETTING,
                    objectKey: 'ERROR',
                    defaultValue: { SUCCESS: true, ERROR: true, WARNING: false, INFO: false },
                    dependency: { key: BLINK_NOTIFICATIONS_ENABLED_KEY, value: false },
                },
                {
                    id: 'blink_warning',
                    type: 'object-toggle',
                    label: 'Warning',
                    description: 'Blink on warning messages',
                    storageKey: BACKGROUND_BLINK_SETTING,
                    objectKey: 'WARNING',
                    defaultValue: { SUCCESS: true, ERROR: true, WARNING: false, INFO: false },
                    dependency: { key: BLINK_NOTIFICATIONS_ENABLED_KEY, value: false },
                },
                {
                    id: 'blink_info',
                    type: 'object-toggle',
                    label: 'Info',
                    description: 'Blink on info messages',
                    storageKey: BACKGROUND_BLINK_SETTING,
                    objectKey: 'INFO',
                    defaultValue: { SUCCESS: true, ERROR: true, WARNING: false, INFO: false },
                    dependency: { key: BLINK_NOTIFICATIONS_ENABLED_KEY, value: false },
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
                    type: 'Select',
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
                    dependency: { key: SCREENSAVER_ENABLED_KEY, value: false } // Disable if master is off
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
                    type: 'Select',
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
                    dependency: { key: SECURITY_LOCK_ENABLED_KEY, value: false }
                },
            ],
        },
    ], [handleClearHistory, handleCookieSettings]); // dependencies for useMemo

    return <SettingsPage title="Preferences" config={SETTINGS_CONFIG} />;
};

export default Preferences;
