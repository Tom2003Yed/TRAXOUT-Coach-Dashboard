  import React, { useState } from 'react';

const streakRanges = {
  YEAR: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'],
  QUARTER: ['W1', 'W3', 'W5', 'W7', 'W9', 'W12'],
  MONTH: ['1', '5', '10', '15', '20', '25', '30'],
  WEEK: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
};

const getStreakHistory = (streakDays, range) => {
  const patterns = {
    YEAR: [-5, -3, -4, -1, 1, 0],
    QUARTER: [-3, -1, -2, 0, 2, 0],
    MONTH: [-2, -1, 1, 0, 2, 1, 0],
    WEEK: [-1, 0, 1, 0, 2, 1, 0]
  };

  return streakRanges[range].map((label, index) => ({
    label,
    value: Math.max(1, streakDays + patterns[range][index])
  }));
};

const setSizeRanges = {
  YEAR: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'],
  QUARTER: ['W1', 'W3', 'W5', 'W7', 'W9', 'W12'],
  MONTH: ['1', '5', '10', '15', '20', '25', '30'],
  WEEK: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
};

const getSetSizeHistory = (avgSetSize, range) => {
  const patterns = {
    YEAR: [-1.3, -0.6, 0.4, 1.1, 0.2, 0.7],
    QUARTER: [-0.8, 0.3, -0.4, 0.7, 0.1, 0.5],
    MONTH: [-0.6, 0.2, -0.3, 0.5, 0.1, 0.7, 0.4],
    WEEK: [-0.4, 0.2, 0.6, -0.1, 0.8, 0.4, 0.7]
  };

  return setSizeRanges[range].map((label, index) => ({
    label,
    value: Math.max(1, Number((avgSetSize + patterns[range][index]).toFixed(1)))
  }));
};

const exerciseCatalog = {
  'Barbell Bench Press': { category: 'Chest', image: 'https://loremflickr.com/320/220/benchpress,gym?lock=1' },
  'Lat Pulldown': { category: 'Back', image: 'https://loremflickr.com/320/220/latpulldown,gym?lock=2' },
  'Incline Dumbbell Press': { category: 'Chest', image: 'https://loremflickr.com/320/220/dumbbell,press,gym?lock=3' },
  'Barbell Squat': { category: 'Legs', image: 'https://loremflickr.com/320/220/barbell,squat,gym?lock=4' },
  'Dumbbell Bicep Curl': { category: 'Arms', image: 'https://loremflickr.com/320/220/bicep,curl,gym?lock=5' },
  'Dumbbell Lunge': { category: 'Legs', image: 'https://loremflickr.com/320/220/lunge,dumbbell,gym?lock=6' },
  Deadlift: { category: 'Back & Legs', image: 'https://loremflickr.com/320/220/deadlift,gym?lock=7' },
  'Romanian Deadlift': { category: 'Hamstrings', image: 'https://loremflickr.com/320/220/romanian,deadlift,gym?lock=8' },
  'Overhead Press': { category: 'Shoulders', image: 'https://loremflickr.com/320/220/overhead,press,gym?lock=9' },
  'Cable Row': { category: 'Back', image: 'https://loremflickr.com/320/220/cable,row,gym?lock=10' },
  'Hip Thrust': { category: 'Glutes', image: 'https://loremflickr.com/320/220/hip,thrust,gym?lock=11' },
  'Pull-up': { category: 'Back', image: 'https://loremflickr.com/320/220/pullup,gym?lock=12' },
  'Power Clean': { category: 'Full Body', image: 'https://loremflickr.com/320/220/power,clean,gym?lock=13' },
  'Walking Lunges': { category: 'Legs', image: 'https://loremflickr.com/320/220/walking,lunge,gym?lock=14' },
  'Box Jumps': { category: 'Power', image: 'https://loremflickr.com/320/220/box,jump,gym?lock=15' },
  'Plank Hold': { category: 'Core', image: 'https://loremflickr.com/320/220/plank,gym?lock=16' }
};

