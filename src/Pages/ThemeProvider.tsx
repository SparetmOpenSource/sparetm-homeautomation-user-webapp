// import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
// import {
//     ToggleDarkThemeContext,
//     ThemeContext,
//     ToggleBackDropContext,
// } from '../Hooks/UseContext';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { AnimatePresence } from 'framer-motion';
// import WindowDrop from '../Components/Others/BackDrop/WindowDrop/WindowDrop';
// import { FullScreenSize } from '../Data/Constants';
// import { useActive } from '../Hooks/UseActive';
// import PicFrame from '../Components/Others/PicFrame/PicFrame';
// import { dark_colors, light_colors } from '../Data/ColorConstant';

// export function useTheme() {
//     return useContext(ThemeContext);
// }

// export function useThemeUpdate() {
//     return useContext(ToggleDarkThemeContext);
// }

// export function useBackDropOpen() {
//     return useContext(ToggleBackDropContext);
// }

// export function ThemeProvider({ children }: any) {
//     const [darkTheme, setDarkTheme] = useState<any>(false);
//     const [status, isActive] = useActive(2000, false);
//     const [openBackDrop, setOpenBackDrop] = useState(false);
//     const [openCustomBackDrop, setOpenCustomBackDrop] = useState(false);
//     const [childForCustomBackDrop, setChildForCustomBackDrop] = useState<any>();
//     const [sizeForCustomBackDrop, setSizeForCustomBackDrop] = useState<any>();
//     const [themeColor, setThemeColor] = useState<any>(light_colors);

//     const toggleTheme = useCallback(() => {
//         localStorage.setItem('darkTheme', `${!darkTheme}`);
//         setDarkTheme((p: boolean) => !p);
//     }, [darkTheme]);

//     const toggleBackDropOpen = () => {
//         setOpenCustomBackDrop(true);
//     };

//     const toggleBackDropClose = () => {
//         setOpenCustomBackDrop(false);
//     };

//     useEffect(() => {
//         if (localStorage.getItem('darkTheme') === 'true') {
//             setDarkTheme(true);
//         } else {
//             setDarkTheme(false);
//         }
//     }, []); // eslint-disable-line react-hooks/exhaustive-deps

//     useEffect(() => {
//         isActive
//             ? status
//                 ? setOpenBackDrop(false)
//                 : setOpenBackDrop(true)
//             : setOpenBackDrop(false);
//     }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

//     useEffect(() => {
//         darkTheme ? setThemeColor(dark_colors) : setThemeColor(light_colors);
//     }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps
//     const backDropObj = useMemo(
//         () => ({
//             toggleBackDropOpen,
//             toggleBackDropClose,
//             setChildForCustomBackDrop,
//             setSizeForCustomBackDrop,
//         }),
//         [],
//     );

//     return (
//         <ToggleBackDropContext.Provider value={backDropObj}>
//             <ThemeContext.Provider value={darkTheme}>
//                 <ToggleDarkThemeContext.Provider value={toggleTheme}>
//                     {children}
//                 </ToggleDarkThemeContext.Provider>
//             </ThemeContext.Provider>
//             <ToastContainer />

//             {/* ********** */}

//             <AnimatePresence
//                 initial={false}
//                 exitBeforeEnter={true}
//                 onExitComplete={() => null}
//             >
//                 {openBackDrop && (
//                     <WindowDrop
//                         background={themeColor?.button.replace(`)`, `,0.3)`)}
//                         showButton={false}
//                         size={FullScreenSize}
//                         drag={false}
//                     >
//                         <PicFrame />
//                     </WindowDrop>
//                 )}
//             </AnimatePresence>

//             <AnimatePresence
//                 initial={false}
//                 exitBeforeEnter={true}
//                 onExitComplete={() => null}
//             >
//                 {openCustomBackDrop && (
//                     <WindowDrop
//                         background={themeColor?.button.replace(`)`, `,0.3)`)}
//                         showButton={true}
//                         handleClose={toggleBackDropClose}
//                         darkTheme={darkTheme}
//                         size={sizeForCustomBackDrop}
//                         drag={false}
//                     >
//                         {childForCustomBackDrop}
//                     </WindowDrop>
//                 )}
//             </AnimatePresence>
//         </ToggleBackDropContext.Provider>
//     );
// }

