import { useAuth } from '../contexts/AuthContext';
import { useLocalStorage } from './useLocalStorage';

interface Report {
  id: string;
  user_id: string;
  title: string;
  tool_type: 'messages' | 'profiles' | 'images' | 'email';
  content: any;
  risk_level: 'low' | 'medium' | 'high';
  created_at: string;
}

export function useReports() {
  const { user } = useAuth();
  const [reports, setReports] = useLocalStorage<Report[]>('cyberstition_reports', []);

  const saveReport = async (
    title: string,
    toolType: 'messages' | 'profiles' | 'images' | 'email',
    content: any,
    riskLevel: 'low' | 'medium' | 'high'
  ) => {
    if (!user) {
      return { error: new Error('Must be logged in to save reports') };
    }

    try {
      const newReport: Report = {
        id: `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        user_id: user.id,
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
