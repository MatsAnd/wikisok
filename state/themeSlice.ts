import { createSlice } from "@reduxjs/toolkit"
import { HYDRATE } from "next-redux-wrapper"
import { AppState } from "./store"

export enum THEME {
    AUTO = 'auto',
    LIGHT = 'light',
    DARK = 'dark',
}

// Type for our state
export interface ThemeState {
  themeState: THEME
}

// Initial state
const initialState: ThemeState = {
  themeState: THEME.AUTO,
}

// Actual Slice
export const themeSlice = createSlice({
  name: "Theme",
  initialState,
  reducers: {

    setThemeState(state, action) {
      state.themeState = action.payload
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.Theme,
        };
      },
    },
  },
})

export const { setThemeState } = themeSlice.actions
export const selectThemeState = (state: AppState) => state.Theme.themeState
export default themeSlice.reducer
