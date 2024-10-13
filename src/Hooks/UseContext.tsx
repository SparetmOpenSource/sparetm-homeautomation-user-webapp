import { createContext, Dispatch, SetStateAction } from 'react';

export const ColorNotificationContext = createContext<
    Dispatch<SetStateAction<any>> | undefined | any
>(undefined);

export const ThemeContext = createContext<
    Dispatch<SetStateAction<any>> | undefined | any
>(undefined);

export const ToggleDarkThemeContext = createContext<
    Dispatch<SetStateAction<any>> | undefined | any
>(undefined);

export const ToggleBackDropContext = createContext<
    Dispatch<SetStateAction<any>> | undefined | any
>(undefined);
