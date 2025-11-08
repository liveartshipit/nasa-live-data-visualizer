import { useEffect, useState } from 'react';
import { KPICard } from '@/components/KPICard';
import { ChartCard } from '@/components/ChartCard';
import { DataTable } from '@/components/DataTable';
import { LiveStatusChip } from '@/components/LiveStatusChip';
import { GlobeIcon, ThermometerIcon, DropletsIcon, WindIcon } from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export function EarthObservation() {
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

  const temperatureData = [
    { month: 'Jan', temp: 14.2 },
    { month: 'Feb', temp: 15.1 },
    { month: 'Mar', temp: 16.8 },
    { month: 'Apr', temp: 18.5 },
    { month: 'May', temp: 20.3 },
    { month: 'Jun', temp: 22.7 },
  ];

  const precipitationData = [
    { region: 'North', amount: 45 },
    { region: 'South', amount: 78 },
    { region: 'East', amount: 62 },
    { region: 'West', amount: 53 },
    { region: 'Central', amount: 41 },
  ];

  const tableColumns = [
    { key: 'location', label: 'Location' },
    { key: 'temperature', label: 'Temperature (°C)' },
    { key: 'humidity', label: 'Humidity (%)' },
    { key: 'pressure', label: 'Pressure (hPa)' },
    { key: 'windSpeed', label: 'WindIcon Speed (km/h)' },
  ];

  const tableData = [
    { location: 'North America', temperature: '18.5', humidity: '65', pressure: '1013', windSpeed: '12' },
    { location: 'South America', temperature: '24.2', humidity: '78', pressure: '1009', windSpeed: '8' },
    { location: 'Europe', temperature: '15.8', humidity: '72', pressure: '1015', windSpeed: '15' },
    { location: 'Asia', temperature: '22.1', humidity: '68', pressure: '1011', windSpeed: '10' },
    { location: 'Africa', temperature: '28.7', humidity: '45', pressure: '1008', windSpeed: '6' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline font-bold text-foreground mb-2">
            Earth Observation
          </h1>
          <p className="text-muted-foreground font-normal">
            Global climate monitoring and environmental data analysis
          </p>
        </div>
        <LiveStatusChip isLive={isLive} lastUpdated={lastUpdated} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Global Avg Temp"
          value="19.2°C"
          icon={ThermometerIcon}
          trend="+0.3°C this month"
          trendUp={true}
        />
        <KPICard
          title="Humidity Index"
          value="68%"
          icon={DropletsIcon}
          trend="-2% from average"
          trendUp={false}
        />
        <KPICard
          title="WindIcon Speed"
          value="11 km/h"
          icon={WindIcon}
          trend="Stable"
          trendUp={true}
        />
        <KPICard
          title="Monitored Regions"
          value="247"
          icon={GlobeIcon}
          trend="+5 new stations"
          trendUp={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Temperature Variation"
          description="Monthly average temperature trends"
          onRefresh={() => console.log('Refreshing temperature data')}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={temperatureData}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(192, 70%, 45%)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(192, 70%, 45%)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 12%, 25%)" />
              <XAxis
                dataKey="month"
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
                dataKey="temp"
                stroke="hsl(192, 70%, 45%)"
                strokeWidth={2}
                fill="url(#tempGradient)"
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Regional Precipitation"
          description="Average precipitation by region (mm)"
          onRefresh={() => console.log('Refreshing precipitation data')}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={precipitationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 12%, 25%)" />
              <XAxis
                dataKey="region"
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
                dataKey="amount"
                fill="hsl(258, 58%, 60%)"
                radius={[8, 8, 0, 0]}
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-headline font-semibold text-foreground">
          Regional Climate Data
        </h2>
        <DataTable columns={tableColumns} data={tableData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      </div>
    </div>
  );
}
