import React, { useState, useMemo, useEffect } from 'react';
import Button from '../CustomButton/Button';

import './PolicyModal.css';
import { dark_colors, light_colors } from '../../../Data/ColorConstant';
import useLocalStorage from '../../../Hooks/UseLocalStorage';
import { COOKIES_PREFERENCES_KEY } from '../../../Data/Constants';
import { displayToastify } from '../../../Utils/HelperFn';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../Data/Enum';

const PolicyModal = ({ handleClose, darkTheme, initialTab }: { handleClose: () => void, darkTheme: boolean, initialTab?: 'settings' | 'what' | 'useful' }) => {
    const [activeTab, setActiveTab] = useState<'settings' | 'what' | 'useful'>(initialTab || 'useful');
    const [color, setColor] = useState<any>(light_colors);
    
    // Persistent state for cookie preferences
    const [preferences, setPreferences] = useLocalStorage(COOKIES_PREFERENCES_KEY, {
        functional: true,
        targeting: false
    });

    // Local state to manage changes before saving
    const [localPreferences, setLocalPreferences] = useState(preferences);

    // Sync local state when storage changes (e.g. initial load)
    useEffect(() => {
        setLocalPreferences(preferences);
    }, [preferences]);

    // Sync active tab when prop changes
    useEffect(() => {
        if (initialTab) setActiveTab(initialTab);
    }, [initialTab]);

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); 
    
    const modalStyles = useMemo(() => {
        const tranValForText = 0.7;
        return {
            '--bg-outer': color?.outer,
            '--bg-inner': color?.inner,
            '--text-primary': color?.text,
            '--color-accent': color?.button,
            '--bg-card': color?.inner,
            '--text-secondary': `${color?.text?.split(')')[0]}, ${tranValForText})`,
            '--card-border': darkTheme ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
        } as React.CSSProperties;
    }, [color, darkTheme]);

    const handleToggle = (key: 'functional' | 'targeting') => {
        setLocalPreferences((prev: any) => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const saveSettings = () => {
        setPreferences(localPreferences);
        displayToastify('Cookie preferences saved', !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT, TOASTIFYSTATE.SUCCESS);
        handleClose();
    };

    const enableAll = () => {
        const allEnabled = { functional: true, targeting: true };
        setPreferences(allEnabled);
        setLocalPreferences(allEnabled);
        displayToastify('All cookies enabled', !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT, TOASTIFYSTATE.SUCCESS);
        handleClose();
    };

    return (
        <div className="policy-modal-container" style={modalStyles}>
            <div className="policy-modal-header">
                <h2>Your cookie settings</h2>
            </div>
            <div className="policy-modal-tabs">
                <div
                    className={`policy-modal-tab ${activeTab === 'settings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('settings')}
                >
                    Change Settings
                </div>
                <div
                    className={`policy-modal-tab ${activeTab === 'what' ? 'active' : ''}`}
                    onClick={() => setActiveTab('what')}
                >
                    What are Cookies?
                </div>
                <div
                    className={`policy-modal-tab ${activeTab === 'useful' ? 'active' : ''}`}
                    onClick={() => setActiveTab('useful')}
                >
                    Why are cookies useful?
                </div>
            </div>

            <div className="policy-modal-content">
                {activeTab === 'settings' && (
                    <div className="policy-tab-content">
                        <h3>Strictly Necessary Cookies</h3>
                        <p>These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms.</p>
                        <div className="policy-setting-row">
                            <span>Strictly Necessary Cookies</span>
                            <span className="policy-toggle disabled">Always Active</span>
                        </div>

                        <h3>Functional Cookies</h3>
                        <p>These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third party providers whose services we have added to our pages.</p>
                         <div className="policy-setting-row">
                            <span>Functional Cookies</span>
                             <label className="switch">
                                <input 
                                    type="checkbox" 
                                    checked={localPreferences.functional} 
                                    onChange={() => handleToggle('functional')}
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>
                         <h3>Targeting Cookies</h3>
                        <p>These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.</p>
                         <div className="policy-setting-row">
                            <span>Targeting Cookies</span>
                             <label className="switch">
                                <input 
                                    type="checkbox" 
                                    checked={localPreferences.targeting}
                                    onChange={() => handleToggle('targeting')}
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                )}
                {activeTab === 'what' && (
                    <div className="policy-tab-content">
                        <h3>What are Cookies?</h3>
                        <p>A cookie is a small piece of data that a website asks your browser to store on your computer or mobile device. The cookie allows the website to "remember" your actions or preferences over time.</p>
                    </div>
                )}
                {activeTab === 'useful' && (
                    <div className="policy-tab-content">
                        <h3>Why are cookies useful?</h3>
                         <p>We use functional cookies to analyze how you customize your dashboard and interact with your smart devices. This allows us to provide a seamless home automation experience by remembering your preferred layouts and settings. For example, we use cookies to remember which room you were viewing last or your preferred dashboard arrangement.</p>
                        <p>Another use of cookies is to store your login sessions, meaning that when you access your dashboard, a "session cookie" is set so that the website remembers you are authenticated. If the website did not set this cookie, you would be asked for your login and password on every page refresh or action, which would disrupt your ability to control your home in real-time.</p>
                         <p>In addition, functional cookies are used to remember your interface preferences, such as your chosen theme (Dark/Light mode) and notification settings. For example, cookies save you the trouble of re-selecting your preferred color scheme every time you visit the app.</p>
                    </div>
                )}
            </div>

            <div className="policy-modal-footer">
                <Button 
                    label="Save Settings" 
                    textCol={color?.button} 
                    backCol={color?.element} 
                    width="150px" 
                    status={false} 
                    border={color?.button} 
                    fn={saveSettings}
                />
                <Button 
                    label="Enable All" 
                    textCol={color?.button} 
                    backCol={color?.element} 
                    width="150px" 
                    status={false} 
                    border={color?.button} 
                    fn={enableAll}
                />
            </div>
        </div>
    );
};

export default PolicyModal;
