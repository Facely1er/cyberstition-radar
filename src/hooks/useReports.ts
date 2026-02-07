import { useLocalStorage } from './useLocalStorage';
import { usePreferences } from '../contexts/PreferencesContext';

interface Report {
  id: string;
  title: string;
  tool_type: 'messages' | 'profiles' | 'images' | 'email';
  content: any;
  risk_level: 'low' | 'medium' | 'high';
  created_at: string;
}

export function useReports() {
  const { preferences } = usePreferences();
  const [reports, setReports] = useLocalStorage<Report[]>('cyberstition_reports', []);

  const saveReport = async (
    title: string,
    toolType: 'messages' | 'profiles' | 'images' | 'email',
    content: any,
    riskLevel: 'low' | 'medium' | 'high'
  ) => {
    // Only save if auto-save is enabled
    if (!preferences.saveReportsAutomatically) {
      return { data: null, error: null };
    }

    try {
      const newReport: Report = {
        id: `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title,
        tool_type: toolType,
        content,
        risk_level: riskLevel,
        created_at: new Date().toISOString(),
      };

      setReports([newReport, ...reports]);
      return { data: newReport, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  };

  return { saveReport, saving: false };
}
