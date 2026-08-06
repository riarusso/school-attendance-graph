import React from 'react';
import { Filter, RotateCcw, Search, Database, CheckCircle2, AlertTriangle, Building2 } from 'lucide-react';

const BOROUGHS = ['All Boroughs', 'Manhattan', 'Bronx', 'Brooklyn', 'Queens', 'Staten Island'];
const SCHOOL_TYPES = ['All Types', 'Elementary', 'K-8', 'Middle', 'High School'];

export default function FilterToolbar({
  selectedBorough,
  setSelectedBorough,
  selectedType,
  setSelectedType,
  searchQuery,
  setSearchQuery,
  isFallback,
  onReset,
  totalResultsCount
}) {
  const isFiltered = selectedBorough !== 'All Boroughs' || selectedType !== 'All Types' || searchQuery.trim() !== '';

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4">
      {/* Top Header & Status Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Filter className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-wide">Filter & Data Controls</h2>
            <p className="text-xs text-slate-400">
              Narrow attendance insights by borough, school tier, or search keyword
            </p>
          </div>
        </div>

        {/* Live vs Fallback Socrata Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
              isFallback
                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>{isFallback ? 'Mock Benchmark Active' : 'Live Socrata API Connected'}</span>
            {isFallback ? (
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 ml-0.5" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 ml-0.5" />
            )}
          </div>

          {isFiltered && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
              title="Reset all filters to default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Filter Controls Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Borough Select Dropdown */}
        <div className="md:col-span-4 flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            Borough Selection
          </label>
          <select
            value={selectedBorough}
            onChange={(e) => setSelectedBorough(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all cursor-pointer"
          >
            {BOROUGHS.map((b) => (
              <option key={b} value={b} className="bg-slate-900 text-slate-200">
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Search Keyword */}
        <div className="md:col-span-8 flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
            <Search className="w-3.5 h-3.5 text-blue-400" />
            Search DBN / School / Borough
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. 'Manhattan', '01M015', or 'High School'..."
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-9 pr-3.5 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      {/* School Type Pills Tab Bar */}
      <div className="pt-2 flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300">
            School Tier Filter
          </label>
          <span className="text-xs text-slate-400 font-medium">
            Showing <strong className="text-blue-400">{totalResultsCount}</strong> segments
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {SCHOOL_TYPES.map((type) => {
            const isSelected = selectedType === type;
            let activeStyle = 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border-blue-500';
            if (type === 'Elementary' && isSelected) activeStyle = 'bg-blue-600 text-white shadow-blue-500/30 border-blue-400';
            if (type === 'K-8' && isSelected) activeStyle = 'bg-emerald-600 text-white shadow-emerald-500/30 border-emerald-400';
            if (type === 'Middle' && isSelected) activeStyle = 'bg-amber-600 text-white shadow-amber-500/30 border-amber-400';
            if (type === 'High School' && isSelected) activeStyle = 'bg-rose-600 text-white shadow-rose-500/30 border-rose-400';

            return (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                  isSelected
                    ? activeStyle
                    : 'bg-slate-900/60 hover:bg-slate-800 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
