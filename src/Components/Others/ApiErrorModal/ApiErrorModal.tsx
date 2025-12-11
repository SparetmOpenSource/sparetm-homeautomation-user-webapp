import { useEffect, useState } from 'react';
import { dark_colors, light_colors } from '../../../Data/ColorConstant';
import './ApiErrorModal.css';
import { BiSolidError } from 'react-icons/bi';
import { IconContext } from 'react-icons';

const ApiErrorModal = ({ message, darkTheme, onNavigateToSettings }: any) => {
    const [color, setColor] = useState<any>(light_colors);

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]);

    return (
        <div
            className="api-error-modal"
            style={{ backgroundColor: color?.element, borderRadius: '1rem', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}
        >
            <IconContext.Provider value={{ size: '4em', color: color?.error }}>
                <BiSolidError />
            </IconContext.Provider>
            <h3 style={{ color: color?.text }}>{message || 'An error occurred'}</h3>
            {onNavigateToSettings && (
                <button
                    onClick={onNavigateToSettings}
                    className="api-error-modal-button"
                    style={{
                        backgroundColor: color?.button,
                        color: 'white',
                    }}
                >
                    Go to Settings
                </button>
            )}
        </div>
    );
};

export default ApiErrorModal;