const exerciseChartRanges = {
  YEAR: [
    ['Barbell Squat', 30], ['Romanian Deadlift', 26], ['Pull-up', 23], ['Walking Lunges', 20], ['Overhead Press', 18]
  ],
  QUARTER: [
    ['Barbell Bench Press', 24], ['Lat Pulldown', 21], ['Hip Thrust', 19], ['Cable Row', 17], ['Dumbbell Lunge', 15]
  ],
  MONTH: [
    ['Incline Dumbbell Press', 18], ['Dumbbell Bicep Curl', 16], ['Power Clean', 14], ['Box Jumps', 12], ['Plank Hold', 10]
  ]
};

const mockAnalyticsData = {
  holisticMetrics: {
    streakDays: 14,
    totalWorkouts: 48,
    baseRating: '92',
    maxRating: '100'
  },
  monthlyWeeklyAnalytics: {
    avgSetSize: {
      weekly: '10.5 reps',
      monthlyAvg: '9.8 reps',
      trend: '+7%'
    },
    workRestRatio: {
      weekly: '1:2.0',
      monthlyAvg: '1:2.2',
      trend: '+9%',
      workPercent: 33,
      restPercent: 67
    },
    weeklySetCount: {
      current: 18,
      recommended: 16,
      trend: '+12.5%',
      alert: 'Optimal Load'
    },
    avgWorkoutDuration: {
      weekly: '54 MIN',
      monthlyAvg: '58 MIN'
    },
    weeklyMonthlyWorkouts: {
      weeklyCount: 4,
      monthlyAvg: '3.8 / week'
    }
  },
  topExercises: [
    { rank: 1, name: 'Barbell Bench Press', category: 'Chest', totalSets: 24 },
    { rank: 2, name: 'Lat Pulldown', category: 'Back', totalSets: 20 },
    { rank: 3, name: 'Incline Dumbbell Press', category: 'Chest', totalSets: 18 },
    { rank: 4, name: 'Barbell Squat', category: 'Legs', totalSets: 15 },
    { rank: 5, name: 'Dumbbell Bicep Curl', category: 'Arms', totalSets: 12 }
  ],
  targetedMuscles: [
    { name: 'Pectoralis Major', sets: 22, percentage: 32 },
    { name: 'Latissimus Dorsi', sets: 18, percentage: 26 },
    { name: 'Triceps Brachii', sets: 12, percentage: 17 },
    { name: 'Biceps Brachii', sets: 10, percentage: 15 },
    { name: 'Anterior Deltoids', sets: 7, percentage: 10 }
  ]
};

const analyticsVariations = {
  'Marcus Sterling': { streakDays: 14, totalWorkouts: 48, baseRating: '92', avgSet: '10.5 reps', duration: '54 MIN', topExercise: 'Barbell Bench Press' },
  'Elena Rodriguez': { streakDays: 21, totalWorkouts: 56, baseRating: '88', avgSet: '12.2 reps', duration: '48 MIN', topExercise: 'Dumbbell Lunge' },
  'David Chen': { streakDays: 9, totalWorkouts: 41, baseRating: '85', avgSet: '8.7 reps', duration: '61 MIN', topExercise: 'Deadlift' },
  'Sarah Jenkins': { streakDays: 17, totalWorkouts: 52, baseRating: '91', avgSet: '11.4 reps', duration: '46 MIN', topExercise: 'Power Clean' },
  "James O'Connor": { streakDays: 12, totalWorkouts: 39, baseRating: '79', avgSet: '9.3 reps', duration: '57 MIN', topExercise: 'Pull-up' }
};

