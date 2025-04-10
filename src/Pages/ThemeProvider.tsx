// import {
//     useCallback,
//     useContext,
//     useEffect,
//     useMemo,
//     useState,
//     ReactNode,
// } from 'react';
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

// // Type definitions
// interface ThemeProviderProps {
//     readonly children: ReactNode;
// }

// interface BackDropActions {
//     toggleBackDropOpen: () => void;
//     toggleBackDropClose: () => void;
//     setChildForCustomBackDrop: (child: ReactNode) => void;
//     setSizeForCustomBackDrop: (size: any) => void;
// }

//     // const {
//     //     toggleBackDropOpen,
//     //     // toggleBackDropClose,
//     //     setChildForCustomBackDrop,
//     //     setSizeForCustomBackDrop,
//     // } = useBackDropOpen();

// // Custom hooks for context access with null checks
// export function useTheme(): boolean {
//     const context = useContext(ThemeContext);
//     if (context === undefined) {
//         throw new Error('useTheme must be used within a ThemeProvider');
//     }
//     return context;
// }

// export function useThemeUpdate(): () => void {
//     const context = useContext(ToggleDarkThemeContext);
//     if (context === undefined) {
//         throw new Error('useThemeUpdate must be used within a ThemeProvider');
//     }
//     return context;
// }

// export function useBackDropOpen(): BackDropActions {
//     const context = useContext(ToggleBackDropContext);
//     if (context === undefined) {
//         throw new Error('useBackDropOpen must be used within a ThemeProvider');
//     }
//     return context;
// }

//     // const {
//     //     toggleBackDropOpen,
//     //     // toggleBackDropClose,
//     //     setChildForCustomBackDrop,
//     //     setSizeForCustomBackDrop,
//     // } = useBackDropOpen();

// // Custom hooks for logic separation
// const useThemeManagement = () => {
//     const [darkTheme, setDarkTheme] = useState<boolean>(false);
//     const [themeColors, setThemeColors] = useState<any>(light_colors);

//     const toggleTheme = useCallback(() => {
//         const newTheme = !darkTheme;
//         localStorage.setItem('darkTheme', String(newTheme));
//         setDarkTheme(newTheme);
//     }, [darkTheme]);

//     useEffect(() => {
//         const savedTheme = localStorage.getItem('darkTheme') === 'true';
//         setDarkTheme(savedTheme);
//     }, []);

//     useEffect(() => {
//         setThemeColors(darkTheme ? dark_colors : light_colors);
//     }, [darkTheme]);

//     return { darkTheme, toggleTheme, themeColors };
// };

//     // const {
//     //     toggleBackDropOpen,
//     //     // toggleBackDropClose,
//     //     setChildForCustomBackDrop,
//     //     setSizeForCustomBackDrop,
//     // } = useBackDropOpen();

// const useBackDrop = (themeColors: any) => {
//     const [status, isActive] = useActive(2000, false);
//      const [openBackDrop, setOpenBackDrop] = useState(false);
//     const [openCustomBackDrop, setOpenCustomBackDrop] = useState(false);
//     const [childForCustomBackDrop, setChildForCustomBackDrop] =
//         useState<ReactNode>(null);
//     const [sizeForCustomBackDrop, setSizeForCustomBackDrop] =
//         useState<any>(FullScreenSize);

//     useEffect(() => {
//         if (typeof status === 'boolean') {
//             setOpenBackDrop(isActive ? !status : false);
//         }
//     }, [status, isActive]);

//     const toggleBackDropOpen = useCallback(() => {
//         setOpenCustomBackDrop(true);
//     }, []);

//     const toggleBackDropClose = useCallback(() => {
//         setOpenCustomBackDrop(false);
//     }, []);

//     const backDropActions = useMemo<BackDropActions>(
//         () => ({
//             toggleBackDropOpen,
//             toggleBackDropClose,
//             setChildForCustomBackDrop,
//             setSizeForCustomBackDrop,
//         }),
//         [toggleBackDropClose, toggleBackDropOpen],
//     );

//     return {
//         openBackDrop,
//         openCustomBackDrop,
//         childForCustomBackDrop,
//         sizeForCustomBackDrop,
//         backDropActions,
//         background:
//             themeColors.button?.replace(')', ',0.3)') || 'rgba(0,0,0,0.3)', // backdrop background
//     };
// };

// export function ThemeProvider({ children }: ThemeProviderProps) {
//     const { darkTheme, toggleTheme, themeColors } = useThemeManagement();
//     const {
//         openBackDrop,
//         openCustomBackDrop,
//         childForCustomBackDrop,
//         sizeForCustomBackDrop,
//         backDropActions,
//         background,
//     } = useBackDrop(themeColors);

