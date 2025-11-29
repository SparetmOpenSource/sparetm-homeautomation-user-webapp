import {
    useCallback,
    useContext,
    useEffect,
    useState,
    ReactNode,
    useMemo,
} from 'react';
import {
    ToggleDarkThemeContext,
    ThemeContext,
    ToggleBackDropContext,
} from '../Hooks/UseContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AnimatePresence } from 'framer-motion';
import WindowDrop from '../Components/Others/BackDrop/WindowDrop/WindowDrop';
import { FullScreenSize } from '../Data/Constants';
import { dark_colors, light_colors } from '../Data/ColorConstant';
import useLocalStorage from '../Hooks/UseLocalStorage';

// Type definitions
interface ThemeProviderProps {
    readonly children: ReactNode;
}

interface BackDropState {
    open: boolean;
    child: ReactNode;
    size: any;
    showButton?: boolean;
    enableBackdropClose?: boolean;
}

interface BackDropActions {
    toggleBackDropOpen: (
        id: string,
        child: ReactNode,
        size: any,
        showButton?: boolean,
        enableBackdropClose?: boolean,
    ) => void;
    toggleBackDropClose: (id: string) => void;
}

// Custom hooks for context access with null checks
export function useTheme(): boolean {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

export function useThemeUpdate(): () => void {
    const context = useContext(ToggleDarkThemeContext);
    if (context === undefined) {
        throw new Error('useThemeUpdate must be used within a ThemeProvider');
    }
    return context;
}

export function useBackDropOpen(): BackDropActions {
    const context = useContext(ToggleBackDropContext);
    if (context === undefined) {
        throw new Error('useBackDropOpen must be used within a ThemeProvider');
    }
    return context;
}

// Custom hook for theme management
const useThemeManagement = () => {
    const [darkTheme, setDarkTheme] = useLocalStorage<boolean>('darkTheme', false);
    const [themeColors, setThemeColors] = useState<any>(light_colors);

    const toggleTheme = useCallback(() => {
        setDarkTheme((prev) => !prev);
    }, [setDarkTheme]);

    useEffect(() => {
        setThemeColors(darkTheme ? dark_colors : light_colors);
    }, [darkTheme]);

    return { darkTheme, toggleTheme, themeColors };
};

// **Updated useBackDrop hook to support multiple independent backdrops**
const useBackDrop = (themeColors: any) => {
    const [backdrops, setBackdrops] = useState<{ [id: string]: BackDropState }>(
        {},
    );

    const toggleBackDropOpen = useCallback(
        (
            id: string,
            child: ReactNode,
            size: any,
            showButton?: boolean,
            enableBackdropClose?: boolean,
        ) => {
            setBackdrops((prev) => ({
                ...prev,
                [id]: {
                    open: true,
                    child,
                    size,
                    showButton,
                    enableBackdropClose,
                },
            }));
        },
        [],
    );

    const toggleBackDropClose = useCallback((id: string) => {
        setBackdrops((prev) => ({
            ...prev,
            [id]: { ...prev[id], open: false },
        }));
    }, []);

    return {
        backdrops,
        toggleBackDropOpen,
        toggleBackDropClose,
        background:
            themeColors.button?.replace(')', ',0.3)') || 'rgba(0,0,0,0.3)', // backdrop background
    };
};

export function ThemeProvider({ children }: ThemeProviderProps) {
    const { darkTheme, toggleTheme, themeColors } = useThemeManagement();
    const { backdrops, toggleBackDropOpen, toggleBackDropClose, background } =
        useBackDrop(themeColors);

    // Memoize the backdrop actions to avoid unnecessary re-renders
    const backdropActions = useMemo(
        () => ({
            toggleBackDropOpen,
            toggleBackDropClose,
        }),
        [toggleBackDropOpen, toggleBackDropClose],
    );

    return (
        <ToggleBackDropContext.Provider value={backdropActions}>
            <ThemeContext.Provider value={darkTheme}>
                <ToggleDarkThemeContext.Provider value={toggleTheme}>
                    {children}
                </ToggleDarkThemeContext.Provider>
            </ThemeContext.Provider>
            <ToastContainer />

            {Object.entries(backdrops).map(([id, { open, child, size, showButton, enableBackdropClose }]) => (
                <BackDropWrapper
                    key={id}
                    isOpen={open}
                    background={background}
                    showButton={showButton ?? true} // Default to true if not provided
                    enableBackdropClose={enableBackdropClose ?? true} // Default to true if not provided
                    size={size}
                    handleClose={() => toggleBackDropClose(id)}
                    darkTheme={darkTheme}
                >
                    {child}
                </BackDropWrapper>
            ))}
        </ToggleBackDropContext.Provider>
    );
}

// **Reusable BackDropWrapper component**
const BackDropWrapper = ({
    isOpen,
    children,
    background,
    showButton = false,
    enableBackdropClose = true,
    size = FullScreenSize,
    handleClose,
    darkTheme,
}: {
    isOpen: boolean;
    children: ReactNode;
    background: string;
    showButton?: boolean;
    enableBackdropClose?: boolean;
    size?: any;
    handleClose?: () => void;
    darkTheme: any;
}) => (
    <AnimatePresence>
        {isOpen && (
            <WindowDrop
                background={background}
                showButton={showButton}
                enableBackdropClose={enableBackdropClose}
                handleClose={handleClose}
                darkTheme={darkTheme}
                size={size}
                drag={false}
            >
                {children}
            </WindowDrop>
        )}
    </AnimatePresence>
);
