import React, { useMemo, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTheme } from '../../../../../../core/router/Themeprovider';
import { dark_colors, light_colors } from '../../../../../../data/ColorConstant';
import LoadingFade from '../../../../../../shared/commoncomponents/loadinganimation/Loadingfade';
import PreferenceItem from './PreferenceItem';
import { SettingSectionConfig } from './SettingsTypes';

interface SettingsPageProps {
    title: string;
    config: SettingSectionConfig[];
}

const SettingsPage = ({ title, config }: SettingsPageProps) => {
    const darkTheme = useTheme();
    const colors = useMemo(() => (darkTheme ? dark_colors : light_colors), [darkTheme]);
    
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q')?.toLowerCase() || '';
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        if (searchQuery !== undefined) {
            setIsSearching(true);
            const timer = setTimeout(() => {
                setIsSearching(false);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [searchQuery]);

    // Dynamic style object for CSS variables
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

    const filteredConfig = useMemo(() => {
        if (!searchQuery) return config;
        return config.map(section => ({
            ...section,
            items: section.items.filter(item => 
                item.label.toLowerCase().includes(searchQuery) || 
                item.description.toLowerCase().includes(searchQuery)
            )
        })).filter(section => section.items.length > 0);
    }, [searchQuery, config]);

    return (
        <div className="preferences" style={style}>
            {isSearching ? (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <LoadingFade />
                </div>
            ) : (
                <>
                    <div className="preferences-header">
                        <h1>{title}</h1>
                    </div>

                    {filteredConfig.length === 0 ? (
                        <div style={{ marginTop: '2rem', textAlign: 'center', opacity: 0.6, fontSize: '0.9rem' }}>
                            No {title.toLowerCase()} settings found matching "{searchQuery}"
                        </div>
                    ) : (
                        filteredConfig.map((section) => (
                            <div key={section.id} className="preferences-section">
                                <h2>{section.title}</h2>
                                {section.items.map((item) => (
                                    <PreferenceItem key={item.id} config={item} />
                                ))}
                            </div>
                        ))
                    )}
                </>
            )}
        </div>
    );
};

export default SettingsPage;
