import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCwIcon } from 'lucide-react';
import { useState } from 'react';

interface ChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  onRefresh?: () => void;
}

export function ChartCard({ title, description, children, onRefresh }: ChartCardProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (onRefresh) {
      setIsRefreshing(true);
      await onRefresh();
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  return (
    <Card className="p-6 bg-card text-card-foreground border-border animate-fade-in">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-headline font-semibold text-card-foreground mb-1">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-muted-foreground font-normal">{description}</p>
          )}
        </div>
        {onRefresh && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="bg-transparent text-card-foreground hover:bg-muted hover:text-muted-foreground"
          >
            <RefreshCwIcon
              className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`}
              strokeWidth={1.5}
            />
          </Button>
        )}
      </div>
      <div className="w-full h-64">{children}</div>
    </Card>
  );
}
