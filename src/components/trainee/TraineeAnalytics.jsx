import React from 'react';

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
  const variation = analyticsVariations[traineeName] || analyticsVariations['Marcus Sterling'];
  const { holisticMetrics, monthlyWeeklyAnalytics, topExercises, targetedMuscles } = {
    ...mockAnalyticsData,
    holisticMetrics: { ...mockAnalyticsData.holisticMetrics, streakDays: variation.streakDays, totalWorkouts: variation.totalWorkouts, baseRating: variation.baseRating },
    monthlyWeeklyAnalytics: { ...mockAnalyticsData.monthlyWeeklyAnalytics, avgSetSize: { ...mockAnalyticsData.monthlyWeeklyAnalytics.avgSetSize, weekly: variation.avgSet }, avgWorkoutDuration: { ...mockAnalyticsData.monthlyWeeklyAnalytics.avgWorkoutDuration, weekly: variation.duration } },
    topExercises: mockAnalyticsData.topExercises.map((exercise, index) => index === 0 ? { ...exercise, name: variation.topExercise } : exercise)
  };
  const ratio = monthlyWeeklyAnalytics.workRestRatio;

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
        </div>

        <div className="bg-[#181b20] border border-gray-800/80 rounded-2xl p-5 shadow-lg">
          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-2">
            Total Workouts
          </span>
          <div className="text-3xl font-black text-white font-mono">
            {holisticMetrics.totalWorkouts}
          </div>
        </div>

        <div className="bg-[#181b20] border border-gray-800/80 rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-2">
              Baseline Score
            </span>
            <div className="text-3xl font-black text-white font-mono">
              {holisticMetrics.baseRating} <span className="text-xs text-gray-500">/ 100</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-cyan-400 flex items-center justify-center text-cyan-400 font-mono text-xs font-bold shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            +3
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
            {topExercises.map((exercise) => (
              <div key={exercise.rank} className="p-2.5 bg-[#121418] rounded-xl border border-gray-800/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
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
        </div>
      </div>
    </div>
  );
}

export default TraineeAnalytics;