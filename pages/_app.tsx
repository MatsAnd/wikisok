import { useEffect, useState } from 'react'
import { GeistProvider, CssBaseline } from '@geist-ui/core'
import { Analytics } from '@vercel/analytics/react'
import { useSelector } from "react-redux";
import { wrapper } from '../state/store'
import { selectThemeState, THEME } from "../state/themeSlice";
import { getSystemTheme } from '../lib/getSystemTheme'

import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  const theme = useSelector(selectThemeState)
  const [systemTheme, setSystemTheme] = useState(THEME.LIGHT)

  useEffect(() => {
    if (window) {
      // Get system preferred theme
      const sysTheme = getSystemTheme()
      if (sysTheme) setSystemTheme(sysTheme)

      // React to changes to system theme
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        setSystemTheme(event.matches ? THEME.DARK : THEME.LIGHT)
      })
    }
  }, [])

  return (
    <>
      <Analytics />
      <GeistProvider themeType={theme === THEME.AUTO ? systemTheme : theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </GeistProvider>
    </>
  )
}

export default wrapper.withRedux(App);
