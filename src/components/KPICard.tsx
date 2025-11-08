import { Card } from '@/components/ui/card';
import { StarIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: StarIcon;
  trend?: string;
  trendUp?: boolean;
}

export function KPICard({ title, value, icon: Icon, trend, trendUp }: KPICardProps) {
  return (
    <Card className="p-6 bg-card text-card-foreground border-border animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground font-normal mb-2">{title}</p>
          <p className="text-3xl font-headline font-bold text-card-foreground">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 font-normal ${trendUp ? 'text-success' : 'text-warning'}`}>
              {trend}
            </p>
          )}
        </div>
        <div className="p-3 bg-tertiary rounded-lg">
          <Icon className="h-6 w-6 text-tertiary-foreground" strokeWidth={1.5} />
        </div>
      </div>
    </Card>
  );
}
