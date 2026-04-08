import { create } from 'zustand';

export type ToastTone = 'default' | 'success' | 'destructive';

export type ToastItem = {
  id: string;
  title: string;
  description?: string;
  tone: ToastTone;
};

type ToastState = {
  items: ToastItem[];
  show: (input: Omit<ToastItem, 'id'>) => void;
  dismiss: (id: string) => void;
};

export const useToastStore = create<ToastState>((set) => ({
  items: [],
  show: (input) => {
    const item: ToastItem = {
      ...input,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    };

    set((state) => ({ items: [...state.items, item] }));
    setTimeout(() => {
      set((state) => ({ items: state.items.filter((toast) => toast.id !== item.id) }));
    }, 3200);
  },
  dismiss: (id) => set((state) => ({ items: state.items.filter((toast) => toast.id !== id) })),
}));
