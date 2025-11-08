import { useEffect, useState } from 'react';
import { KPICard } from '@/components/KPICard';
import { ChartCard } from '@/components/ChartCard';
import { DataTable } from '@/components/DataTable';
import { LiveStatusChip } from '@/components/LiveStatusChip';
import { RocketIcon, AlertTriangleIcon, TargetIcon, TrendingUpIcon } from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export function AsteroidDashboard() {
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

  const proximityData = [
    { date: 'Jan 1', distance: 4.2, asteroids: 12 },
    { date: 'Jan 8', distance: 3.8, asteroids: 15 },
    { date: 'Jan 15', distance: 5.1, asteroids: 8 },
    { date: 'Jan 22', distance: 2.9, asteroids: 22 },
    { date: 'Jan 29', distance: 4.5, asteroids: 14 },
    { date: 'Feb 5', distance: 3.2, asteroids: 18 },
    { date: 'Feb 12', distance: 4.8, asteroids: 11 },
  ];

  const velocityData = [
    { date: 'Week 1', velocity: 15.2 },
    { date: 'Week 2', velocity: 18.5 },
    { date: 'Week 3', velocity: 12.8 },
    { date: 'Week 4', velocity: 21.3 },
    { date: 'Week 5', velocity: 16.7 },
    { date: 'Week 6', velocity: 19.4 },
  ];

  const tableColumns = [
    { key: 'name', label: 'Asteroid Name' },
    { key: 'distance', label: 'Distance (LD)' },
    { key: 'velocity', label: 'Velocity (km/s)' },
    { key: 'diameter', label: 'Diameter (m)' },
    { key: 'hazardous', label: 'Hazardous' },
  ];

  const tableData = [
    { name: '2024 AA1', distance: '2.3', velocity: '18.5', diameter: '450', hazardous: 'Yes' },
    { name: '2024 BB2', distance: '4.1', velocity: '12.3', diameter: '280', hazardous: 'No' },
    { name: '2024 CC3', distance: '1.8', velocity: '22.7', diameter: '620', hazardous: 'Yes' },
    { name: '2024 DD4', distance: '5.6', velocity: '9.8', diameter: '190', hazardous: 'No' },
    { name: '2024 EE5', distance: '3.2', velocity: '15.4', diameter: '340', hazardous: 'No' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground mb-2">
            Asteroid Tracking
          </h1>
          <p className="text-muted-foreground font-normal">
            Real-time monitoring of near-Earth objects and potential hazards
          </p>
        </div>
        <LiveStatusChip isLive={isLive} lastUpdated={lastUpdated} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Monitored"
          value="1,247"
          icon={RocketIcon}
          trend="+12% this month"
          trendUp={true}
        />
        <KPICard
          title="Potentially Hazardous"
          value="23"
          icon={AlertTriangleIcon}
          trend="-3 from last week"
          trendUp={false}
        />
        <KPICard
          title="Closest Approach"
          value="1.8 LD"
          icon={TargetIcon}
          trend="2024 CC3"
          trendUp={false}
        />
        <KPICard
          title="Avg Velocity"
          value="16.2 km/s"
          icon={TrendingUpIcon}
          trend="+2.1 km/s"
          trendUp={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Asteroid Proximity vs. Date"
          description="Distance in Lunar Distance (LD) over time"
          onRefresh={() => console.log('Refreshing proximity data')}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={proximityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 12%, 25%)" />
              <XAxis
                dataKey="date"
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
                dataKey="distance"
                stroke="hsl(192, 70%, 45%)"
                strokeWidth={2}
                dot={{ fill: 'hsl(192, 70%, 45%)', r: 4 }}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Average Velocity Trends"
          description="Weekly average velocity measurements"
          onRefresh={() => console.log('Refreshing velocity data')}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={velocityData}>
              <defs>
                <linearGradient id="velocityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(258, 58%, 60%)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(258, 58%, 60%)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 12%, 25%)" />
              <XAxis
                dataKey="date"
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
              <Area
                type="monotone"
                dataKey="velocity"
                stroke="hsl(258, 58%, 60%)"
                strokeWidth={2}
                fill="url(#velocityGradient)"
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-headline font-semibold text-foreground">
          Recent Asteroid Activity
        </h2>
        <DataTable columns={tableColumns} data={tableData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      </div>
    </div>
  );
}
