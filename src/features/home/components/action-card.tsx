import { Card } from '@/ui/card';
import { Badge } from '@/ui/badge';
import { Text } from '@/ui/text';
import type { QuickAction } from '@/features/home/types';

type ActionCardProps = {
  item: QuickAction;
};

const badgeVariantMap: Record<QuickAction['status'], 'primary' | 'warning' | 'neutral'> = {
  Ready: 'primary',
  Review: 'warning',
  Draft: 'neutral',
};

export const ActionCard = ({ item }: ActionCardProps) => (
  <Card className="gap-3">
    <Badge label={item.status} variant={badgeVariantMap[item.status]} />
    <Text variant="heading-md">{item.title}</Text>
    <Text tone="muted">{item.description}</Text>
  </Card>
);
