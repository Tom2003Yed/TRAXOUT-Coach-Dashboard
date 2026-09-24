import React, { useState } from 'react';
import MuscleBodyDiagram from '../dashboard/MuscleBodyDiagram';

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

  const labels = streakRanges[range];
  const values = labels.map((label, index) => Math.max(1, streakDays + patterns[range][index]));
  const lastValue = values[values.length - 1];

  return labels.map((label, index) => ({
    label,
    value: values[index],
    workouts: Math.max(1, Math.round(values[index] / 2) + index),
    isToday: index === labels.length - 1,
    isReset: index > 0 && values[index] < values[index - 1] && values[index] <= lastValue
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

const weeklySetRanges = {
  YEAR: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  MONTH: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
};

const getWeeklySetHistory = (current, range) => {
  const patterns = range === 'YEAR'
    ? [-3, 2, -1, 4, 1, -2, 3, 0, 2, -1, 1, 0]
    : [-2, 1, -1, 3];

  return weeklySetRanges[range].map((label, index) => ({
    label,
    value: Math.max(1, current + patterns[index]),
    recommended: Math.max(1, current - 2)
  }));
};

const exerciseCatalog = {
  'Barbell Bench Press': { category: 'Chest', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80' },
  'Lat Pulldown': { category: 'Back', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80' },
  'Incline Dumbbell Press': { category: 'Chest', image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=900&q=80' },
  'Barbell Squat': { category: 'Legs', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80' },
  'Dumbbell Bicep Curl': { category: 'Arms', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80' },
  'Dumbbell Lunge': { category: 'Legs', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80' },
  Deadlift: { category: 'Back & Legs', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80' },
  'Romanian Deadlift': { category: 'Hamstrings', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80' },
  'Overhead Press': { category: 'Shoulders', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80' },
  'Cable Row': { category: 'Back', image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=900&q=80' },
  'Hip Thrust': { category: 'Glutes', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80' },
  'Pull-up': { category: 'Back', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80' },
  'Power Clean': { category: 'Full Body', image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=900&q=80' },
  'Walking Lunges': { category: 'Legs', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80' },
  'Box Jumps': { category: 'Power', image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=900&q=80' },
  'Plank Hold': { category: 'Core', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80' }
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

const muscleColorMap = {
  'Pectoralis Major': '#69cbd5',
  'Latissimus Dorsi': '#70b9dc',
  'Anterior Deltoids': '#9da3e2',
  'Triceps Brachii': '#b99cdd',
  'Biceps Brachii': '#e2b66b',
  Quadriceps: '#72c6b3',
  'Gluteus Maximus': '#dc91a4',
  Hamstrings: '#e0a0ad',
  Calves: '#a7ca7d',
  Core: '#dfc76c',
  Trapezius: '#72c1cb',
  Rhomboids: '#7db4d2',
  'Erector Spinae': '#969ddd',
  'Rear Deltoids': '#b895d2'
};

const getMuscleColor = (muscleName) => muscleColorMap[muscleName] || '#94a3b8';

const muscleFilterLabels = {
  YEAR: 'Year',
  QUARTER: 'Quarter',
  MONTH: 'Month',
  WEEK: 'Week'
};

const muscleFilterData = {
  YEAR: [
    { name: 'Pectoralis Major', sets: 22, percentage: 22 },
    { name: 'Latissimus Dorsi', sets: 18, percentage: 18 },
    { name: 'Anterior Deltoids', sets: 14, percentage: 14 },
    { name: 'Triceps Brachii', sets: 12, percentage: 12 },
    { name: 'Biceps Brachii', sets: 10, percentage: 10 },
    { name: 'Core', sets: 9, percentage: 9 },
    { name: 'Quadriceps', sets: 8, percentage: 8 },
    { name: 'Gluteus Maximus', sets: 7, percentage: 7 }
  ],
  QUARTER: [
    { name: 'Quadriceps', sets: 24, percentage: 24 },
    { name: 'Gluteus Maximus', sets: 20, percentage: 20 },
    { name: 'Hamstrings', sets: 17, percentage: 17 },
    { name: 'Calves', sets: 12, percentage: 12 },
    { name: 'Core', sets: 10, percentage: 10 },
    { name: 'Erector Spinae', sets: 9, percentage: 9 },
    { name: 'Anterior Deltoids', sets: 8, percentage: 8 }
  ],
  MONTH: [
    { name: 'Pectoralis Major', sets: 31, percentage: 31 },
    { name: 'Latissimus Dorsi', sets: 24, percentage: 24 },
    { name: 'Triceps Brachii', sets: 14, percentage: 14 },
    { name: 'Biceps Brachii', sets: 12, percentage: 12 },
    { name: 'Anterior Deltoids', sets: 11, percentage: 11 },
    { name: 'Core', sets: 8, percentage: 8 }
  ],
  WEEK: [
    { name: 'Trapezius', sets: 18, percentage: 18 },
    { name: 'Rhomboids', sets: 15, percentage: 15 },
    { name: 'Erector Spinae', sets: 12, percentage: 12 },
    { name: 'Rear Deltoids', sets: 11, percentage: 11 },
    { name: 'Core', sets: 10, percentage: 10 },
    { name: 'Calves', sets: 9, percentage: 9 },
    { name: 'Hamstrings', sets: 8, percentage: 8 },
    { name: 'Gluteus Maximus', sets: 7, percentage: 7 },
    { name: 'Quadriceps', sets: 6, percentage: 6 },
    { name: 'Biceps Brachii', sets: 4, percentage: 4 }
  ]
};

const musclePools = Object.fromEntries(
  Object.entries(muscleFilterData).map(([range, muscles]) => [
    range,
    [...new Set(muscles.map((muscle) => muscle.name).concat(
      'Pectoralis Major', 'Latissimus Dorsi', 'Anterior Deltoids', 'Triceps Brachii',
      'Biceps Brachii', 'Quadriceps', 'Gluteus Maximus', 'Hamstrings', 'Calves',
      'Core', 'Trapezius', 'Rhomboids', 'Erector Spinae', 'Rear Deltoids'
    ))]
  ])
);

const getNameSeed = (name) => [...name].reduce((seed, character, index) => (
  (seed * 31 + character.charCodeAt(0) + index) % 1000003
), 17);

const workRestRanges = {
  YEAR: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  MONTH: ['Week 1', 'Week 2', 'Week 3', 'Week 4']
};

const workRestFilterLabels = {
  YEAR: 'Year',
  MONTH: 'Month'
};

const getWorkRestData = (traineeName, range) => {
  const seed = getNameSeed(traineeName || 'Marcus Sterling') + range.length * 29;

  return workRestRanges[range].map((label, index) => {
    const workPercent = 22 + ((seed + index * 17) % 35);
    return { label, workPercent, restPercent: 100 - workPercent };
  });
};

function ChartTooltip({ visible, left, top, fixed = false, children }) {
  if (!visible) return null;

  return (
    <div
      className={`pointer-events-none ${fixed ? 'fixed' : 'absolute'} z-50 w-max max-w-[220px] -translate-x-1/2 -translate-y-full rounded-lg border border-cyan-400/40 bg-[#0b1114]/95 px-3 py-2 text-[10px] font-mono text-gray-200 shadow-[0_8px_24px_rgba(0,0,0,0.35)]`}
      style={{ left, top }}
      role="status"
    >
      {children}
    </div>
  );
}

const getTraineeMuscleData = (traineeName) => {
  const nameSeed = getNameSeed(traineeName || 'Marcus Sterling');

  return Object.fromEntries(Object.entries(muscleFilterLabels).map(([range], rangeIndex) => {
    const pool = musclePools[range];
    const rangeSeed = nameSeed + rangeIndex * 137;
    const muscleCount = 5 + (rangeSeed % 6);
    const selectedNames = [];
    let candidateIndex = rangeSeed % pool.length;

    while (selectedNames.length < muscleCount) {
      const candidate = pool[candidateIndex % pool.length];
      if (!selectedNames.includes(candidate)) selectedNames.push(candidate);
      candidateIndex += 1;
    }

    const weights = selectedNames.map((_, index) => 8 + ((rangeSeed + index * 19) % 38));
    const weightTotal = weights.reduce((total, weight) => total + weight, 0);
    const percentages = weights.map((weight) => Math.floor((weight / weightTotal) * 100));
    let remainder = 100 - percentages.reduce((total, percentage) => total + percentage, 0);
    let remainderIndex = 0;

    while (remainder > 0) {
      percentages[remainderIndex % percentages.length] += 1;
      remainderIndex += 1;
      remainder -= 1;
    }

    return [range, selectedNames.map((name, index) => ({
      name,
      percentage: percentages[index],
      sets: Math.max(1, Math.round(percentages[index] * 0.9))
    }))];
  }));
};

function WorkRestRatioCard({ traineeName }) {
  const [workRestRange, setWorkRestRange] = useState('MONTH');
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [isChartOpen, setIsChartOpen] = useState(false);
  const workRestData = getWorkRestData(traineeName, workRestRange);
  const averageWork = Math.round(workRestData.reduce((total, point) => total + point.workPercent, 0) / workRestData.length);
  const averageRest = 100 - averageWork;

  return (
    <>
    <div className="bg-[#181b20] border border-gray-800/80 rounded-2xl p-5 shadow-lg">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">Work / Rest Ratio</span>
            <p className="mt-1 text-[10px] font-mono text-gray-500">Current filter: <span className="text-cyan-300">{workRestFilterLabels[workRestRange]}</span></p>
          </div>
          <span className="rounded border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[10px] font-mono text-emerald-400">{averageWork}% work</span>
        </div>

        <div className="flex items-center gap-4 text-[10px] font-mono">
          <span className="flex items-center gap-2 text-red-300"><span className="h-2.5 w-2.5 rounded-sm bg-red-400" />Work</span>
          <span className="flex items-center gap-2 text-blue-300"><span className="h-2.5 w-2.5 rounded-sm bg-blue-400" />Rest</span>
          <span className="ml-auto text-gray-500">Average: <span className="text-blue-300">{averageRest}% rest</span></span>
        </div>

        <div className="flex h-9 overflow-hidden rounded-lg border border-gray-700/80 bg-blue-400/80" title={`${averageWork}% Work / ${averageRest}% Rest`}>
          <div className="flex items-center justify-center bg-red-400/90 text-xs font-bold text-red-950" style={{ width: `${averageWork}%` }}>{averageWork}%</div>
          <div className="flex flex-1 items-center justify-center text-xs font-bold text-blue-950">{averageRest}%</div>
        </div>

        <button onClick={() => setIsChartOpen(true)} className="w-full rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-[10px] font-mono text-cyan-300 transition-colors hover:bg-cyan-500/20">Click to view work / rest history</button>
      </div>
    </div>
    {isChartOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={`${traineeName} work rest history`} onClick={() => setIsChartOpen(false)}>
        <div className="flex max-h-[calc(100vh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-cyan-500/30 bg-[#12191d] p-5 shadow-[0_0_40px_rgba(34,211,238,0.12)]" onClick={(event) => event.stopPropagation()}>
          <div className="mb-5 flex items-start justify-between gap-4">
            <div><p className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">Work / Rest History</p><h3 className="mt-1 text-xl font-bold text-white">{traineeName}</h3></div>
            <button onClick={() => setIsChartOpen(false)} aria-label="Close work rest chart" className="h-8 w-8 rounded-lg border border-gray-700 text-gray-400 hover:border-cyan-400 hover:text-white">×</button>
          </div>
          <div className="mb-5 grid grid-cols-2 gap-2">
            {Object.entries(workRestFilterLabels).map(([range, label]) => <button key={range} onClick={() => { setWorkRestRange(range); setHoveredPoint(null); }} className={`rounded-lg px-3 py-2 text-[10px] font-mono ${workRestRange === range ? 'bg-cyan-300 text-[#071014]' : 'border border-gray-700 bg-[#181b20] text-gray-400 hover:border-cyan-500/50 hover:text-cyan-300'}`}>{label} ({workRestRanges[range].length} {range === 'YEAR' ? 'months' : 'weeks'})</button>)}
          </div>
          <div className="mb-4 flex flex-wrap gap-4 text-[10px] font-mono"><span className="flex items-center gap-2 text-red-300"><span className="h-2.5 w-2.5 rounded-sm bg-red-400" />Work</span><span className="flex items-center gap-2 text-blue-300"><span className="h-2.5 w-2.5 rounded-sm bg-blue-400" />Rest</span><span className="ml-auto text-gray-500">Average work: <span className="text-red-300">{averageWork}%</span></span></div>
          <div className="min-h-0 max-h-[calc(100vh-12rem)] space-y-3 overflow-y-auto rounded-xl border border-gray-800 bg-[#0d1215] p-4">
            {workRestData.map((point) => <div key={point.label} className="grid grid-cols-[72px_minmax(0,1fr)] items-center gap-3 text-[10px] font-mono"><span className="text-gray-500">{point.label}</span><div className="relative flex h-9 overflow-visible rounded-md border border-gray-700/80 bg-blue-400/80" onMouseMove={(event) => setHoveredPoint({ ...point, x: event.clientX, y: event.clientY })} onMouseLeave={() => setHoveredPoint(null)}><ChartTooltip visible={hoveredPoint?.label === point.label} fixed left={hoveredPoint?.x ?? 0} top={(hoveredPoint?.y ?? 0) - 12}><div className="font-bold text-white">{point.label}</div><div className="mt-1 text-red-300">Work: {point.workPercent}%</div><div className="text-blue-300">Rest: {point.restPercent}%</div></ChartTooltip><div className="flex items-center justify-center bg-red-400/90 font-bold text-red-950" style={{ width: `${point.workPercent}%` }}>{point.workPercent}%</div><div className="flex flex-1 items-center justify-center font-bold text-blue-950">{point.restPercent}%</div></div></div>)}
          </div>
        </div>
      </div>
    )}
    </>
  );
}

const polarToCartesian = (center, radius, angle) => {
  const angleInRadians = ((angle - 90) * Math.PI) / 180;
  return {
    x: center + radius * Math.cos(angleInRadians),
    y: center + radius * Math.sin(angleInRadians)
  };
};

const describePieSlice = (startAngle, endAngle) => {
  const start = polarToCartesian(100, 82, endAngle);
  const end = polarToCartesian(100, 82, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return `M 100 100 L ${start.x} ${start.y} A 82 82 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
};

function MuscleDistribution({ traineeName }) {
  const [activeMuscle, setActiveMuscle] = useState(null);
  const [muscleRange, setMuscleRange] = useState('MONTH');
  const traineeMuscleData = getTraineeMuscleData(traineeName);
  const filteredMuscles = traineeMuscleData[muscleRange];
  let startAngle = 0;

  return (
    <div className="space-y-5">
      <div className="grid min-h-[74px] grid-cols-1 items-center gap-3 rounded-xl border border-gray-800/80 bg-[#121418] p-3 sm:grid-cols-[minmax(0,1fr)_minmax(250px,1.4fr)]">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">Muscle Filters</p>
          <p className="mt-1 text-xs font-mono text-gray-400">Current filter: <span className="text-cyan-300">{muscleFilterLabels[muscleRange]}</span></p>
        </div>
        <div className="grid grid-cols-4 gap-2" aria-label="Targeted muscle time filters">
          {Object.entries(muscleFilterLabels).map(([range, label]) => (
            <button
              key={range}
              onClick={() => {
                setMuscleRange(range);
                setActiveMuscle(null);
              }}
              className={`min-h-[34px] rounded-lg px-2 py-1.5 text-[10px] font-mono transition-colors ${muscleRange === range
                ? 'bg-cyan-300 text-[#071014]'
                : 'border border-gray-700 bg-[#181b20] text-gray-400 hover:border-cyan-500/50 hover:text-cyan-300'
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-center">
        <div className="relative h-56 w-56 shrink-0">
          <ChartTooltip visible={activeMuscle !== null} left="50%" top="12px">
            {(() => {
              const muscle = filteredMuscles.find((item) => item.name === activeMuscle);
              return muscle && <><div className="font-bold text-white">{muscle.name}</div><div className="mt-1 text-cyan-300">{muscle.percentage}% - {muscle.sets} sets</div></>;
            })()}
          </ChartTooltip>
          <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible" role="img" aria-label="Targeted muscles distribution pie chart">
            {filteredMuscles.map((muscle, index) => {
              const endAngle = startAngle + (muscle.percentage / 100) * 360;
              const path = describePieSlice(startAngle, endAngle);
              startAngle = endAngle;
              const isSelected = activeMuscle === muscle.name;
              return (
                <path
                  key={muscle.name}
                  d={path}
                  fill={getMuscleColor(muscle.name)}
                  className="cursor-pointer stroke-[#181b20] stroke-2 transition-opacity"
                  opacity={activeMuscle && !isSelected ? 0.35 : 1}
                  onMouseEnter={() => setActiveMuscle(muscle.name)}
                  onMouseLeave={() => setActiveMuscle(null)}
                  onFocus={() => setActiveMuscle(muscle.name)}
                  onBlur={() => setActiveMuscle(null)}
                  tabIndex="0"
                  aria-label={`${muscle.name}: ${muscle.percentage}%`}
                />
              );
            })}
          </svg>
        </div>
        <div className="h-[320px] w-full max-w-xs space-y-2 overflow-y-auto pr-1">
          {filteredMuscles.map((muscle, index) => (
            <div
              key={muscle.name}
              className={`flex h-8 items-center justify-between gap-2 overflow-hidden rounded-lg px-2 py-1.5 text-xs font-mono transition-colors ${activeMuscle === muscle.name ? 'bg-cyan-500/10 text-white' : 'text-gray-400'}`}
              onMouseEnter={() => setActiveMuscle(muscle.name)}
              onMouseLeave={() => setActiveMuscle(null)}
            >
              <span className="flex min-w-0 items-center gap-2"><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: getMuscleColor(muscle.name) }} /><span className="truncate" title={muscle.name}>{muscle.name}</span></span>
              <span className="text-cyan-400">{muscle.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 border-t border-gray-800/80 pt-4">
        {['front', 'back'].map((view) => (
          <div key={view} className="rounded-xl border border-gray-800 bg-[#121418] p-2">
            <div className="mb-1 text-center text-[10px] font-mono uppercase tracking-widest text-gray-500">{view} view</div>
            <MuscleBodyDiagram
              view={view}
              activeMuscle={activeMuscle}
              onMuscleEnter={setActiveMuscle}
              onMuscleLeave={() => setActiveMuscle(null)}
              className="h-80 w-full"
            />
          </div>
        ))}
      </div>
      <p className="text-center text-[10px] font-mono text-gray-500">Hover over a slice or muscle to highlight it on both body views.</p>
    </div>
  );
}

function TraineeAnalytics({ traineeName = 'Marcus Sterling', points = 0 }) {
  const [isStreakChartOpen, setIsStreakChartOpen] = useState(false);
  const [streakRange, setStreakRange] = useState('MONTH');
  const [isSetSizeChartOpen, setIsSetSizeChartOpen] = useState(false);
  const [setSizeRange, setSetSizeRange] = useState('MONTH');
  const [isWeeklySetChartOpen, setIsWeeklySetChartOpen] = useState(false);
  const [weeklySetRange, setWeeklySetRange] = useState('MONTH');
  const [hoveredWeeklySet, setHoveredWeeklySet] = useState(null);
  const [isExerciseChartOpen, setIsExerciseChartOpen] = useState(false);
  const [exerciseChartRange, setExerciseChartRange] = useState('MONTH');
  const [hoveredStreakIndex, setHoveredStreakIndex] = useState(null);
  const [hoveredSetSize, setHoveredSetSize] = useState(null);
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
  const chartAreaPoints = `0,${chartHeight} ${chartPoints} ${chartWidth},${chartHeight}`;
  const streakRangeLabels = {
    YEAR: 'Monthly streak progression',
    QUARTER: 'Weekly streak progression',
    MONTH: 'Daily streak progression',
    WEEK: 'Daily streak progression'
  };
  const averageSetSize = Number.parseFloat(monthlyWeeklyAnalytics.avgSetSize.weekly);
  const setSizeHistory = getSetSizeHistory(averageSetSize, setSizeRange);
  const setSizeChartMax = Math.max(14, ...setSizeHistory.map((point) => point.value));
  const weeklySetHistory = getWeeklySetHistory(monthlyWeeklyAnalytics.weeklySetCount.current, weeklySetRange);
  const weeklySetChartMax = Math.max(monthlyWeeklyAnalytics.weeklySetCount.recommended, ...weeklySetHistory.map((point) => point.value));

  return (
    <div className="space-y-6 text-left font-sans" dir="ltr">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

        <div className="bg-[#181b20] border border-emerald-500/20 rounded-2xl p-5 shadow-lg">
          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-2">
            Training Points
          </span>
          <div className="text-3xl font-black text-emerald-300 font-mono">
            {points.toLocaleString()}
          </div>
          <span className="mt-2 block text-[10px] font-mono text-gray-500">Unlimited cumulative reward</span>
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

        <WorkRestRatioCard traineeName={traineeName} />

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
          <button
            onClick={() => setIsWeeklySetChartOpen(true)}
            className="mt-3 w-full rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-[10px] font-mono text-cyan-300 transition-colors hover:bg-cyan-500/20"
          >
            Click to view set history
          </button>
        </div>
      </div>

      {/* Target Muscles & Top Exercises */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#181b20] border border-gray-800/80 rounded-2xl p-5 shadow-lg">
          <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider mb-4">
            Targeted Muscles Distribution
          </h4>
          <MuscleDistribution traineeName={traineeName} />
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

            <div className="overflow-x-hidden rounded-xl border border-gray-800 bg-[#0d1215] p-3">
              <div className="relative w-full">
                {hoveredStreakIndex !== null && (() => {
                  const point = streakHistory[hoveredStreakIndex];
                  const left = `${(hoveredStreakIndex / (streakHistory.length - 1)) * 100}%`;
                  const top = `${((chartHeight - (point.value / chartMax) * chartHeight) / (chartHeight + 42)) * 100}%`;
                  return (
                    <ChartTooltip visible left={`clamp(96px, ${left}, calc(100% - 96px))`} top={top}>
                      <div className="flex items-center justify-between gap-5"><span className="font-bold text-white">{point.isToday ? 'Today' : point.label}</span><span className="text-gray-500">{point.label}</span></div>
                      <div className="mt-1 text-lg font-black text-white">{point.value} days</div>
                      <div className="mt-1 text-cyan-300">{point.workouts} workouts</div>
                    </ChartTooltip>
                  );
                })()}
                <div className="mb-2 flex items-center justify-between px-1 font-mono text-[10px] uppercase tracking-widest text-gray-500">
                  <span>Streak (days)</span>
                  <span className="text-cyan-300">{streakRangeLabels[streakRange]}</span>
                </div>
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight + 42}`}
                  className="h-72 w-full"
                  role="img"
                  aria-label={`${streakRange.toLowerCase()} consistency chart`}
                  onMouseMove={(event) => {
                    const bounds = event.currentTarget.getBoundingClientRect();
                    const ratio = (event.clientX - bounds.left) / bounds.width;
                    const index = Math.round(ratio * (streakHistory.length - 1));
                    setHoveredStreakIndex(Math.max(0, Math.min(streakHistory.length - 1, index)));
                  }}
                  onMouseLeave={() => setHoveredStreakIndex(null)}
                >
                <defs>
                  <linearGradient id="streakAreaGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.46" />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.04" />
                  </linearGradient>
                  <filter id="streakGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                {[0, Math.round(chartMax / 2), chartMax].map((value) => {
                  const y = chartHeight - (value / chartMax) * chartHeight;
                  return (
                    <g key={value}>
                      <line x1="0" y1={y} x2={chartWidth} y2={y} stroke="#27343b" strokeDasharray="4 6" />
                      <text x="0" y={Math.max(12, y - 5)} fill="#718096" fontSize="11" fontFamily="monospace">{value}</text>
                    </g>
                  );
                })}
                {streakHistory.map((point, index) => {
                  if (!point.isReset) return null;
                  const x = (index / (streakHistory.length - 1)) * chartWidth;
                  return <line key={`reset-${point.label}`} x1={x} y1="0" x2={x} y2={chartHeight + 2} stroke="#3b5262" strokeDasharray="5 7" strokeWidth="1.5" />;
                })}
                <polygon points={chartAreaPoints} fill="url(#streakAreaGradient)" />
                <polyline points={chartPoints} fill="none" stroke="#38d5f5" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#streakGlow)" />
                {streakHistory.map((point, index) => {
                  const x = (index / (streakHistory.length - 1)) * chartWidth;
                  const y = chartHeight - (point.value / chartMax) * chartHeight;
                  return (
                    <g key={point.label}>
                      {point.isToday && <line x1={x} y1={y - 8} x2={x} y2={chartHeight + 2} stroke="#38d5f5" strokeDasharray="4 5" opacity="0.75" />}
                      <circle cx={x} cy={y} r={point.isToday ? 8 : hoveredStreakIndex === index ? 8 : 5} fill={point.isToday ? '#f8fafc' : '#0d1820'} stroke="#38d5f5" strokeWidth={point.isToday ? 4 : 2.5} filter={point.isToday ? 'url(#streakGlow)' : undefined} />
                      {point.isToday && <circle cx={x} cy={y} r="13" fill="none" stroke="#38d5f5" strokeOpacity="0.25" strokeWidth="3" />}
                      <text x={x} y={chartHeight + 25} textAnchor="middle" fill={point.isToday ? '#e2e8f0' : '#718096'} fontSize="11" fontWeight={point.isToday ? '700' : '400'} fontFamily="monospace">{point.label}</text>
                    </g>
                  );
                })}
                </svg>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 text-[10px] font-mono text-gray-500">
              <span>Streak scale: 0 - {chartMax} days</span>
              <span className="text-cyan-300">Current: {holisticMetrics.streakDays} days</span>
            </div>
          </div>
        </div>
      )}

      {isWeeklySetChartOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${traineeName} weekly set count history`}
          onClick={() => setIsWeeklySetChartOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="flex max-h-[calc(100vh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-cyan-500/30 bg-[#12191d] p-5 shadow-[0_0_40px_rgba(34,211,238,0.12)]"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">Weekly Set Count History</p>
                <h3 className="mt-1 text-xl font-bold text-white">{traineeName}</h3>
              </div>
              <button onClick={() => setIsWeeklySetChartOpen(false)} aria-label="Close weekly set chart" className="h-8 w-8 rounded-lg border border-gray-700 text-gray-400 hover:border-cyan-400 hover:text-white">×</button>
            </div>

            <div className="mb-5 grid grid-cols-2 gap-2">
              {Object.entries({ YEAR: 'Year', MONTH: 'Month' }).map(([range, label]) => (
                <button key={range} onClick={() => { setWeeklySetRange(range); setHoveredWeeklySet(null); }} className={`rounded-lg px-3 py-2 text-[10px] font-mono ${weeklySetRange === range ? 'bg-cyan-300 text-[#071014]' : 'border border-gray-700 bg-[#181b20] text-gray-400 hover:border-cyan-500/50 hover:text-cyan-300'}`}>
                  {label} ({weeklySetRanges[range].length} {range === 'YEAR' ? 'months' : 'weeks'})
                </button>
              ))}
            </div>

            <div className="mb-4 flex items-center justify-between text-[10px] font-mono text-gray-500">
              <span>Current: <b className="text-cyan-300">{monthlyWeeklyAnalytics.weeklySetCount.current} sets</b></span>
              <span>Recommended: <b className="text-emerald-300">{monthlyWeeklyAnalytics.weeklySetCount.recommended} sets</b></span>
            </div>

            <div className="min-h-0 overflow-x-auto rounded-xl border border-gray-800 bg-[#0d1215] p-4">
              <div className="flex h-72 min-w-[560px] items-end gap-3 border-b border-gray-700 px-2">
                {weeklySetHistory.map((point) => {
                  const height = Math.max(12, (point.value / weeklySetChartMax) * 100);
                  const recommendedHeight = (point.recommended / weeklySetChartMax) * 100;
                  const isHovered = hoveredWeeklySet?.label === point.label;
                  return (
                    <div key={point.label} className="relative flex h-full flex-1 flex-col items-center justify-end gap-2" onMouseMove={(event) => { const bounds = event.currentTarget.getBoundingClientRect(); setHoveredWeeklySet({ ...point, x: event.clientX - bounds.left }); }} onMouseLeave={() => setHoveredWeeklySet(null)}>
                      <div className="pointer-events-none absolute left-0 right-0 border-t border-dashed border-emerald-400/70" style={{ bottom: `${recommendedHeight}%` }} />
                      <ChartTooltip visible={isHovered} left={hoveredWeeklySet?.x ?? 0} top="-8px"><div className="font-bold text-white">{point.label}</div><div className="mt-1 text-cyan-300">{point.value} sets</div><div className="text-emerald-300">Target: {point.recommended}</div></ChartTooltip>
                      <div className={`relative flex w-full max-w-16 items-center justify-center rounded-t-lg border border-cyan-300/50 bg-cyan-400/80 text-[10px] font-bold font-mono text-[#071014] shadow-[0_0_18px_rgba(34,211,238,0.2)] ${isHovered ? 'ring-2 ring-cyan-200' : ''}`} style={{ height: `${height}%` }}>{point.value}</div>
                      <span className="text-[10px] font-mono text-gray-500">{point.label}</span>
                    </div>
                  );
                })}
              </div>
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
                  <div
                    key={point.label}
                    className="relative h-full flex-1 flex flex-col items-center justify-end gap-2 min-w-0"
                    onMouseMove={(event) => {
                      const bounds = event.currentTarget.getBoundingClientRect();
                      setHoveredSetSize({ ...point, x: event.clientX - bounds.left });
                    }}
                    onMouseLeave={() => setHoveredSetSize(null)}
                  >
                    <div
                      className={`relative w-full max-w-16 min-h-9 rounded-t-lg border border-cyan-300/50 bg-cyan-400/80 flex items-center justify-center text-[10px] sm:text-xs font-bold font-mono text-[#071014] shadow-[0_0_18px_rgba(34,211,238,0.2)] ${hoveredSetSize?.label === point.label ? 'ring-2 ring-cyan-200' : ''}`}
                      style={{ height: `${Math.max(12, (point.value / setSizeChartMax) * 100)}%` }}
                    >
                      <ChartTooltip visible={hoveredSetSize?.label === point.label} left={hoveredSetSize?.x ?? 0} top="-8px">
                        <div className="font-bold text-white">{point.label}</div>
                        <div className="mt-1 text-cyan-300">{point.value} reps</div>
                      </ChartTooltip>
                      {hoveredSetSize?.label === point.label && <span className="pointer-events-none absolute -top-1 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-200 ring-2 ring-cyan-400/40" style={{ left: hoveredSetSize.x }} />}
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