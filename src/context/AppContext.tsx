import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "@api";
import {nanoid} from "nanoid";

export interface AppState {
  guest_token: string;
  user: null | { id: number; email: string; name: string };
  token: string | null;
  cart: any[] | {};
  // Add more global state fields as needed
}

const defaultState: AppState = {
  guest_token: nanoid(32),
  user: null,
  token: null,
  cart: [],
};

interface AppContextProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Get initial state from localStorage
  const getInitialState = (): AppState => {
    const guest_token = localStorage.getItem('guest_token');
    if (!guest_token) {
      localStorage.setItem('guest_token', defaultState.guest_token);
    }
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return {
      guest_token: guest_token || defaultState.guest_token,
      token: token || defaultState.token,
      user: user ? JSON.parse(user) : defaultState.user,
      cart: [],
    };
  };

  const [state, setState] = useState<AppState>(getInitialState());

  // Fetch cart when token is available
  const { data: cartData } = useQuery({
    queryKey: ['cart', state.token],
    queryFn: () => getCart(state.token, { guest_token: state.guest_token }),
    enabled: !!state.token,
    select: (data) => data.data || [],
    initialData: [],
  });

  // Update cart in state when cartData changes
  useEffect(() => {
    setState(prev => ({
      ...prev,
      cart: cartData || [],
    }));
  }, [cartData]);

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
