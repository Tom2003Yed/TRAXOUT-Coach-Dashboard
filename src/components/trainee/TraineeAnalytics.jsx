import React from 'react';

const mockAnalyticsData = {
  holisticMetrics: {
    streakDays: 14,
    totalWorkouts: 48,
    baseRating: '8.9 / 10'
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
      weekly: '54 mins',
      monthlyAvg: '58 mins'
    },
    weeklyMonthlyWorkouts: {
      weeklyCount: 4,
      monthlyAvg: '3.8 / week'
    }
  },
  topExercises: [
    { rank: 1, name: 'Barbell Bench Press', category: 'Chest', totalVolume: '1,420 kg' },
    { rank: 2, name: 'Lat Pulldown', category: 'Back', totalVolume: '1,150 kg' },
    { rank: 3, name: 'Incline Dumbbell Press', category: 'Chest', totalVolume: '980 kg' },
    { rank: 4, name: 'Barbell Squat', category: 'Legs', totalVolume: '850 kg' },
    { rank: 5, name: 'Dumbbell Bicep Curl', category: 'Arms', totalVolume: '620 kg' }
  ],
  targetedMuscles: [
    { name: 'Pectoralis Major', sets: 22, percentage: 32 },
    { name: 'Latissimus Dorsi', sets: 18, percentage: 26 },
    { name: 'Triceps Brachii', sets: 12, percentage: 17 },
    { name: 'Biceps Brachii', sets: 10, percentage: 15 },
    { name: 'Anterior Deltoids', sets: 7, percentage: 10 }
  ]
};

function TraineeAnalytics() {
  const { holisticMetrics, monthlyWeeklyAnalytics, topExercises, targetedMuscles } = mockAnalyticsData;
  const ratio = monthlyWeeklyAnalytics.workRestRatio;

  const strokeDasharray = 220;
  const workDashoffset = strokeDasharray - (strokeDasharray * ratio.workPercent) / 100;

  return (
    <div className="space-y-6 text-left" dir="ltr">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
            Consistency Streak
          </span>
          <div className="text-3xl font-extrabold text-gray-900">
            {holisticMetrics.streakDays} <span className="text-lg font-medium text-gray-500">Days</span>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
            Total Workouts
          </span>
          <div className="text-3xl font-extrabold text-gray-900">
            {holisticMetrics.totalWorkouts}
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
            Base Performance Rating
          </span>
          <div className="text-3xl font-extrabold text-gray-900">
            {holisticMetrics.baseRating}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
            Avg Set Size (Weekly / Monthly)
          </span>
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-2xl font-bold text-gray-800">{monthlyWeeklyAnalytics.avgSetSize.weekly}</span>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-200">
              {monthlyWeeklyAnalytics.avgSetSize.trend}
            </span>
          </div>
          <span className="text-xs text-gray-500">
            Monthly Average: {monthlyWeeklyAnalytics.avgSetSize.monthlyAvg}
          </span>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
                Work / Rest Ratio
              </span>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                {ratio.trend}
              </span>
            </div>

            <div className="relative flex flex-col items-center justify-center my-2">
              <svg className="w-44 h-24" viewBox="0 0 160 90">
                <path
                  d="M 20 80 A 60 60 0 0 1 140 80"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                <path
                  d="M 20 80 A 60 60 0 0 1 140 80"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={workDashoffset}
                />
              </svg>
              <div className="absolute bottom-1 text-center">
                <span className="text-xl font-extrabold text-gray-900 block leading-none">
                  {ratio.weekly}
                </span>
                <span className="text-[10px] text-gray-400 font-semibold uppercase">
                  Ratio
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center px-4 mt-1 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                <span className="text-xs font-bold text-gray-700">Work: {ratio.workPercent}%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                <span className="text-xs font-bold text-gray-700">Rest: {ratio.restPercent}%</span>
              </div>
            </div>
          </div>

          <span className="text-xs text-gray-500 mt-3 block">
            Monthly Average: {ratio.monthlyAvg}
          </span>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
            Weekly Set Count & Alert
          </span>
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-2xl font-bold text-gray-800">{monthlyWeeklyAnalytics.weeklySetCount.current} Sets</span>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {monthlyWeeklyAnalytics.weeklySetCount.alert}
            </span>
          </div>
          <span className="text-xs text-gray-500">
            Trend: {monthlyWeeklyAnalytics.weeklySetCount.trend} vs last month
          </span>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
            Avg Workout Duration
          </span>
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {monthlyWeeklyAnalytics.avgWorkoutDuration.weekly}
          </div>
          <span className="text-xs text-gray-500">
            Monthly Average: {monthlyWeeklyAnalytics.avgWorkoutDuration.monthlyAvg}
          </span>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm md:col-span-2 lg:col-span-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
            Weekly Workouts & Monthly Average
          </span>
          <div className="flex items-baseline gap-4 mb-1">
            <span className="text-2xl font-bold text-gray-800">
              {monthlyWeeklyAnalytics.weeklyMonthlyWorkouts.weeklyCount} Workouts This Week
            </span>
          </div>
          <span className="text-xs text-gray-500">
            Monthly Frequency Average: {monthlyWeeklyAnalytics.weeklyMonthlyWorkouts.monthlyAvg}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h4 className="text-base font-bold text-gray-900 mb-4">
            Targeted Muscles Summary (Sets & Percentage)
          </h4>
          <div className="space-y-3">
            {targetedMuscles.map((muscle, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-gray-700">
                  <span>{muscle.name}</span>
                  <span>{muscle.sets} sets ({muscle.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-black h-2 rounded-full transition-all"
                    style={{ width: `${muscle.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h4 className="text-base font-bold text-gray-900 mb-4">
            TOP 5 Exercises (Weekly / Monthly)
          </h4>
          <div className="divide-y divide-gray-100">
            {topExercises.map((exercise) => (
              <div key={exercise.rank} className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-800 text-xs font-bold flex items-center justify-center">
                    #{exercise.rank}
                  </span>
                  <div>
                    <span className="text-sm font-semibold text-gray-800 block">
                      {exercise.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {exercise.category}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-gray-700 bg-gray-50 px-2.5 py-1 rounded border border-gray-200">
                  {exercise.totalVolume}
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