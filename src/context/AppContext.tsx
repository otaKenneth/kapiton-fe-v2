import React, { createContext, useContext, useState, ReactNode } from "react";

export interface AppState {
  user: null | { id: number; email: string; name: string };
  token: string | null;
  // Add more global state fields as needed
}

const defaultState: AppState = {
  user: null,
  token: null,
};

interface AppContextProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const getInitialState = (): AppState => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return {
      token: token || null,
      user: user ? JSON.parse(user) : null,
    };
  };

  const [state, setState] = useState<AppState>(getInitialState());

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