//     return (
//         <ToggleBackDropContext.Provider value={backDropActions}>
//             <ThemeContext.Provider value={darkTheme}>
//                 <ToggleDarkThemeContext.Provider value={toggleTheme}>
//                     {children}
//                 </ToggleDarkThemeContext.Provider>
//             </ThemeContext.Provider>
//             <ToastContainer />

//             <BackDropWrapper
//                 isOpen={openBackDrop}
//                 background={background}
//                 darkTheme={darkTheme}
//             >
//                 <PicFrame />
//             </BackDropWrapper>

//             <BackDropWrapper
//                 isOpen={openCustomBackDrop}
//                 background={background}
//                 showButton
//                 size={sizeForCustomBackDrop}
//                 handleClose={backDropActions.toggleBackDropClose}
//                 darkTheme={darkTheme}
//             >
//                 {childForCustomBackDrop}
//             </BackDropWrapper>
//         </ToggleBackDropContext.Provider>
//     );
// }

// const BackDropWrapper = ({
//     isOpen,
//     children,
//     background,
//     showButton = false,
//     size = FullScreenSize,
//     handleClose,
//     darkTheme,
// }: {
//     isOpen: boolean;
//     children: ReactNode;
//     background: string;
//     showButton?: boolean;
//     size?: any;
//     handleClose?: () => void;
//     darkTheme: any;
// }) => (
//     <AnimatePresence
//         initial={false}
//         exitBeforeEnter
//         onExitComplete={() => null}
//     >
//         {isOpen && (
//             <WindowDrop
//                 background={background}
//                 showButton={showButton}
//                 handleClose={handleClose}
//                 darkTheme={darkTheme}
//                 size={size}
//                 drag={false}
//             >
//                 {children}
//             </WindowDrop>
//         )}
//     </AnimatePresence>
// );

import {
    useCallback,
    useContext,
    useEffect,
    // useMemo,
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
// import PicFrame from '../Components/Others/PicFrame/PicFrame';
import { dark_colors, light_colors } from '../Data/ColorConstant';

// Type definitions
interface ThemeProviderProps {
    readonly children: ReactNode;
}

interface BackDropState {
    open: boolean;
    child: ReactNode;
    size: any;
}

interface BackDropActions {
    toggleBackDropOpen: (id: string, child: ReactNode, size: any) => void;
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

// **Updated useBackDrop hook to support multiple independent backdrops**
const useBackDrop = (themeColors: any) => {
    const [backdrops, setBackdrops] = useState<{ [id: string]: BackDropState }>(
        {},
    );

    const toggleBackDropOpen = useCallback(
        (id: string, child: ReactNode, size: any) => {
            setBackdrops((prev) => ({
                ...prev,
                [id]: { open: true, child, size },
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

// **Updated ThemeProvider to render multiple backdrops dynamically**
// export function ThemeProvider({ children }: ThemeProviderProps) {
//     const { darkTheme, toggleTheme, themeColors } = useThemeManagement();
//     const { backdrops, toggleBackDropOpen, toggleBackDropClose, background } =
//         useBackDrop(themeColors);

//     return (
//         <ToggleBackDropContext.Provider
//             value={{ toggleBackDropOpen, toggleBackDropClose }}
//         >
//             <ThemeContext.Provider value={darkTheme}>
//                 <ToggleDarkThemeContext.Provider value={toggleTheme}>
//                     {children}
//                 </ToggleDarkThemeContext.Provider>
//             </ThemeContext.Provider>
//             <ToastContainer />

//             {Object.entries(backdrops).map(([id, { open, child, size }]) => (
//                 <BackDropWrapper
//                     key={id}
//                     isOpen={open}
//                     background={background}
//                     showButton
//                     size={size}
//                     handleClose={() => toggleBackDropClose(id)}
//                     darkTheme={darkTheme}
//                 >
//                     {child}
//                 </BackDropWrapper>
//             ))}
//         </ToggleBackDropContext.Provider>
//     );
// }

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

            {Object.entries(backdrops).map(([id, { open, child, size }]) => (
                <BackDropWrapper
                    key={id}
                    isOpen={open}
                    background={background}
                    showButton
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
    size = FullScreenSize,
    handleClose,
    darkTheme,
}: {
    isOpen: boolean;
    children: ReactNode;
    background: string;
    showButton?: boolean;
    size?: any;
    handleClose?: () => void;
    darkTheme: any;
}) => (
    <AnimatePresence>
        {isOpen && (
            <WindowDrop
                background={background}
                showButton={showButton}
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
