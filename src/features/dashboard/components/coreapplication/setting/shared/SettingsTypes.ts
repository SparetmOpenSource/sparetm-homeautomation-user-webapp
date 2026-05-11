export interface SettingOption {
    label: string;
    value: number | string | boolean;
}

export interface SettingItemConfig {
    id: string;
    type: 'toggle' | 'Select' | 'Button' | 'object-toggle' | 'warning';
    label: string;
    description: string;
    storageKey?: string; // Optional for buttons
    defaultValue?: any;
    options?: SettingOption[]; // For 'Select' type
    objectKey?: string; // For 'object-toggle' type (key within the object)
    action?: () => void; // For 'Button' type
    buttonLabel?: string; // For 'Button' type
    dependency?: { key: string; value: any }; // For dependent settings
}

export interface SettingSectionConfig {
    id: string;
    title: string;
    items: SettingItemConfig[];
}
