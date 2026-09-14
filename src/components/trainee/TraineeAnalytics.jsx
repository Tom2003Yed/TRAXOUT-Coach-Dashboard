  import React, { useState } from 'react';
  import frontMusclesDiagram from '../../assets/front-muscles-diagram.svg';
  import backMusclesDiagram from '../../assets/back-muscles-diagram.svg';

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
  YEAR: ['2025', '2026 YTD'],
  QUARTER: ['Q1', 'Q2', 'Q3', 'Q4'],
  MONTH: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  WEEK: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
  DAY: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
};

const workRestFilterLabels = {
  YEAR: 'Year',
  QUARTER: 'Quarter',
  MONTH: 'Month',
  WEEK: 'Week',
  DAY: 'Day'
};

const getWorkRestData = (traineeName, range) => {
  const seed = getNameSeed(traineeName || 'Marcus Sterling') + range.length * 29;

  return workRestRanges[range].map((label, index) => {
    const workPercent = 22 + ((seed + index * 17) % 35);
    return { label, workPercent, restPercent: 100 - workPercent };
  });
};

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
  const workRestData = getWorkRestData(traineeName, workRestRange);
  const averageWork = Math.round(workRestData.reduce((total, point) => total + point.workPercent, 0) / workRestData.length);
  const averageRest = 100 - averageWork;

  return (
    <div className="bg-[#181b20] border border-gray-800/80 rounded-2xl p-5 shadow-lg">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">Work / Rest Ratio</span>
            <p className="mt-1 text-[10px] font-mono text-gray-500">Current filter: <span className="text-cyan-300">{workRestFilterLabels[workRestRange]}</span></p>
          </div>
          <span className="rounded border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[10px] font-mono text-emerald-400">{averageWork}% work</span>
        </div>

        <div className="grid grid-cols-5 gap-1.5" aria-label="Work and rest filters">
          {Object.entries(workRestFilterLabels).map(([range, label]) => (
            <button
              key={range}
              onClick={() => setWorkRestRange(range)}
              className={`min-h-[30px] rounded-md px-1.5 py-1 text-[9px] font-mono transition-colors ${workRestRange === range
                ? 'bg-cyan-300 text-[#071014]'
                : 'border border-gray-700 bg-[#121418] text-gray-400 hover:border-cyan-500/50 hover:text-cyan-300'
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 text-[10px] font-mono">
          <span className="flex items-center gap-2 text-red-300"><span className="h-2.5 w-2.5 rounded-sm bg-red-400" />Work</span>
          <span className="flex items-center gap-2 text-blue-300"><span className="h-2.5 w-2.5 rounded-sm bg-blue-400" />Rest</span>
          <span className="ml-auto text-gray-500">Average: <span className="text-blue-300">{averageRest}% rest</span></span>
        </div>

        <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
          {workRestData.map((point) => (
            <div key={point.label} className="grid grid-cols-[52px_minmax(0,1fr)] items-center gap-2 text-[9px] font-mono">
              <span className="truncate text-gray-500">{point.label}</span>
              <div className="flex h-7 overflow-hidden rounded-md border border-gray-700/80 bg-blue-400/80" title={`${point.workPercent}% Work / ${point.restPercent}% Rest`}>
                <div className="flex min-w-0 items-center justify-center whitespace-nowrap bg-red-400/90 px-1 text-[11px] font-bold text-red-950" style={{ width: `${point.workPercent}%` }}>
                  {point.workPercent}%
                </div>
                <div className="flex min-w-0 flex-1 items-center justify-center whitespace-nowrap bg-blue-400/75 px-1 text-[11px] font-bold text-blue-950">
                  {point.restPercent}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
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

function MuscleBody({ view, activeMuscle }) {
  return (
    <img
      src={view === 'front' ? frontMusclesDiagram : backMusclesDiagram}
      alt={`${view === 'front' ? 'Front' : 'Back'} muscle diagram`}
      className="h-80 w-full object-contain"
    />
  );
}
/*
  const isActive = (muscleNames) => muscleNames.includes(activeMuscle);
  const baseClass = 'fill-[#27343b] stroke-[#52636c] stroke-[1.2] transition-colors';
  const activeClass = 'fill-red-500 stroke-red-200';

  return (
    <svg viewBox="0 0 180 360" className="h-80 w-full" role="img" aria-label={`${view} body muscle map`}>
      <g className="fill-[#1b252a] stroke-[#52636c] stroke-[1.5]">
        <circle cx="90" cy="27" r="18" />
        <path d="M83 43 L97 43 L101 56 L79 56 Z" />
        <path d="M79 55 C71 57 65 64 61 72 L70 119 C73 132 77 142 79 153 L90 169 L101 153 C103 142 107 132 110 119 L119 72 C115 64 109 57 101 55 L96 62 L84 62 Z" />
        <path d="M62 68 C56 69 52 73 50 80 L48 145 C48 151 51 155 55 155 C59 155 61 151 61 146 L65 91 Z" />
        <path d="M118 68 C124 69 128 73 130 80 L132 145 C132 151 129 155 125 155 C121 155 119 151 119 146 L115 91 Z" />
        <path d="M48 145 C46 149 46 155 49 159 L55 160 L58 155 L55 151 Z" />
        <path d="M132 145 C134 149 134 155 131 159 L125 160 L122 155 L125 151 Z" />
        <path d="M79 145 C75 158 71 176 70 195 L64 246 L57 321 C57 326 61 329 67 329 L72 326 L83 253 L90 190 L97 253 L108 326 L113 329 C119 329 123 326 123 321 L116 246 L110 195 C109 176 105 158 101 145 L90 169 Z" />
        <path d="M57 321 L52 329 L71 329 L72 326 Z" />
        <path d="M123 321 L128 329 L109 329 L108 326 Z" />
      </g>

      <g fill="none" className="stroke-[#70818a] stroke-[1] opacity-70">
        <path d="M84 62 L90 70 L96 62" />
        <path d="M90 70 L90 166" />
        <path d="M73 145 C79 151 84 153 90 153 C96 153 101 151 107 145" />
        <path d="M79 169 C83 174 86 176 90 178 C94 176 97 174 101 169" />
        <path d="M70 195 L90 190 L110 195" />
        <path d="M82 253 L90 258 L98 253" />
        <path d="M56 93 L60 108 M124 93 L120 108" />
      </g>

      {view === 'front' ? (
        <g>
          <path className={`${baseClass} ${isActive(['Pectoralis Major']) ? activeClass : ''}`} d="M69 76 C75 68 84 68 89 76 L88 105 C79 108 70 104 64 96 Z" />
          <path className={`${baseClass} ${isActive(['Pectoralis Major']) ? activeClass : ''}`} d="M91 76 C96 68 105 68 111 76 L116 96 C110 104 101 108 92 105 Z" />
          <path className={`${baseClass} ${isActive(['Anterior Deltoids']) ? activeClass : ''}`} d="M58 76 C61 70 65 68 70 72 L68 91 L57 94 L53 86 Z" />
          <path className={`${baseClass} ${isActive(['Anterior Deltoids']) ? activeClass : ''}`} d="M122 76 C119 70 115 68 110 72 L112 91 L123 94 L127 86 Z" />
          <path className={`${baseClass} ${isActive(['Biceps Brachii']) ? activeClass : ''}`} d="M57 91 L68 89 L67 126 L64 145 L55 145 Z" />
          <path className={`${baseClass} ${isActive(['Biceps Brachii']) ? activeClass : ''}`} d="M123 91 L112 89 L113 126 L116 145 L125 145 Z" />
          <path className={`${baseClass} ${isActive(['Triceps Brachii']) ? activeClass : ''}`} d="M53 91 L57 94 L55 145 L53 156 L49 145 Z" />
          <path className={`${baseClass} ${isActive(['Triceps Brachii']) ? activeClass : ''}`} d="M127 91 L123 94 L125 145 L127 156 L131 145 Z" />
          <path className={`${baseClass} ${isActive(['Pectoralis Major']) ? activeClass : ''}`} d="M82 110 L90 106 L98 110 L96 144 L90 151 L84 144 Z" />
          <path className={`${baseClass} ${isActive(['Core']) ? activeClass : ''}`} d="M78 106 L90 110 L102 106 L105 145 L90 169 L75 145 Z" />
          <path className={`${baseClass} ${isActive(['Quadriceps']) ? activeClass : ''}`} d="M72 166 L88 174 L83 253 L70 285 L64 246 Z" />
          <path className={`${baseClass} ${isActive(['Quadriceps']) ? activeClass : ''}`} d="M108 166 L92 174 L97 253 L110 285 L116 246 Z" />
          <path className={`${baseClass} ${isActive(['Calves']) ? activeClass : ''}`} d="M70 258 L83 253 L78 320 L68 326 L60 318 Z" />
          <path className={`${baseClass} ${isActive(['Calves']) ? activeClass : ''}`} d="M110 258 L97 253 L102 320 L112 326 L120 318 Z" />
        </g>
      ) : (
        <g>
          <path className={`${baseClass} ${isActive(['Latissimus Dorsi']) ? activeClass : ''}`} d="M68 76 L88 70 L86 132 L72 151 L64 121 Z" />
          <path className={`${baseClass} ${isActive(['Latissimus Dorsi']) ? activeClass : ''}`} d="M112 76 L92 70 L94 132 L108 151 L116 121 Z" />
          <path className={`${baseClass} ${isActive(['Anterior Deltoids']) ? activeClass : ''}`} d="M58 76 C61 70 65 68 70 72 L68 91 L57 94 L53 86 Z" />
          <path className={`${baseClass} ${isActive(['Anterior Deltoids']) ? activeClass : ''}`} d="M122 76 C119 70 115 68 110 72 L112 91 L123 94 L127 86 Z" />
          <path className={`${baseClass} ${isActive(['Triceps Brachii']) ? activeClass : ''}`} d="M53 91 L57 94 L55 145 L53 156 L49 145 Z" />
          <path className={`${baseClass} ${isActive(['Triceps Brachii']) ? activeClass : ''}`} d="M127 91 L123 94 L125 145 L127 156 L131 145 Z" />
          <path className={`${baseClass} ${isActive(['Latissimus Dorsi']) ? activeClass : ''}`} d="M82 110 L90 104 L98 110 L96 145 L90 153 L84 145 Z" />
          <path className={`${baseClass} ${isActive(['Trapezius']) ? activeClass : ''}`} d="M78 62 L90 70 L102 62 L108 82 L90 103 L72 82 Z" />
          <path className={`${baseClass} ${isActive(['Rhomboids']) ? activeClass : ''}`} d="M84 82 L90 76 L96 82 L94 116 L90 125 L86 116 Z" />
          <path className={`${baseClass} ${isActive(['Erector Spinae']) ? activeClass : ''}`} d="M78 116 L86 122 L86 166 L78 151 Z" />
          <path className={`${baseClass} ${isActive(['Erector Spinae']) ? activeClass : ''}`} d="M102 116 L94 122 L94 166 L102 151 Z" />
          <path className={`${baseClass} ${isActive(['Rear Deltoids']) ? activeClass : ''}`} d="M58 76 L70 72 L68 96 L56 100 L52 88 Z" />
          <path className={`${baseClass} ${isActive(['Rear Deltoids']) ? activeClass : ''}`} d="M122 76 L110 72 L112 96 L124 100 L128 88 Z" />
          <path className={`${baseClass} ${isActive(['Gluteus Maximus']) ? activeClass : ''}`} d="M70 151 L90 160 L110 151 L113 194 L90 207 L67 194 Z" />
          <path className={`${baseClass} ${isActive(['Hamstrings']) ? activeClass : ''}`} d="M68 195 L87 203 L82 263 L69 285 L64 246 Z" />
          <path className={`${baseClass} ${isActive(['Hamstrings']) ? activeClass : ''}`} d="M112 195 L93 203 L98 263 L111 285 L116 246 Z" />
          <path className={`${baseClass} ${isActive(['Calves']) ? activeClass : ''}`} d="M70 258 L83 253 L78 320 L68 326 L60 318 Z" />
          <path className={`${baseClass} ${isActive(['Calves']) ? activeClass : ''}`} d="M110 258 L97 253 L102 320 L112 326 L120 318 Z" />
          <path className={`${baseClass} ${isActive(['Core']) ? activeClass : ''}`} d="M78 151 L90 160 L102 151 L101 190 L90 198 L79 190 Z" />
        </g>
      )}
      <path d="M90 51 L90 174" className="stroke-[#70818a] stroke-[1] opacity-60" />
    </svg>
  );
}
*/

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
            <MuscleBody view={view} activeMuscle={activeMuscle} />
          </div>
        ))}
      </div>
      <p className="text-center text-[10px] font-mono text-gray-500">Hover over a slice or muscle to highlight it on both body views.</p>
    </div>
  );
}

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