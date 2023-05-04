import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {setAuthConfigToken} from '../utils/setAuthConfigToken';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface StateContextInterface {
  user: object | null;
  isAuthenticated: boolean;
}

interface ActionContextInterface {
  setUser: (user: object | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => Promise<void>;
}

export const stateContextDefaultValue: StateContextInterface = {
  user: null,
  isAuthenticated: false,
};

export const actionContextDefaultValue: ActionContextInterface = {
  setUser: (user: object | null) => {},
  setIsAuthenticated: () => {},
  logout: async () => Promise.resolve(),
};

const AuthStateContext = createContext<StateContextInterface>(
  stateContextDefaultValue,
);

const AuthActionContext = createContext<ActionContextInterface>(
  actionContextDefaultValue,
);

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [user, setUser] = useState<object | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    setAuthConfigToken(null);
    await AsyncStorage.removeItem('token');
  };

  useEffect(() => {}, [isAuthenticated]);

  const stateValues = useMemo(
    () => ({
      user,
      isAuthenticated,
    }),
    [isAuthenticated],
  );

  const actionValues = useMemo(
    () => ({
      setUser,
      setIsAuthenticated,
      logout,
    }),
    [isAuthenticated],
  );

  return (
    <AuthStateContext.Provider value={stateValues}>
      <AuthActionContext.Provider value={actionValues}>
        {children}
      </AuthActionContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const useAuthStates = () => useContext(AuthStateContext);
export const useAuthActions = () => useContext(AuthActionContext);
