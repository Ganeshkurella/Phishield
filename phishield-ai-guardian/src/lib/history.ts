export interface HistoryItem {
  id: string | number;
  date: string;
  type: string;
  input: string;
  result: "Safe" | "Suspicious" | "Scam";
  riskScore: number;
}

const STORAGE_KEY = 'phishield_user_history';

export const getHistory = (): HistoryItem[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const addHistory = (item: Omit<HistoryItem, 'id' | 'date'>) => {
  const history = getHistory();
  const newItem: HistoryItem = {
    ...item,
    id: Date.now(),
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([newItem, ...history]));
};