function TraineeAnalytics({ traineeName = 'Marcus Sterling' }) {
  const [isStreakChartOpen, setIsStreakChartOpen] = useState(false);
  const [streakRange, setStreakRange] = useState('MONTH');
  const [isSetSizeChartOpen, setIsSetSizeChartOpen] = useState(false);
  const [setSizeRange, setSetSizeRange] = useState('MONTH');
  const [isExerciseChartOpen, setIsExerciseChartOpen] = useState(false);
  const [exerciseChartRange, setExerciseChartRange] = useState('MONTH');
  const variation = analyticsVariations[traineeName] || analyticsVariations['Marcus Sterling'];
  const { holisticMetrics, monthlyWeeklyAnalytics, topExercises, targetedMuscles } = {
    ...mockAnalyticsData,
    holisticMetrics: { ...mockAnalyticsData.holisticMetrics, streakDays: variation.streakDays, totalWorkouts: variation.totalWorkouts, baseRating: variation.baseRating },
    monthlyWeeklyAnalytics: { ...mockAnalyticsData.monthlyWeeklyAnalytics, avgSetSize: { ...mockAnalyticsData.monthlyWeeklyAnalytics.avgSetSize, weekly: variation.avgSet }, avgWorkoutDuration: { ...mockAnalyticsData.monthlyWeeklyAnalytics.avgWorkoutDuration, weekly: variation.duration } },
    topExercises: mockAnalyticsData.topExercises.map((exercise, index) => index === 0 ? { ...exercise, name: variation.topExercise } : exercise)
  };
  const exercisesWithImages = topExercises.map((exercise) => ({
    ...exercise,
    ...exerciseCatalog[exercise.name]
  }));
  const exerciseChartData = exerciseChartRanges[exerciseChartRange].map(([name, totalSets], index) => ({
    ...exerciseCatalog[name],
    rank: index + 1,
    name,
    totalSets,
    chartSets: totalSets
  }));
  const ratio = monthlyWeeklyAnalytics.workRestRatio;
  const streakHistory = getStreakHistory(holisticMetrics.streakDays, streakRange);
  const chartWidth = 640;
  const chartHeight = 250;
  const chartMax = Math.max(30, ...streakHistory.map((point) => point.value));
  const chartPoints = streakHistory
    .map((point, index) => {
      const x = (index / (streakHistory.length - 1)) * chartWidth;
      const y = chartHeight - (point.value / chartMax) * chartHeight;
      return `${x},${y}`;
    })
    .join(' ');
  const averageSetSize = Number.parseFloat(monthlyWeeklyAnalytics.avgSetSize.weekly);
  const setSizeHistory = getSetSizeHistory(averageSetSize, setSizeRange);
  const setSizeChartMax = Math.max(14, ...setSizeHistory.map((point) => point.value));

  return (
    <div className="space-y-6 text-left font-sans" dir="ltr">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#181b20] border border-gray-800/80 rounded-2xl p-5 shadow-lg">
          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-2">
            Consistency Streak
          </span>
          <div className="text-3xl font-black text-white font-mono">
            {holisticMetrics.streakDays} <span className="text-xs text-cyan-400">DAYS</span>
          </div>
          <button
            onClick={() => setIsStreakChartOpen(true)}
            className="mt-3 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-[10px] font-mono text-cyan-300 hover:bg-cyan-500/20 transition-colors"
          >
            Click to view chart
          </button>
        </div>

        <div className="bg-[#181b20] border border-gray-800/80 rounded-2xl p-5 shadow-lg">
          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-2">
            Total Workouts
          </span>
          <div className="text-3xl font-black text-white font-mono">
            {holisticMetrics.totalWorkouts}
          </div>
        </div>

      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-[#181b20] border border-gray-800/80 rounded-2xl p-5 shadow-lg">
          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-3">
            Avg Set Size
          </span>
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-2xl font-bold text-white font-mono">{monthlyWeeklyAnalytics.avgSetSize.weekly}</span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              {monthlyWeeklyAnalytics.avgSetSize.trend}
            </span>
          </div>
          <span className="text-xs text-gray-500 font-mono">
            Monthly Avg: {monthlyWeeklyAnalytics.avgSetSize.monthlyAvg}
          </span>
          <button
            onClick={() => setIsSetSizeChartOpen(true)}
            className="mt-3 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-[10px] font-mono text-cyan-300 hover:bg-cyan-500/20 transition-colors"
          >
            Click to view chart
          </button>
        </div>

        <div className="bg-[#181b20] border border-gray-800/80 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
              Work / Rest Ratio
            </span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              {ratio.trend}
            </span>
          </div>
          <div className="text-2xl font-bold text-white font-mono mb-2">{ratio.weekly}</div>
          <span className="text-xs text-gray-500 font-mono block">
            Monthly Avg: {ratio.monthlyAvg}
          </span>
        </div>

        <div className="bg-[#181b20] border border-gray-800/80 rounded-2xl p-5 shadow-lg">
          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-3">
            Weekly Set Count
          </span>
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-2xl font-bold text-white font-mono">{monthlyWeeklyAnalytics.weeklySetCount.current} Sets</span>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              {monthlyWeeklyAnalytics.weeklySetCount.alert}
            </span>
          </div>
          <span className="text-xs text-gray-500 font-mono">
            Trend: {monthlyWeeklyAnalytics.weeklySetCount.trend}
          </span>
        </div>
      </div>

      {/* Target Muscles & Top Exercises */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#181b20] border border-gray-800/80 rounded-2xl p-5 shadow-lg">
          <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider mb-4">
            Targeted Muscles Distribution
          </h4>
          <div className="space-y-3">
            {targetedMuscles.map((muscle, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-300">{muscle.name}</span>
                  <span className="text-cyan-400">{muscle.sets} sets ({muscle.percentage}%)</span>
                </div>
                <div className="w-full bg-[#121418] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-cyan-500 h-full rounded-full shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                    style={{ width: `${muscle.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#181b20] border border-gray-800/80 rounded-2xl p-5 shadow-lg">
          <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider mb-4">
            Top 5 Exercises (By Sets)
          </h4>
          <div className="space-y-2.5">
            {exercisesWithImages.map((exercise) => (
              <div key={exercise.rank} className="p-2.5 bg-[#121418] rounded-xl border border-gray-800/50 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={exercise.image} alt={`${exercise.name} exercise`} className="w-12 h-12 rounded-lg object-cover border border-gray-700" />
                  <span className="w-5 h-5 rounded bg-gray-800 text-cyan-400 font-mono text-[10px] font-bold flex items-center justify-center">
                    #{exercise.rank}
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-gray-200 block">{exercise.name}</span>
                    <span className="text-[10px] font-mono text-gray-500">{exercise.category}</span>
                  </div>
                </div>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  {exercise.totalSets} sets
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setIsExerciseChartOpen(true)}
            className="mt-4 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-[10px] font-mono text-cyan-300 hover:bg-cyan-500/20 transition-colors"
          >
            Click to view chart
          </button>
        </div>
      </div>

      {isStreakChartOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${traineeName} consistency streak history`}
          onClick={() => setIsStreakChartOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-3xl rounded-2xl border border-cyan-500/30 bg-[#12191d] p-5 shadow-[0_0_40px_rgba(34,211,238,0.12)]"
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">Consistency History</p>
                <h3 className="mt-1 text-xl font-bold text-white">{traineeName}</h3>
              </div>
              <button
                onClick={() => setIsStreakChartOpen(false)}
                aria-label="Close consistency chart"
                className="w-8 h-8 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-cyan-400"
              >
                ×
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {Object.keys(streakRanges).map((range) => (
                <button
                  key={range}
                  onClick={() => setStreakRange(range)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono transition-colors ${streakRange === range
                    ? 'bg-cyan-300 text-[#071014]'
                    : 'border border-gray-700 bg-[#181b20] text-gray-400 hover:border-cyan-500/50 hover:text-cyan-300'
                    }`}
                >
                  {range}
                </button>
              ))}
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-800 bg-[#0d1215] p-3">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight + 36}`} className="min-w-[560px] w-full h-64" role="img" aria-label={`${streakRange.toLowerCase()} consistency chart`}>
                {[0, Math.round(chartMax / 2), chartMax].map((value) => {
                  const y = chartHeight - (value / chartMax) * chartHeight;
                  return (
                    <g key={value}>
                      <line x1="0" y1={y} x2={chartWidth} y2={y} stroke="#27343b" strokeDasharray="4 6" />
                      <text x="0" y={Math.max(12, y - 5)} fill="#718096" fontSize="11" fontFamily="monospace">{value}</text>
                    </g>
                  );
                })}
                <polyline points={chartPoints} fill="none" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                {streakHistory.map((point, index) => {
                  const x = (index / (streakHistory.length - 1)) * chartWidth;
                  const y = chartHeight - (point.value / chartMax) * chartHeight;
                  return (
                    <g key={point.label}>
                      <circle cx={x} cy={y} r="6" fill="#12191d" stroke="#67e8f9" strokeWidth="3" />
                      <text x={x} y={chartHeight + 25} textAnchor="middle" fill="#718096" fontSize="11" fontFamily="monospace">{point.label}</text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <div className="flex items-center justify-between mt-4 text-[10px] font-mono text-gray-500">
              <span>Streak scale: 0 - {chartMax} days</span>
              <span className="text-cyan-300">Current: {holisticMetrics.streakDays} days</span>
            </div>
          </div>
        </div>
      )}

      {isSetSizeChartOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${traineeName} set size history`}
          onClick={() => setIsSetSizeChartOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-3xl rounded-2xl border border-cyan-500/30 bg-[#12191d] p-5 shadow-[0_0_40px_rgba(34,211,238,0.12)]"
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">Set Size History</p>
                <h3 className="mt-1 text-xl font-bold text-white">{traineeName}</h3>
              </div>
              <button
                onClick={() => setIsSetSizeChartOpen(false)}
                aria-label="Close set size chart"
                className="w-8 h-8 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-cyan-400"
              >
                ×
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {Object.keys(setSizeRanges).map((range) => (
                <button
                  key={range}
                  onClick={() => setSetSizeRange(range)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono transition-colors ${setSizeRange === range
                    ? 'bg-cyan-300 text-[#071014]'
                    : 'border border-gray-700 bg-[#181b20] text-gray-400 hover:border-cyan-500/50 hover:text-cyan-300'
                    }`}
                >
                  {range}
                </button>
              ))}
            </div>

            <div className="h-72 rounded-xl border border-gray-800 bg-[#0d1215] p-5">
              <div className="h-full flex items-end gap-3 sm:gap-5 border-b border-gray-700 px-2">
                {setSizeHistory.map((point) => (
                  <div key={point.label} className="h-full flex-1 flex flex-col items-center justify-end gap-2 min-w-0">
                    <div
                      className="w-full max-w-16 min-h-9 rounded-t-lg border border-cyan-300/50 bg-cyan-400/80 flex items-center justify-center text-[10px] sm:text-xs font-bold font-mono text-[#071014] shadow-[0_0_18px_rgba(34,211,238,0.2)]"
                      style={{ height: `${Math.max(12, (point.value / setSizeChartMax) * 100)}%` }}
                    >
                      {point.value} reps
                    </div>
                    <span className="text-[10px] font-mono text-gray-500">{point.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 text-[10px] font-mono text-gray-500">
              <span>Average set size</span>
              <span className="text-cyan-300">Current: {monthlyWeeklyAnalytics.avgSetSize.weekly}</span>
            </div>
          </div>
        </div>
      )}

      {isExerciseChartOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${traineeName} top exercises chart`}
          onClick={() => setIsExerciseChartOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-3xl rounded-2xl border border-cyan-500/30 bg-[#12191d] p-5 shadow-[0_0_40px_rgba(34,211,238,0.12)]"
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">Exercise Volume</p>
                <h3 className="mt-1 text-xl font-bold text-white">Top 5 Exercises by Sets</h3>
              </div>
              <button
                onClick={() => setIsExerciseChartOpen(false)}
                aria-label="Close exercise chart"
                className="w-8 h-8 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-cyan-400"
              >
                ×
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {Object.keys(exerciseChartRanges).map((range) => (
                <button
                  key={range}
                  onClick={() => setExerciseChartRange(range)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono transition-colors ${exerciseChartRange === range
                    ? 'bg-cyan-300 text-[#071014]'
                    : 'border border-gray-700 bg-[#181b20] text-gray-400 hover:border-cyan-500/50 hover:text-cyan-300'
                    }`}
                >
                  {range}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 rounded-xl border border-gray-800 bg-[#0d1215] p-3">
              {exerciseChartData.map((exercise) => (
                <div key={exercise.rank} className="overflow-hidden rounded-xl border border-gray-800/80 bg-[#181b20]">
                  <img
                    src={exercise.image}
                    alt={`${exercise.name} exercise`}
                    className="h-28 w-full object-cover"
                  />
                  <div className="p-3">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="w-5 h-5 shrink-0 rounded bg-gray-800 text-cyan-400 font-mono text-[10px] font-bold flex items-center justify-center">
                        #{exercise.rank}
                      </span>
                      <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-1 rounded">
                        {exercise.chartSets} sets
                      </span>
                    </div>
                    <p className="text-xs font-semibold leading-tight text-white">{exercise.name}</p>
                    <p className="mt-1 text-[10px] font-mono text-gray-500">{exercise.category}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4 text-[10px] font-mono text-gray-500">
              <span>Top 5 exercises for selected period</span>
              <span className="text-cyan-300">{exerciseChartRange}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TraineeAnalytics;