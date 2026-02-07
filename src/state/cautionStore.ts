import { create } from 'zustand';

export type CautionAlert = {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high';
  source?: string;
  message?: string;
  createdAt: number;
};

type Store = {
  alerts: CautionAlert[];
  addAlert: (a: Omit<CautionAlert, 'id' | 'createdAt'>) => void;
  clearAlerts: () => void;
};

export const useCautionStore = create<Store>((set) => ({
  alerts: [],
  addAlert: (a) =>
    set((s) => ({
      alerts: [{ ...a, id: crypto.randomUUID(), createdAt: Date.now() }, ...s.alerts].slice(0, 50)
    })),
  clearAlerts: () => set({ alerts: [] })
}));
