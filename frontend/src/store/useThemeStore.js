import { create } from 'zustand'

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("ConvoMateTheme") ||"coffee",
    setTheme : (theme) => {
        localStorage.setItem("ConvoMateTheme",theme);
        set({theme})
    }
}))