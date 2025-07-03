'use client';

import { useState, useEffect, createContext, useContext } from 'react';

interface User {
  username: string;
  loginTime: Date;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: { username: string; password: string }) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd check for existing session from localStorage or API
    // For now, we'll just set loading to false
    setIsLoading(false);
  }, []);

  const login = async (credentials: { username: string; password: string }): Promise<boolean> => {
    // Simple authentication - in production, this would call your API
    const validCredentials = [
      { username: 'admin', password: 'admin123' },
      { username: 'user', password: 'user123' },
      { username: 'demo', password: 'demo123' }
    ];

    const isValid = validCredentials.some(
      cred => cred.username === credentials.username && cred.password === credentials.password
    );

    if (isValid) {
      const userData: User = {
        username: credentials.username,
        loginTime: new Date()
      };
      setUser(userData);
      // In a real app, you'd save to localStorage here
      // localStorage.setItem('currentUser', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    // In a real app, you'd clear localStorage here
    // localStorage.removeItem('currentUser');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}