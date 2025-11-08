interface LiveStatusChipProps {
  isLive: boolean;
  lastUpdated?: string;
}

export function LiveStatusChip({ isLive, lastUpdated }: LiveStatusChipProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border">
        <div
          className={`w-2 h-2 rounded-full ${
            isLive ? 'bg-success animate-pulse-subtle' : 'bg-muted'
          }`}
        />
        <span className="text-xs font-normal text-card-foreground">
          {isLive ? 'Live Updating' : 'Paused'}
        </span>
      </div>
      {lastUpdated && (
        <span className="text-xs text-muted-foreground font-normal">
          Updated: {lastUpdated}
        </span>
      )}
    </div>
  );
}
