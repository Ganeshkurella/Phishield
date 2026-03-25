import { useState, useEffect } from 'react';

export interface HistoryItem {
  id: string | number;
  date: string;
  type: string;
  input: string;
  result: "Safe" | "Suspicious" | "Scam";
  riskScore: number;
}

const getStorageKey = (userId?: string) => userId ? `phishield_user_history_${userId}` : 'phishield_user_history_guest';

export const getHistory = (userId?: string): HistoryItem[] => {
  const data = localStorage.getItem(getStorageKey(userId));
  return data ? JSON.parse(data) : [];
};

export const addHistory = (item: Omit<HistoryItem, 'id' | 'date'>, userId?: string) => {
  const history = getHistory(userId);
  const newItem: HistoryItem = {
    ...item,
    id: Date.now(),
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };
  localStorage.setItem(getStorageKey(userId), JSON.stringify([newItem, ...history]));
  window.dispatchEvent(new CustomEvent('historyUpdated', { detail: { userId } }));
};

export function useHistory(userId?: string) {
  const [history, setHistory] = useState<HistoryItem[]>(() => getHistory(userId));

  useEffect(() => {
    setHistory(getHistory(userId)); // Refresh immediately if userId changes
    const handleStorage = (e: StorageEvent) => {
      if (e.key === getStorageKey(userId)) setHistory(getHistory(userId));
    };
    const handleUpdate = (e: Event) => {
       const customEvent = e as CustomEvent;
       if (customEvent.detail?.userId === userId) {
         setHistory(getHistory(userId));
       }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('historyUpdated', handleUpdate);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('historyUpdated', handleUpdate);
    };
  }, [userId]);

  return history;
}
