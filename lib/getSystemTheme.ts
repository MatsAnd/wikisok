import { THEME } from "../state/themeSlice"

export const getSystemTheme = () => {
    if (!window) return null

    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? THEME.DARK
        : THEME.LIGHT
}