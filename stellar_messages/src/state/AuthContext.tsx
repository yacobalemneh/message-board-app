import React, {createContext, useState, useEffect, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api, {setAuthToken} from '../services/api';
import {User} from '../navigation/types';

interface AuthContextValue {
  user: User | null;
  accessToken: string | null;
  login: (userData: User, access: string, remember: boolean) => Promise<void>;
  logout: () => Promise<void>;
  isLoggedIn: boolean;
  isLoading: boolean;
  loadUserInfo: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue>(
  {} as AuthContextValue,
);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadUserInfo = useCallback(async () => {
    if (!accessToken) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await api.get('/users/me');
      setUser(res.data);
    } catch (error) {
      console.error('Failed to load user info:', error);
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    (async () => {
      try {
        const [storedUser, storedToken, remember] = await Promise.all([
          AsyncStorage.getItem('user'),
          AsyncStorage.getItem('accessToken'),
          AsyncStorage.getItem('remember'),
        ]);

        if (storedToken) {
          setAuthToken(storedToken); // Add this line
          if (remember === 'true' && storedUser) {
            setUser(JSON.parse(storedUser));
            setAccessToken(storedToken);
            setIsLoggedIn(true);
          } else {
            setAccessToken(storedToken);
            setIsLoggedIn(true);
            await loadUserInfo();
          }
        }
      } catch (error) {
        console.error('Error loading stored auth:', error);
        await logout();
      } finally {
        setIsLoading(false);
      }
    })();
  }, [loadUserInfo]);

  const login = async (userData: User, access: string, remember: boolean) => {
    if (!userData || !access) {
      throw new Error('Invalid login data');
    }

    setIsLoading(true);
    try {
      setAuthToken(access);
      setAccessToken(access);
      setUser(userData);
      setIsLoggedIn(true);

      if (remember) {
        await Promise.all([
          AsyncStorage.setItem('accessToken', access),
          AsyncStorage.setItem('user', JSON.stringify(userData)),
          AsyncStorage.setItem('remember', 'true'),
        ]);
      }
    } catch (error) {
      setAuthToken(null);
      setUser(null);
      setAccessToken(null);
      setIsLoggedIn(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      setUser(null);
      setAccessToken(null);
      setIsLoggedIn(false);
      setAuthToken(null); // Add this line
      await Promise.all([
        AsyncStorage.removeItem('user'),
        AsyncStorage.removeItem('accessToken'),
        AsyncStorage.removeItem('remember'),
      ]);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        login,
        logout,
        isLoggedIn,
        isLoading,
        loadUserInfo,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
