export type QuickAction = {
  id: string;
  title: string;
  description: string;
  status: 'Ready' | 'Draft' | 'Review';
};
