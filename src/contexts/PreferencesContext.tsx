import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface UserPreferences {
  saveReportsAutomatically: boolean;
  showRiskWarnings: boolean;
  analysisHistory: number;
}

interface PreferencesContextType {
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
}

const defaultPreferences: UserPreferences = {
  saveReportsAutomatically: true,
  showRiskWarnings: true,
  analysisHistory: 30,
};

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>(
    'cyberstition_preferences',
    defaultPreferences
  );

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    setPreferences({ ...preferences, ...updates });
  };

  return (
    <PreferencesContext.Provider value={{ preferences, updatePreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
}

