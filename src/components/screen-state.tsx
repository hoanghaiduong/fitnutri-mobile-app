import { type ReactNode } from 'react';

import { EmptyState } from '@/ui/empty-state';
import { ErrorState } from '@/ui/error-state';
import { Loader } from '@/ui/loader';

type ScreenStateProps = {
  loading?: boolean;
  error?: string | null;
  isEmpty?: boolean;
  loadingLabel?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  onRetry?: () => void;
  skeleton?: ReactNode;
  children: ReactNode;
};

export const ScreenState = ({
  children,
  emptyDescription = 'Chưa có dữ liệu để hiển thị.',
  emptyTitle = 'Chưa có nội dung',
  error,
  isEmpty = false,
  loading = false,
  loadingLabel,
  onRetry,
  skeleton,
}: ScreenStateProps) => {
  if (loading) {
    return skeleton ? <>{skeleton}</> : <Loader label={loadingLabel} />;
  }

  if (error) {
    return <ErrorState message={error} onAction={onRetry} />;
  }

  if (isEmpty) {
    return <EmptyState description={emptyDescription} title={emptyTitle} />;
  }

  return children;
};
