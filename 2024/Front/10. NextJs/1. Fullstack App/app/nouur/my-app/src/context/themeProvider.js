"use client";

import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const modeFromStorage = localStorage.getItem('mode') ? localStorage.getItem('mode') : 'dark'
    const [mode, setMode] = useState( modeFromStorage);
    const toggler = () => {
        setMode(prev => prev == 'dark' ? 'light' : 'dark')
    }

    useEffect(() => {
        localStorage.setItem('mode' , mode)
    }, [mode])

    return <ThemeContext.Provider value={{toggler , mode}}>
        <div className={`theme ${mode}`}>
            {children}
        </div>
    </ThemeContext.Provider>
}