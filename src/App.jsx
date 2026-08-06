import React, { useState, useEffect, useMemo } from 'react';
import { RefreshCw, School2, AlertTriangle, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import KpiCards from './components/KpiCards';
import FilterToolbar from './components/FilterToolbar';
import AttendanceCharts from './components/AttendanceCharts';
import DataTable from './components/DataTable';
import { fetchAttendanceData } from './services/socrataApi';
import { mockAttendanceData } from './data/mockAttendanceData';

export default function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Filter States
  const [selectedBorough, setSelectedBorough] = useState('All Boroughs');
  const [selectedType, setSelectedType] = useState('All Types');
  const [searchQuery, setSearchQuery] = useState('');

  // Initial Data Fetch
  const loadData = async () => {
    setIsLoading(true);
    setErrorMsg(null);

    const result = await fetchAttendanceData();
    setData(result.data);
    setIsFallback(result.isFallback);
    if (result.error) {
      setErrorMsg(result.error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter Pipeline
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Borough filter
      if (selectedBorough !== 'All Boroughs' && item.borough !== selectedBorough) {
        return false;
      }
      // School Type filter
      if (selectedType !== 'All Types' && item.schoolType !== selectedType) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchName = item.schoolName.toLowerCase().includes(query);
        const matchDbn = item.dbn.toLowerCase().includes(query);
        const matchBorough = item.borough.toLowerCase().includes(query);
        const matchType = item.schoolType.toLowerCase().includes(query);
        return matchName || matchDbn || matchBorough || matchType;
      }
      return true;
    });
  }, [data, selectedBorough, selectedType, searchQuery]);

  const handleResetFilters = () => {
    setSelectedBorough('All Boroughs');
    setSelectedType('All Types');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Background Subtle Gradient Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-6">
        {/* Header Branding Bar */}
        <header className="glass-panel p-6 rounded-3xl border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/20 shrink-0">
              <School2 className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  NYC School Attendance
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-extrabold uppercase tracking-widest">
                  Analytics MVP
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Comparative Daily Attendance Performance across NYC School Tiers & Boroughs
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700 shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 text-blue-400 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Fetching API...' : 'Refresh Socrata Data'}</span>
            </button>
          </div>
        </header>

        {/* Fallback Banner Alert if Socrata Rate Limited */}
        {isFallback && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 flex items-start gap-3 text-xs leading-relaxed shadow-lg">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-300">Notice: Socrata Endpoint Rate-Limited / Offline. </span>
              Active fallback benchmark dataset loaded ({data.length} matrix segments). The app remains 100% interactive for full analytics comparison.
              {errorMsg && <span className="block text-[11px] text-amber-400/80 mt-1">Details: {errorMsg}</span>}
            </div>
          </div>
        )}

        {/* 1. KPI Metric Summary Cards */}
        <section>
          <KpiCards data={filteredData} />
        </section>

        {/* 2. Dual Filter Toolbar */}
        <section>
          <FilterToolbar
            selectedBorough={selectedBorough}
            setSelectedBorough={setSelectedBorough}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isFallback={isFallback}
            onReset={handleResetFilters}
            totalResultsCount={filteredData.length}
          />
        </section>

        {/* 3. Interactive Recharts Visualizations */}
        <section>
          <AttendanceCharts data={filteredData} />
        </section>

        {/* 4. Matrix Data Table with Variance Indicators */}
        <section>
          <DataTable data={filteredData} />
        </section>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-950/80 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>NYC Open Data Endpoint (<code className="text-slate-400 font-mono">dnpx-dfnc</code>) Integrated</span>
          </div>
          <p>© 2026 NYC Public Schools Attendance Analytics MVP. Built with React 18 & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}
