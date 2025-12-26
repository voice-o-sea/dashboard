import { createContext, useContext } from 'react';

export type Theme = 'dark' | 'light';

type ThemeContextProps = {
    theme: Theme;
    toggleTheme: () => void;
};

const initialState: ThemeContextProps = {
    theme: 'dark',
    toggleTheme: () => null,
};

export const ThemeContext = createContext<ThemeContextProps>(initialState);

export const useTheme = () => useContext(ThemeContext);
