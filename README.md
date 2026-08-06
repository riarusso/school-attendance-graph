<<<<<<< HEAD
# school-attendance-graph
=======
# NYC School Attendance Analytics Dashboard MVP

A lightweight, responsive React 18 MVP comparing student daily attendance rates across four primary school tiers (**Elementary**, **K-8**, **Middle**, **High School**) and five NYC boroughs (**Manhattan**, **Bronx**, **Brooklyn**, **Queens**, **Staten Island**).

## 🚀 Key Features

1. **Socrata Open Data API Integration**: Real-time fetching from NYC Open Data dataset (`dnpx-dfnc`) with built-in SoQL aggregation parsing and automatic error recovery.
2. **Benchmark Fallback Dataset**: Built-in mock dataset (`mockAttendanceData.js`) ensuring seamless offline and rate-limit resilience.
3. **KPI Summary Cards**: Live calculated Overall Attendance Rate, Total Schools Tracked, Performance Gap, and Top Performing Borough.
4. **Dual Filter Toolbar**: Borough dropdown selector, School Tier tab pills, keyword search, and quick reset controls.
5. **Recharts Data Visualizations**:
   - Vertical Bar Chart comparing attendance rates across school tiers using designated tier colors (`#3b82f6` Elementary, `#10b981` K-8, `#f59e0b` Middle, `#ef4444` High School).
   - Horizontal Ranking Bar Chart sorting boroughs by attendance rate alongside a 92.0% NYC target reference line.
6. **Attendance Matrix & Variance Table**: Sortable data table with positive/negative variance indicators relative to the 92.0% NYC attendance goal.

## 🛠 Tech Stack

- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS v3
- **Visualization**: Recharts v2
- **Icons**: Lucide React

## 🏃 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
>>>>>>> 1c5c50b (feat: initialize NYC School Attendance Analytics Dashboard MVP)