import {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    ReactNode,
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
import { useActive } from '../Hooks/UseActive';
import PicFrame from '../Components/Others/PicFrame/PicFrame';
import { dark_colors, light_colors } from '../Data/ColorConstant';

// Type definitions
interface ThemeProviderProps {
    readonly children: ReactNode;
}

interface BackDropActions {
    toggleBackDropOpen: () => void;
    toggleBackDropClose: () => void;
    setChildForCustomBackDrop: (child: ReactNode) => void;
    setSizeForCustomBackDrop: (size: any) => void;
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

// Custom hooks for logic separation
const useThemeManagement = () => {
    const [darkTheme, setDarkTheme] = useState<boolean>(false);
    const [themeColors, setThemeColors] = useState<any>(light_colors);

    const toggleTheme = useCallback(() => {
        const newTheme = !darkTheme;
        localStorage.setItem('darkTheme', String(newTheme));
        setDarkTheme(newTheme);
    }, [darkTheme]);

    useEffect(() => {
        const savedTheme = localStorage.getItem('darkTheme') === 'true';
        setDarkTheme(savedTheme);
    }, []);

    useEffect(() => {
        setThemeColors(darkTheme ? dark_colors : light_colors);
    }, [darkTheme]);

    return { darkTheme, toggleTheme, themeColors };
};

const useBackDrop = (themeColors: any) => {
    const [status, isActive] = useActive(2000, false);
    const [openBackDrop, setOpenBackDrop] = useState(false);
    const [openCustomBackDrop, setOpenCustomBackDrop] = useState(false);
    const [childForCustomBackDrop, setChildForCustomBackDrop] =
        useState<ReactNode>(null);
    const [sizeForCustomBackDrop, setSizeForCustomBackDrop] =
        useState<any>(FullScreenSize);

    useEffect(() => {
        if (typeof isActive === 'boolean' && typeof status === 'boolean') {
            setOpenBackDrop(isActive ? !status : false);
        }
    }, [status, isActive]);

    const toggleBackDropOpen = useCallback(() => {
        setOpenCustomBackDrop(true);
    }, []);

    const toggleBackDropClose = useCallback(() => {
        setOpenCustomBackDrop(false);
    }, []);

    const backDropActions = useMemo<BackDropActions>(
        () => ({
            toggleBackDropOpen,
            toggleBackDropClose,
            setChildForCustomBackDrop,
            setSizeForCustomBackDrop,
        }),
        [toggleBackDropClose, toggleBackDropOpen],
    );

    return {
        openBackDrop,
        openCustomBackDrop,
        childForCustomBackDrop,
        sizeForCustomBackDrop,
        backDropActions,
        background:
            themeColors.button?.replace(')', ',0.3)') || 'rgba(0,0,0,0.3)',
    };
};

// Component implementation
export function ThemeProvider({ children }: ThemeProviderProps) {
    const { darkTheme, toggleTheme, themeColors } = useThemeManagement();
    const {
        openBackDrop,
        openCustomBackDrop,
        childForCustomBackDrop,
        sizeForCustomBackDrop,
        backDropActions,
        background,
    } = useBackDrop(themeColors);

    return (
        <ToggleBackDropContext.Provider value={backDropActions}>
            <ThemeContext.Provider value={darkTheme}>
                <ToggleDarkThemeContext.Provider value={toggleTheme}>
                    {children}
                </ToggleDarkThemeContext.Provider>
            </ThemeContext.Provider>
            <ToastContainer />

            <BackDropWrapper isOpen={openBackDrop} background={background}>
                <PicFrame />
            </BackDropWrapper>

            <BackDropWrapper
                isOpen={openCustomBackDrop}
                background={background}
                showButton
                size={sizeForCustomBackDrop}
                handleClose={backDropActions.toggleBackDropClose}
            >
                {childForCustomBackDrop}
            </BackDropWrapper>
        </ToggleBackDropContext.Provider>
    );
}

// Reusable Backdrop component
const BackDropWrapper = ({
    isOpen,
    children,
    background,
    showButton = false,
    size = FullScreenSize,
    handleClose,
}: {
    isOpen: boolean;
    children: ReactNode;
    background: string;
    showButton?: boolean;
    size?: any;
    handleClose?: () => void;
}) => (
    <AnimatePresence
        initial={false}
        exitBeforeEnter
        onExitComplete={() => null}
    >
        {isOpen && (
            <WindowDrop
                background={background}
                showButton={showButton}
                handleClose={handleClose}
                size={size}
                drag={false}
            >
                {children}
            </WindowDrop>
        )}
    </AnimatePresence>
);
