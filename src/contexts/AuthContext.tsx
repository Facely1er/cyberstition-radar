import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: Profile | null;
  profile: Profile | null;
  session: any;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useLocalStorage<Record<string, { password: string; profile: Profile }>>('cyberstition_users', {});
  const [currentUserId, setCurrentUserId] = useLocalStorage<string | null>('cyberstition_current_user', null);
  const [loading, setLoading] = useState(false);

  const currentUser = currentUserId && users[currentUserId] ? users[currentUserId].profile : null;

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      if (users[email]) {
        return { error: new Error('Email already registered') };
      }

      const newProfile: Profile = {
        id: email,
        email,
        full_name: fullName,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      setUsers({
        ...users,
        [email]: { password, profile: newProfile },
      });

      setCurrentUserId(email);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const user = users[email];
      if (!user || user.password !== password) {
        return { error: new Error('Invalid email or password') };
      }

      setCurrentUserId(email);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    setCurrentUserId(null);
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!currentUserId || !users[currentUserId]) {
      return { error: new Error('No user logged in') };
    }

    try {
      const updatedProfile = {
        ...users[currentUserId].profile,
        ...updates,
        updated_at: new Date().toISOString(),
      };

      setUsers({
        ...users,
        [currentUserId]: {
          ...users[currentUserId],
          profile: updatedProfile,
        },
      });

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        profile: currentUser,
        session: currentUser ? { user: currentUser } : null,
        loading,
        signUp,
        signIn,
        signOut,
        updateProfile,
      }}
    >
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
