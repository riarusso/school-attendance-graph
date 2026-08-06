import React, { useState } from 'react';
import { ArrowUpDown, ChevronDown, ChevronUp, Table, CheckCircle, AlertCircle } from 'lucide-react';
import { NYC_ATTENDANCE_BENCHMARK_TARGET } from '../data/mockAttendanceData';

export default function DataTable({ data = [] }) {
  const [sortField, setSortField] = useState('attendanceRate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Sort Data
  const sortedData = [...data].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (sortField === 'variance') {
      aValue = a.attendanceRate - NYC_ATTENDANCE_BENCHMARK_TARGET;
      bValue = b.attendanceRate - NYC_ATTENDANCE_BENCHMARK_TARGET;
    }

    if (typeof aValue === 'string') {
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
  });

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage) || 1;
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getTierBadge = (tier) => {
    switch (tier) {
      case 'Elementary':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'K-8':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Middle':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'High School':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-700/50 text-slate-300 border-slate-600';
    }
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Table className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Attendance Matrix & Variance Table</h3>
            <p className="text-xs text-slate-400">Detailed breakdown compared against the NYC 92.0% Target Goal</p>
          </div>
        </div>
        <div className="text-xs text-slate-400 font-medium">
          Showing {paginatedData.length} of {sortedData.length} records
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900/90 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800 select-none">
            <tr>
              <th className="px-4 py-3.5">DBN</th>
              <th
                onClick={() => handleSort('schoolName')}
                className="px-4 py-3.5 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1">
                  School Name / Segment
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                </div>
              </th>
              <th
                onClick={() => handleSort('borough')}
                className="px-4 py-3.5 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1">
                  Borough
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                </div>
              </th>
              <th
                onClick={() => handleSort('schoolType')}
                className="px-4 py-3.5 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1">
                  Tier Level
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                </div>
              </th>
              <th
                onClick={() => handleSort('totalSchools')}
                className="px-4 py-3.5 text-right cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  Schools
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                </div>
              </th>
              <th
                onClick={() => handleSort('attendanceRate')}
                className="px-4 py-3.5 text-right cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  Avg Attendance
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                </div>
              </th>
              <th
                onClick={() => handleSort('variance')}
                className="px-4 py-3.5 text-center cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center justify-center gap-1">
                  Vs 92.0% Goal
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/80 bg-slate-950/40">
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => {
                const variance = parseFloat((row.attendanceRate - NYC_ATTENDANCE_BENCHMARK_TARGET).toFixed(1));
                const isMet = variance >= 0;

                return (
                  <tr
                    key={row.id || `${row.borough}-${row.schoolType}`}
                    className="hover:bg-slate-900/60 transition-colors"
                  >
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-slate-400">
                      {row.dbn}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-200">
                      {row.schoolName}
                    </td>
                    <td className="px-4 py-3 text-slate-300 font-medium">
                      {row.borough}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getTierBadge(row.schoolType)}`}>
                        {row.schoolType}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-slate-300">
                      {row.totalSchools}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-white">
                      {row.attendanceRate.toFixed(1)}%
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                          isMet
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                        }`}
                      >
                        {isMet ? (
                          <CheckCircle className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <AlertCircle className="w-3 h-3 text-rose-400" />
                        )}
                        {isMet ? `+${variance}%` : `${variance}%`}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-slate-500 text-sm">
                  No records match your selected filters. Try resetting your search or filter options.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2 text-xs">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
          >
            Previous
          </button>

          <span className="text-slate-400 font-medium">
            Page <strong className="text-white">{currentPage}</strong> of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
