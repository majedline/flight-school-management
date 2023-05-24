import React, { createContext, useState } from 'react';

// Create the context
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  // Define your application state here
  const [appState, setAppState] = useState({
    // Initial state values
    user: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '',
    },
    settings: {},
    // Add more properties as needed
  });

  return (
    <AppContext.Provider value={{ appState, setAppState }}>
      {children}
    </AppContext.Provider>
  );
};
