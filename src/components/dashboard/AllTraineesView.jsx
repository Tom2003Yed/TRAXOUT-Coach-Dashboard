import React, { useState } from 'react';

const mockOverviewData = {
    averageRating: '8.7 / 10',
    avgWorkoutDuration: {
        weekly: '52 mins',
        monthly: '56 mins'
    },
    programAdherenceScore: '91%',
    avgSetSize: {
        weekly: '11.2 reps',
        monthlyAvg: '10.4 reps',
        trend: '+5%'
    },
    weeklySetCount: {
        current: 19,
        recommended: 18,
        trend: '+8.5%',
        alert: 'Optimal Load'
    },
    workRestRatio: {
        weekly: '1:2.1',
        monthlyAvg: '1:2.3',
        trend: '+6%',
        workPercent: 32,
        restPercent: 68
    },
    popularExercises: [
        { rank: 1, name: 'Barbell Bench Press', category: 'Chest', usageCount: 342 },
        { rank: 2, name: 'Lat Pulldown', category: 'Back', usageCount: 298 },
        { rank: 3, name: 'Barbell Squat', category: 'Legs', usageCount: 275 },
        { rank: 4, name: 'Incline Dumbbell Press', category: 'Chest', usageCount: 240 }
    ],
    leastPopularExercises: [
        { rank: 1, name: 'Cable Wrist Curl', category: 'Forearms', usageCount: 12 },
        { rank: 2, name: 'Seated Calf Raise', category: 'Calves', usageCount: 18 },
        { rank: 3, name: 'Decline Bench Press', category: 'Chest', usageCount: 25 },
        { rank: 4, name: 'Dumbbell Front Raise', category: 'Shoulders', usageCount: 31 }
    ],
    topTrainees: [
        { rank: 1, name: 'Alex Johnson', sets: 42, avgDuration: '65 mins', rating: '9.8' },
        { rank: 2, name: 'David Miller', sets: 38, avgDuration: '58 mins', rating: '9.5' },
        { rank: 3, name: 'Sarah Connor', sets: 36, avgDuration: '60 mins', rating: '9.3' }
    ],
    bottomTrainees: [
        { rank: 1, name: 'John Doe', sets: 8, avgDuration: '25 mins', rating: '5.2' },
        { rank: 2, name: 'Mike Ross', sets: 10, avgDuration: '30 mins', rating: '5.8' },
        { rank: 3, name: 'Emma Watson', sets: 12, avgDuration: '32 mins', rating: '6.1' }
    ]
};

