/**
 * Fallback Benchmark Dataset for NYC School Attendance Analytics Dashboard
 * Captures student attendance metrics across 5 Boroughs and 4 School Tiers.
 */

export const mockAttendanceData = [
  // Manhattan
  { id: 'm-elem', dbn: '01M015', schoolName: 'Manhattan Elementary District Cluster', borough: 'Manhattan', schoolType: 'Elementary', attendanceRate: 92.4, totalSchools: 74, chronicAbsenteeism: 18.2 },
  { id: 'm-k8', dbn: '01M539', schoolName: 'Manhattan K-8 Academy Network', borough: 'Manhattan', schoolType: 'K-8', attendanceRate: 94.1, totalSchools: 32, chronicAbsenteeism: 14.5 },
  { id: 'm-mid', dbn: '02M104', schoolName: 'Manhattan Middle Schools Group', borough: 'Manhattan', schoolType: 'Middle', attendanceRate: 91.8, totalSchools: 48, chronicAbsenteeism: 20.1 },
  { id: 'm-hs', dbn: '02M475', schoolName: 'Manhattan High School Leadership Alliance', borough: 'Manhattan', schoolType: 'High School', attendanceRate: 89.6, totalSchools: 62, chronicAbsenteeism: 25.4 },

  // Queens
  { id: 'q-elem', dbn: '24Q013', schoolName: 'Queens Elementary School District', borough: 'Queens', schoolType: 'Elementary', attendanceRate: 93.8, totalSchools: 112, chronicAbsenteeism: 15.6 },
  { id: 'q-k8', dbn: '28Q174', schoolName: 'Queens K-8 Consolidated Schools', borough: 'Queens', schoolType: 'K-8', attendanceRate: 95.2, totalSchools: 41, chronicAbsenteeism: 12.3 },
  { id: 'q-mid', dbn: '25Q185', schoolName: 'Queens Middle Schools Regional Network', borough: 'Queens', schoolType: 'Middle', attendanceRate: 92.9, totalSchools: 58, chronicAbsenteeism: 17.8 },
  { id: 'q-hs', dbn: '26Q415', schoolName: 'Queens High School Consortium', borough: 'Queens', schoolType: 'High School', attendanceRate: 90.7, totalSchools: 76, chronicAbsenteeism: 22.1 },

  // Staten Island
  { id: 'r-elem', dbn: '31R029', schoolName: 'Staten Island Primary Elementary Cluster', borough: 'Staten Island', schoolType: 'Elementary', attendanceRate: 93.1, totalSchools: 38, chronicAbsenteeism: 16.9 },
  { id: 'r-k8', dbn: '31R048', schoolName: 'Staten Island K-8 Learning Alliance', borough: 'Staten Island', schoolType: 'K-8', attendanceRate: 94.5, totalSchools: 14, chronicAbsenteeism: 13.8 },
  { id: 'r-mid', dbn: '31R075', schoolName: 'Staten Island Middle School Network', borough: 'Staten Island', schoolType: 'Middle', attendanceRate: 91.5, totalSchools: 18, chronicAbsenteeism: 21.0 },
  { id: 'r-hs', dbn: '31R440', schoolName: 'Staten Island High Schools Alliance', borough: 'Staten Island', schoolType: 'High School', attendanceRate: 88.9, totalSchools: 16, chronicAbsenteeism: 26.8 },

  // Brooklyn
  { id: 'k-elem', dbn: '13K307', schoolName: 'Brooklyn Central Elementary Schools', borough: 'Brooklyn', schoolType: 'Elementary', attendanceRate: 91.2, totalSchools: 135, chronicAbsenteeism: 21.4 },
  { id: 'k-k8', dbn: '15K038', schoolName: 'Brooklyn K-8 Communities', borough: 'Brooklyn', schoolType: 'K-8', attendanceRate: 93.0, totalSchools: 49, chronicAbsenteeism: 16.2 },
  { id: 'k-mid', dbn: '14K050', schoolName: 'Brooklyn Middle School District', borough: 'Brooklyn', schoolType: 'Middle', attendanceRate: 89.7, totalSchools: 72, chronicAbsenteeism: 24.8 },
  { id: 'k-hs', dbn: '17K488', schoolName: 'Brooklyn High School Federation', borough: 'Brooklyn', schoolType: 'High School', attendanceRate: 87.4, totalSchools: 98, chronicAbsenteeism: 29.5 },

  // Bronx
  { id: 'x-elem', dbn: '07X029', schoolName: 'Bronx Elementary School Alliance', borough: 'Bronx', schoolType: 'Elementary', attendanceRate: 89.5, totalSchools: 94, chronicAbsenteeism: 26.1 },
  { id: 'x-k8', dbn: '09X218', schoolName: 'Bronx K-8 Community Schools', borough: 'Bronx', schoolType: 'K-8', attendanceRate: 91.3, totalSchools: 36, chronicAbsenteeism: 21.7 },
  { id: 'x-mid', dbn: '10X045', schoolName: 'Bronx Middle School Collaborative', borough: 'Bronx', schoolType: 'Middle', attendanceRate: 87.8, totalSchools: 54, chronicAbsenteeism: 28.9 },
  { id: 'x-hs', dbn: '12X479', schoolName: 'Bronx High School Regional Network', borough: 'Bronx', schoolType: 'High School', attendanceRate: 85.1, totalSchools: 78, chronicAbsenteeism: 34.2 }
];

export const NYC_ATTENDANCE_BENCHMARK_TARGET = 92.0;
