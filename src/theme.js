import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

export const tokens = (mode) => ({
    ...(mode === "light" ? {
        bg: '#F9F9F9',
        text: '#1C1C1C',
        chartbg: '#FFFFF',
        sidebarlight: '#DCE2F8',
        sidebardark: '#7A88D2',
        greytext: '#9A9EAE'
    } : {
        bg: '#1C1C1C',
        text: '#FEFEFE',
        chartbg: '#282828',
        sidebarlight: '#1C1C1C',
        sidebardark: '#606CAA',
        greytext: '#9A9EAE'
    })
});

export const themeSettings = (mode) => {
    const colors = tokens(mode);

    return {
        palette: {
            mode: mode,
            ...(mode === 'light' ? {
                primary: {
                    main: colors.bg,
                },
                secondary: {
                    main: colors.text,
                },
                neutral: {
                    main: colors.chartbg,
                    dark: colors.sidebardark,
                    light: colors.sidebarlight,
                },
            }: {
                primary: {
                    main: colors.bg,
                },
                secondary: {
                    main: colors.text,
                },
                neutral: {
                    main: colors.chartbg,
                    dark: colors.sidebardark,
                    light: colors.sidebarlight,
                },
            })
        }
    }
};

export const ColorModeContext = createContext({
    toggleColorMode: () => {}
});

export const useMode = () => {
    const [mode, setMode] = useState("light");
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => setMode((prev) => (prev === "light" ? "dark" : "light")),
        }), []
    );
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return [theme, colorMode];
};