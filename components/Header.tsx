import { Button, useTheme } from "@geist-ui/core"
import { Moon, Sun, Monitor } from "@geist-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectThemeState, setThemeState, THEME } from "../state/themeSlice";

export const Header = () => {
    const dispatch = useDispatch();
    const theme = useSelector(selectThemeState)
    const { palette } = useTheme()

    const toggleTheme = () => {
        if(theme === THEME.AUTO) dispatch(setThemeState(THEME.LIGHT))
        if(theme === THEME.LIGHT) dispatch(setThemeState(THEME.DARK))
        if(theme === THEME.DARK) dispatch(setThemeState(THEME.AUTO))
    }

    return (
        <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h1 style={{ color: palette.cyan }}>
                Wikisøk 🔍
            </h1>
            
            <Button
                style={{ marginLeft: "1em" }}
                onClick={toggleTheme}
                iconRight={theme === 'auto' ? "🖥️" : theme === 'light' ? "☀️" : "🌛"}
                auto
            />
        </nav>
    )
}

export default Header
