import React, { useMemo } from 'react';
import { useTheme } from '../../../../../../core/router/Themeprovider';
import { dark_colors, light_colors } from '../../../../../../data/ColorConstant';
import { SettingItemConfig } from './SettingsTypes';
import useLocalStorage from '../../../../../../hooks/useLocalStorage';

// Generic storage setting component
const StorageSettingItem = ({ config }: { config: SettingItemConfig }) => {
    const [value, setValue] = useLocalStorage(config.storageKey!, config.defaultValue);
    
    // Evaluate dependencies if any
    let isDisabled = false;
    const [depValue] = useLocalStorage(config.dependency?.key || '', null);
    if (config.dependency && depValue === config.dependency.value) {
        isDisabled = true;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (config.type === 'toggle') {
            setValue((e.target as HTMLInputElement).checked);
        } else if (config.type === 'Select') {
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

            {config.type === 'Select' && config.options && (
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

// Warning Component
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

// Action Component
const ActionSettingItem = ({ config }: { config: SettingItemConfig }) => {
    // Determine if disabled based on dependencies (e.g. if a list is empty)
    const [depValue] = useLocalStorage(config.dependency?.key || '', null);
    let isDisabled = false;
    
    // For arrays, if the dependency value expects an empty array to be disabled
    if (config.dependency && Array.isArray(depValue) && (depValue as any[]).length === 0) {
         isDisabled = true;
    }

    const handleAction = () => {
        if (config.action) {
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

// Wrapper Component
const PreferenceItem = ({ config }: { config: SettingItemConfig }) => {
    if (config.type === 'Button') {
        return <ActionSettingItem config={config} />;
    }
    if (config.type === 'warning' as any) {
        return <WarningMessageItem config={config} />;
    }
    return <StorageSettingItem config={config} />;
};

export default PreferenceItem;
