import React from 'react';
import { Percent, School, TrendingUp, Award } from 'lucide-react';
import { NYC_ATTENDANCE_BENCHMARK_TARGET } from '../data/mockAttendanceData';

export default function KpiCards({ data = [] }) {
  // Compute Key Metrics dynamically based on filtered dataset
  const totalSchools = data.reduce((acc, curr) => acc + (curr.totalSchools || 0), 0);

  const overallAvg = data.length > 0
    ? (data.reduce((acc, curr) => acc + curr.attendanceRate, 0) / data.length).toFixed(1)
    : '0.0';

  // Calculate Max Gap (Difference between max and min attendance rate)
  const rates = data.map((d) => d.attendanceRate);
  const maxRate = rates.length > 0 ? Math.max(...rates) : 0;
  const minRate = rates.length > 0 ? Math.min(...rates) : 0;
  const maxGap = (maxRate - minRate).toFixed(1);

  // Compute Top Borough in current view
  const boroughAverages = {};
  data.forEach((d) => {
    if (!boroughAverages[d.borough]) {
      boroughAverages[d.borough] = { total: 0, count: 0 };
    }
    boroughAverages[d.borough].total += d.attendanceRate;
    boroughAverages[d.borough].count += 1;
  });

  let topBoroughName = 'N/A';
  let topBoroughAvg = 0;
  Object.keys(boroughAverages).forEach((b) => {
    const avg = boroughAverages[b].total / boroughAverages[b].count;
    if (avg > topBoroughAvg) {
      topBoroughAvg = avg;
      topBoroughName = b;
    }
  });

  const benchmarkDiff = (parseFloat(overallAvg) - NYC_ATTENDANCE_BENCHMARK_TARGET).toFixed(1);
  const isTargetMet = parseFloat(overallAvg) >= NYC_ATTENDANCE_BENCHMARK_TARGET;

  const cards = [
    {
      id: 'kpi-avg',
      title: 'Overall Attendance Rate',
      value: `${overallAvg}%`,
      subtitle: `Target: ${NYC_ATTENDANCE_BENCHMARK_TARGET}% (${isTargetMet ? '+' : ''}${benchmarkDiff}%)`,
      subtitleColor: isTargetMet ? 'text-emerald-400' : 'text-rose-400',
      icon: Percent,
      gradient: 'from-blue-500/20 via-blue-500/10 to-transparent',
      borderColor: 'border-blue-500/30',
      iconBg: 'bg-blue-500/20 text-blue-400',
    },
    {
      id: 'kpi-schools',
      title: 'Total Schools Tracked',
      value: totalSchools.toLocaleString(),
      subtitle: `Across ${data.length} tier/borough matrix segments`,
      subtitleColor: 'text-slate-400',
      icon: School,
      gradient: 'from-emerald-500/20 via-emerald-500/10 to-transparent',
      borderColor: 'border-emerald-500/30',
      iconBg: 'bg-emerald-500/20 text-emerald-400',
    },
    {
      id: 'kpi-gap',
      title: 'Performance Gap',
      value: `${maxGap}% pts`,
      subtitle: `Range: ${minRate.toFixed(1)}% to ${maxRate.toFixed(1)}%`,
      subtitleColor: 'text-amber-400',
      icon: TrendingUp,
      gradient: 'from-amber-500/20 via-amber-500/10 to-transparent',
      borderColor: 'border-amber-500/30',
      iconBg: 'bg-amber-500/20 text-amber-400',
    },
    {
      id: 'kpi-top',
      title: 'Top Performing Borough',
      value: topBoroughName,
      subtitle: `Average: ${topBoroughAvg.toFixed(1)}% Daily Attendance`,
      subtitleColor: 'text-purple-400',
      icon: Award,
      gradient: 'from-purple-500/20 via-purple-500/10 to-transparent',
      borderColor: 'border-purple-500/30',
      iconBg: 'bg-purple-500/20 text-purple-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.id}
            className={`glass-card p-5 rounded-2xl border ${card.borderColor} relative overflow-hidden transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-blue-950/40 group`}
          >
            {/* Background Accent Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-50 group-hover:opacity-80 transition-opacity`} />

            <div className="relative z-10 flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  {card.title}
                </p>
                <h3 className="text-3xl font-extrabold text-white tracking-tight mb-2">
                  {card.value}
                </h3>
                <p className={`text-xs font-medium ${card.subtitleColor}`}>
                  {card.subtitle}
                </p>
              </div>
              <div className={`p-3 rounded-xl ${card.iconBg} shadow-inner flex items-center justify-center shrink-0`}>
                <IconComponent className="w-6 h-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
