import type { QuickAction } from '@/features/home/types';

export const quickActions: QuickAction[] = [
  {
    id: '1',
    title: 'Analytics snapshot',
    description: 'Check core KPIs with a single tap and clean visual hierarchy.',
    status: 'Ready',
  },
  {
    id: '2',
    title: 'Content review queue',
    description: 'Support loading, empty, and approval states from day one.',
    status: 'Review',
  },
  {
    id: '3',
    title: 'Offline draft cache',
    description: 'Prepare AsyncStorage-backed local persistence for real forms.',
    status: 'Draft',
  },
];
