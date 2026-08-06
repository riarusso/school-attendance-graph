import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from 'recharts';
import { BarChart3, TrendingUp } from 'lucide-react';
import { NYC_ATTENDANCE_BENCHMARK_TARGET } from '../data/mockAttendanceData';

const TIER_COLORS = {
  'Elementary': '#3b82f6',
  'K-8': '#10b981',
  'Middle': '#f59e0b',
  'High School': '#ef4444',
};

const BOROUGH_COLORS = {
  'Manhattan': '#60a5fa',
  'Queens': '#34d399',
  'Staten Island': '#a78bfa',
  'Brooklyn': '#fbbf24',
  'Bronx': '#f87171',
};

export default function AttendanceCharts({ data = [] }) {
  // Aggregate data by School Tier for Primary Vertical Bar Chart
  const tierAggregates = ['Elementary', 'K-8', 'Middle', 'High School'].map((tier) => {
    const tierRows = data.filter((d) => d.schoolType === tier);
    const avg = tierRows.length > 0
      ? tierRows.reduce((sum, item) => sum + item.attendanceRate, 0) / tierRows.length
      : 0;
    const totalSchools = tierRows.reduce((sum, item) => sum + (item.totalSchools || 0), 0);

    return {
      schoolType: tier,
      attendanceRate: parseFloat(avg.toFixed(1)),
      totalSchools,
      color: TIER_COLORS[tier] || '#3b82f6',
    };
  });

  // Aggregate data by Borough for Secondary Horizontal Ranking Chart
  const boroughAggregates = ['Manhattan', 'Queens', 'Staten Island', 'Brooklyn', 'Bronx'].map((b) => {
    const bRows = data.filter((d) => d.borough === b);
    const avg = bRows.length > 0
      ? bRows.reduce((sum, item) => sum + item.attendanceRate, 0) / bRows.length
      : 0;
    const totalSchools = bRows.reduce((sum, item) => sum + (item.totalSchools || 0), 0);

    return {
      borough: b,
      attendanceRate: parseFloat(avg.toFixed(1)),
      totalSchools,
      color: BOROUGH_COLORS[b] || '#60a5fa',
    };
  }).sort((a, b) => b.attendanceRate - a.attendanceRate);

  // Custom Custom Tooltip Component
  const CustomTooltip = ({ active, payload, label, isBorough = false }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-slate-900/95 border border-slate-700/80 rounded-xl p-3.5 shadow-2xl backdrop-blur-md">
          <p className="text-xs font-bold text-white mb-1">
            {isBorough ? `${item.borough} Borough` : `${item.schoolType} Tier`}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-400">Attendance Rate:</span>
            <span className="font-extrabold text-blue-400">{item.attendanceRate}%</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
            <span>Total Schools:</span>
            <span className="font-semibold text-slate-200">{item.totalSchools}</span>
          </div>
          <div className="text-[11px] mt-1.5 pt-1.5 border-t border-slate-800 text-slate-400">
            Vs 92% Benchmark Target:{' '}
            <strong className={item.attendanceRate >= 92 ? 'text-emerald-400' : 'text-rose-400'}>
              {(item.attendanceRate - 92).toFixed(1)}%
            </strong>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Primary Chart: Vertical Bar Chart across School Tiers */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Attendance by School Level</h3>
              <p className="text-xs text-slate-400">Comparing Elementary, K-8, Middle, & High School</p>
            </div>
          </div>
        </div>

        <div className="h-72 w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tierAggregates} margin={{ top: 15, right: 15, left: -15, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} vertical={false} />
              <XAxis
                dataKey="schoolType"
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#475569' }}
              />
              <YAxis
                domain={[75, 100]}
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#475569' }}
                tickFormatter={(val) => `${val}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine
                y={NYC_ATTENDANCE_BENCHMARK_TARGET}
                stroke="#f59e0b"
                strokeDasharray="4 4"
                label={{
                  value: 'Target 92%',
                  fill: '#f59e0b',
                  fontSize: 11,
                  position: 'top',
                }}
              />
              <Bar dataKey="attendanceRate" radius={[8, 8, 0, 0]} maxBarSize={50}>
                {tierAggregates.map((entry, index) => (
                  <Cell key={`cell-tier-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tier Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 pt-3 border-t border-slate-800/80 text-xs">
          {Object.entries(TIER_COLORS).map(([tier, color]) => (
            <div key={tier} className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-slate-300 font-medium">{tier}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Secondary Chart: Horizontal Ranking Bar Chart across Boroughs */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Borough Rankings (Horizontal)</h3>
              <p className="text-xs text-slate-400">Ranked from highest to lowest average daily attendance</p>
            </div>
          </div>
        </div>

        <div className="h-72 w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={boroughAggregates}
              margin={{ top: 15, right: 25, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} horizontal={false} />
              <XAxis
                type="number"
                domain={[75, 100]}
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#475569' }}
                tickFormatter={(val) => `${val}%`}
              />
              <YAxis
                type="category"
                dataKey="borough"
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: '#475569' }}
                width={85}
              />
              <Tooltip content={<CustomTooltip isBorough={true} />} />
              <ReferenceLine
                x={NYC_ATTENDANCE_BENCHMARK_TARGET}
                stroke="#f59e0b"
                strokeDasharray="4 4"
                label={{
                  value: '92% Goal',
                  fill: '#f59e0b',
                  fontSize: 10,
                  position: 'insideTopRight',
                }}
              />
              <Bar dataKey="attendanceRate" radius={[0, 8, 8, 0]} maxBarSize={30}>
                {boroughAggregates.map((entry, index) => (
                  <Cell key={`cell-borough-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Borough Legend */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mt-4 pt-3 border-t border-slate-800/80 text-xs">
          {Object.entries(BOROUGH_COLORS).map(([b, color]) => (
            <div key={b} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-slate-300 font-medium">{b}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