function AllTraineesView() {
    const [filters, setFilters] = useState({
        gender: 'All',
        ageRange: 'All',
        weightRange: 'All'
    });

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const ratio = mockOverviewData.workRestRatio;
    const strokeDasharray = 220;
    const workDashoffset = strokeDasharray - (strokeDasharray * ratio.workPercent) / 100;

    return (
        <div className="max-w-7xl mx-auto p-8 space-y-8 text-left" dir="ltr">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                    Global Demographic Filters
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Gender</label>
                        <select
                            name="gender"
                            value={filters.gender}
                            onChange={handleFilterChange}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
                        >
                            <option value="All">All Genders</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Age Range</label>
                        <select
                            name="ageRange"
                            value={filters.ageRange}
                            onChange={handleFilterChange}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
                        >
                            <option value="All">All Ages</option>
                            <option value="18-24">18 - 24</option>
                            <option value="25-34">25 - 34</option>
                            <option value="35-44">35 - 44</option>
                            <option value="45+">45+</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Weight Range</label>
                        <select
                            name="weightRange"
                            value={filters.weightRange}
                            onChange={handleFilterChange}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
                        >
                            <option value="All">All Weights</option>
                            <option value="Under 70kg">Under 70 kg</option>
                            <option value="70-85kg">70 kg - 85 kg</option>
                            <option value="Over 85kg">Over 85 kg</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                        Average Rating
                    </span>
                    <div className="text-3xl font-extrabold text-gray-900">
                        {mockOverviewData.averageRating}
                    </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                        Avg Workout Duration (Weekly / Monthly)
                    </span>
                    <div className="text-2xl font-extrabold text-gray-900">
                        {mockOverviewData.avgWorkoutDuration.weekly}{' '}
                        <span className="text-xs font-normal text-gray-500">
                            (Monthly: {mockOverviewData.avgWorkoutDuration.monthly})
                        </span>
                    </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                        Program Adherence Score
                    </span>
                    <div className="text-3xl font-extrabold text-gray-900">
                        {mockOverviewData.programAdherenceScore}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
                                Work / Rest Ratio (All Trainees)
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

                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
                    <div>
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                            Avg Set Size (Weekly / Monthly)
                        </span>
                        <div className="flex items-baseline justify-between mb-1">
                            <span className="text-2xl font-bold text-gray-800">
                                {mockOverviewData.avgSetSize.weekly}
                            </span>
                            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                                {mockOverviewData.avgSetSize.trend}
                            </span>
                        </div>
                    </div>
                    <span className="text-xs text-gray-500">
                        Monthly Average: {mockOverviewData.avgSetSize.monthlyAvg}
                    </span>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
                    <div>
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                            Avg Weekly Set Count
                        </span>
                        <div className="flex items-baseline justify-between mb-1">
                            <span className="text-2xl font-bold text-gray-800">
                                {mockOverviewData.weeklySetCount.current} Sets
                            </span>
                            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                                {mockOverviewData.weeklySetCount.alert}
                            </span>
                        </div>
                    </div>
                    <span className="text-xs text-gray-500">
                        Trend: {mockOverviewData.weeklySetCount.trend} vs last month
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <h4 className="text-base font-bold text-gray-900 mb-4">
                        Most Popular & Top Exercises
                    </h4>
                    <div className="divide-y divide-gray-100">
                        {mockOverviewData.popularExercises.map((exercise) => (
                            <div key={exercise.rank} className="py-3 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-800 text-xs font-bold flex items-center justify-center">
                                        #{exercise.rank}
                                    </span>
                                    <div>
                                        <span className="text-sm font-semibold text-gray-800 block">
                                            {exercise.name}
                                        </span>
                                        <span className="text-xs text-gray-400">{exercise.category}</span>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-gray-700 bg-gray-50 px-2.5 py-1 rounded border border-gray-200">
                                    {exercise.usageCount} Sessions
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <h4 className="text-base font-bold text-gray-900 mb-4">
                        Least Popular Exercises
                    </h4>
                    <div className="divide-y divide-gray-100">
                        {mockOverviewData.leastPopularExercises.map((exercise) => (
                            <div key={exercise.rank} className="py-3 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="w-6 h-6 rounded-full bg-red-100 text-red-800 text-xs font-bold flex items-center justify-center">
                                        #{exercise.rank}
                                    </span>
                                    <div>
                                        <span className="text-sm font-semibold text-gray-800 block">
                                            {exercise.name}
                                        </span>
                                        <span className="text-xs text-gray-400">{exercise.category}</span>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-gray-700 bg-gray-50 px-2.5 py-1 rounded border border-gray-200">
                                    {exercise.usageCount} Sessions
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <h4 className="text-base font-bold text-gray-900 mb-4">
                        TOP Trainees Rankings
                    </h4>
                    <div className="divide-y divide-gray-100">
                        {mockOverviewData.topTrainees.map((trainee) => (
                            <div key={trainee.rank} className="py-3 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="w-6 h-6 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center">
                                        #{trainee.rank}
                                    </span>
                                    <span className="text-sm font-semibold text-gray-800">
                                        {trainee.name}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-xs">
                                    <span className="bg-gray-50 px-2 py-1 rounded text-gray-600 border border-gray-200">
                                        {trainee.sets} Sets
                                    </span>
                                    <span className="bg-gray-50 px-2 py-1 rounded text-gray-600 border border-gray-200">
                                        {trainee.avgDuration}
                                    </span>
                                    <span className="bg-green-50 text-green-700 font-bold px-2 py-1 rounded border border-green-200">
                                        Rating: {trainee.rating}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <h4 className="text-base font-bold text-gray-900 mb-4">
                        BOTTOM Trainees Rankings
                    </h4>
                    <div className="divide-y divide-gray-100">
                        {mockOverviewData.bottomTrainees.map((trainee) => (
                            <div key={trainee.rank} className="py-3 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 text-xs font-bold flex items-center justify-center">
                                        #{trainee.rank}
                                    </span>
                                    <span className="text-sm font-semibold text-gray-800">
                                        {trainee.name}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-xs">
                                    <span className="bg-gray-50 px-2 py-1 rounded text-gray-600 border border-gray-200">
                                        {trainee.sets} Sets
                                    </span>
                                    <span className="bg-gray-50 px-2 py-1 rounded text-gray-600 border border-gray-200">
                                        {trainee.avgDuration}
                                    </span>
                                    <span className="bg-red-50 text-red-700 font-bold px-2 py-1 rounded border border-red-200">
                                        Rating: {trainee.rating}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllTraineesView;