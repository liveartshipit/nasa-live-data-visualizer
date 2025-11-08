import { useEffect, useState } from 'react';
import { KPICard } from '@/components/KPICard';
import { ChartCard } from '@/components/ChartCard';
import { DataTable } from '@/components/DataTable';
import { LiveStatusChip } from '@/components/LiveStatusChip';
import { SunIcon, ZapIcon, ActivityIcon, RadioIcon } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export function SolarData() {
  const [isLive, setIsLive] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    window.scrollTo(0, 0);
    const interval = setInterval(() => {
      if (isLive) {
        setLastUpdated(new Date().toLocaleTimeString());
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isLive]);

  const radiationData = [
    { day: 'Mon', radiation: 1365 },
    { day: 'Tue', radiation: 1368 },
    { day: 'Wed', radiation: 1362 },
    { day: 'Thu', radiation: 1370 },
    { day: 'Fri', radiation: 1366 },
    { day: 'Sat', radiation: 1364 },
    { day: 'Sun', radiation: 1367 },
  ];

  const flareData = [
    { time: '00:00', intensity: 2.1 },
    { time: '04:00', intensity: 3.5 },
    { time: '08:00', intensity: 5.2 },
    { time: '12:00', intensity: 4.8 },
    { time: '16:00', intensity: 6.3 },
    { time: '20:00', intensity: 3.9 },
  ];

  const tableColumns = [
    { key: 'event', label: 'Event Type' },
    { key: 'time', label: 'Time (UTC)' },
    { key: 'intensity', label: 'Intensity' },
    { key: 'duration', label: 'Duration (min)' },
    { key: 'region', label: 'Active Region' },
  ];

  const tableData = [
    { event: 'Solar Flare', time: '14:23', intensity: 'M5.2', duration: '18', region: 'AR3234' },
    { event: 'CME', time: '09:45', intensity: 'High', duration: '45', region: 'AR3235' },
    { event: 'Solar Wind', time: '18:12', intensity: 'Moderate', duration: '120', region: 'N/A' },
    { event: 'Solar Flare', time: '22:56', intensity: 'C8.1', duration: '12', region: 'AR3236' },
    { event: 'Proton Event', time: '03:34', intensity: 'Low', duration: '90', region: 'AR3234' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground mb-2">
            Solar ActivityIcon
          </h1>
          <p className="text-muted-foreground font-normal">
            Real-time solar radiation and space weather monitoring
          </p>
        </div>
        <LiveStatusChip isLive={isLive} lastUpdated={lastUpdated} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Solar Radiation"
          value="1,366 W/m²"
          icon={SunIcon}
          trend="+2 W/m² today"
          trendUp={true}
        />
        <KPICard
          title="Solar Flares"
          value="12"
          icon={ZapIcon}
          trend="3 M-class detected"
          trendUp={false}
        />
        <KPICard
          title="Sunspot Number"
          value="87"
          icon={ActivityIcon}
          trend="+5 from yesterday"
          trendUp={true}
        />
        <KPICard
          title="Solar Wind Speed"
          value="425 km/s"
          icon={RadioIcon}
          trend="Normal range"
          trendUp={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Daily Solar Radiation"
          description="Total solar irradiance measurements (W/m²)"
          onRefresh={() => console.log('Refreshing radiation data')}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={radiationData}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(192, 70%, 45%)" />
                  <stop offset="100%" stopColor="hsl(258, 58%, 60%)" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 12%, 25%)" />
              <XAxis
                dataKey="day"
                stroke="hsl(220, 10%, 90%)"
                style={{ fontSize: '12px' }}
              />
              <YAxis stroke="hsl(220, 10%, 90%)" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(222, 52%, 22%)',
                  border: '1px solid hsl(220, 12%, 25%)',
                  borderRadius: '8px',
                  color: 'hsl(210, 100%, 96%)',
                }}
              />
              <Bar
                dataKey="radiation"
                fill="url(#barGradient)"
                radius={[8, 8, 0, 0]}
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Solar Flare Activity"
          description="Flare intensity over 24 hours"
          onRefresh={() => console.log('Refreshing flare data')}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={flareData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 12%, 25%)" />
              <XAxis
                dataKey="time"
                stroke="hsl(220, 10%, 90%)"
                style={{ fontSize: '12px' }}
              />
              <YAxis stroke="hsl(220, 10%, 90%)" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(222, 52%, 22%)',
                  border: '1px solid hsl(220, 12%, 25%)',
                  borderRadius: '8px',
                  color: 'hsl(210, 100%, 96%)',
                }}
              />
              <Line
                type="monotone"
                dataKey="intensity"
                stroke="hsl(258, 58%, 60%)"
                strokeWidth={2}
                dot={{ fill: 'hsl(258, 58%, 60%)', r: 4 }}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-headline font-semibold text-foreground">
          Recent Solar Events
        </h2>
        <DataTable columns={tableColumns} data={tableData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src="https://c.animaapp.com/mhqiinl4PXBnm6/img/ai_3.png"
            alt="live data stream"
            width={1000}
            height={700}
            loading="lazy"
            className="w-full h-64 object-cover"
          />
        </div>
        <div className="relative overflow-hidden rounded-lg">
          <img
            src="https://c.animaapp.com/mhqiinl4PXBnm6/img/ai_1.png"
            alt="nasa data visualization"
            width={1200}
            height={800}
            loading="lazy"
            className="w-full h-64 object-cover"
          />
        </div>
        <div className="relative overflow-hidden rounded-lg">
          <img
            src="https://c.animaapp.com/mhqiinl4PXBnm6/img/ai_2.png"
            alt="space analytics pattern"
            width={1000}
            height={700}
            loading="lazy"
            className="w-full h-64 object-cover"
          />
        </div>
      </div>
    </div>
  );
}
