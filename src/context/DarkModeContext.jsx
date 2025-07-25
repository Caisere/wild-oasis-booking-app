import React, { createContext, useContext, useEffect } from 'react'
import { useLocalStorageState } from '../hooks/useLocalStorageState'
import { DARK_MODE, LIGHT_MODE } from '../constants'

const DarkModeContext = createContext()

function DarkModeProvider ({children}) {

    const [isDarkMode, setIsDarkMode] = useLocalStorageState(window.matchMedia("(prefers-color-scheme: dark)").matches, 'isDarkMode')

    function toggleIsDarkMode() {
        setIsDarkMode(isDark => !isDark)
    }

    useEffect(()=>{
        if(isDarkMode) {
            document.documentElement.classList.add('dark-mode');
            document.documentElement.classList.remove('light-mode');
        } else {
            document.documentElement.classList.add('light-mode');
            document.documentElement.classList.remove('dark-mode'); 
        }
    }, [isDarkMode])

    return (
        <DarkModeContext.Provider value={{
            isDarkMode,
            toggleIsDarkMode
        }}>
            {children}
        </DarkModeContext.Provider>
    )
}

function useDarkMode () {
    const context = useContext(DarkModeContext)
    if (context === 'undefined') {
        throw new Error ('DarkMode Context was used outside of DarkMode Provider')
    }
    return context
}

// eslint-disable-next-line react-refresh/only-export-components
export {DarkModeProvider, useDarkMode}

export default DarkModeProvider