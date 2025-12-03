export interface NotificationConfig {
    soundEnabled: boolean;
    position: string;
    blinkSettings: Record<string, boolean>;
}

const getInitialConfig = (): NotificationConfig => {
    return {
        soundEnabled: true,
        position: 'bottom-right',
        blinkSettings: {},
    };
};

let currentConfig: NotificationConfig = getInitialConfig();

export const setNotificationConfig = (config: Partial<NotificationConfig>) => {
    currentConfig = { ...currentConfig, ...config };
};

export const getNotificationConfig = () => currentConfig;
