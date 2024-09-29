import React, { createContext, useContext, useState } from 'react';

// Create a Context
const GlobalStateContext = createContext();

// Create a Provider component
export const GlobalStateProvider = ({ children }) => {
    const [isToggled, setIsToggled] = useState(false); // Initial boolean state

    return (
        <GlobalStateContext.Provider value={{ isToggled, setIsToggled }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

// Custom hook for easy access to the context
export const useGlobalState = () => {
    return useContext(GlobalStateContext);
};
