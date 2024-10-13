import { useContext, useEffect, useState } from 'react';
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
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

export function useTheme() {
    return useContext(ThemeContext);
}

export function useThemeUpdate() {
    return useContext(ToggleDarkThemeContext);
}

export function useBackDropOpen() {
    return useContext(ToggleBackDropContext);
}

export function ThemeProvider({ children }: any) {
    const [darkTheme, setDarkTheme] = useState<any>(false);
    const [status, isActive] = useActive(2000, false);
    const [openBackDrop, setOpenBackDrop] = useState(false);
    const [openCustomBackDrop, setOpenCustomBackDrop] = useState(false);
    const [childForCustomBackDrop, setChildForCustomBackDrop] = useState<any>();
    const [sizeForCustomBackDrop, setSizeForCustomBackDrop] = useState<any>();
    const [themeColor, setThemeColor] = useState<any>(light_colors);

    const toggleTheme = () => {
        localStorage.setItem('darkTheme', `${!darkTheme}`);
        setDarkTheme((p: boolean) => !p);
    };

    const toggleBackDropOpen = () => {
        setOpenCustomBackDrop(true);
    };

    const toggleBackDropClose = () => {
        setOpenCustomBackDrop(false);
    };

    useEffect(() => {
        if (localStorage.getItem('darkTheme') === 'true') {
            setDarkTheme(true);
        } else {
            setDarkTheme(false);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        isActive
            ? status
                ? setOpenBackDrop(false)
                : setOpenBackDrop(true)
            : setOpenBackDrop(false);
    }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        darkTheme ? setThemeColor(dark_colors) : setThemeColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        // <QueryClientProvider client={queryClient}>
            <ToggleBackDropContext.Provider
                value={{
                    toggleBackDropOpen,
                    toggleBackDropClose,
                    setChildForCustomBackDrop,
                    setSizeForCustomBackDrop,
                }}
            >
                <ThemeContext.Provider value={darkTheme}>
                    <ToggleDarkThemeContext.Provider value={toggleTheme}>
                        {children}
                    </ToggleDarkThemeContext.Provider>
                </ThemeContext.Provider>
                <ToastContainer />

                {/* ********** */}

                <AnimatePresence
                    initial={false}
                    exitBeforeEnter={true}
                    onExitComplete={() => null}
                >
                    {openBackDrop && (
                        <WindowDrop
                            background={themeColor?.button.replace(
                                `)`,
                                `,0.3)`,
                            )}
                            showButton={false}
                            size={FullScreenSize}
                            drag={false}
                        >
                            <PicFrame />
                        </WindowDrop>
                    )}
                </AnimatePresence>

                <AnimatePresence
                    initial={false}
                    exitBeforeEnter={true}
                    onExitComplete={() => null}
                >
                    {openCustomBackDrop && (
                        <WindowDrop
                            background={themeColor?.button.replace(
                                `)`,
                                `,0.3)`,
                            )}
                            showButton={true}
                            handleClose={toggleBackDropClose}
                            darkTheme={darkTheme}
                            size={sizeForCustomBackDrop}
                            drag={false}
                        >
                            {childForCustomBackDrop}
                        </WindowDrop>
                    )}
                </AnimatePresence>
            </ToggleBackDropContext.Provider>
          
        // </QueryClientProvider>
    );
}
