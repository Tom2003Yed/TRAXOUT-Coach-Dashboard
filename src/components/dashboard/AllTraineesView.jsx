import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopHeader from '../bars/TopHeader';
import { trainees } from '../../data/trainees';
import MuscleBodyDiagram from './MuscleBodyDiagram';

const ageOptions = [
    { value: 'ALL', label: 'All ages' },
    { value: '18-24', label: '18-24' },
    { value: '25-29', label: '25-29' },
    { value: '30-35', label: '30-35' }
];

const defaultFilters = { gender: 'ALL', ageRange: 'ALL' };

const exerciseImageMap = {
    'Barbell Bench Press': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80',
    'Lat Pulldown': 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
    'Incline Dumbbell Press': 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=900&q=80',
    'Barbell Squat': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
    'Dumbbell Bicep Curl': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80',
    'Dumbbell Lunge': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80',
    Deadlift: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
    'Romanian Deadlift': 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
    'Overhead Press': 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
    'Cable Row': 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=900&q=80',
    'Hip Thrust': 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
    'Pull-up': 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80',
    'Power Clean': 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=900&q=80',
    'Walking Lunges': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80',
    'Box Jumps': 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=900&q=80',
    'Plank Hold': 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80'
};

const exerciseCatalog = [
    ['Barbell Bench Press', 'Chest', 24],
    ['Lat Pulldown', 'Back', 20],
    ['Incline Dumbbell Press', 'Chest', 18],
    ['Barbell Squat', 'Legs', 15],
    ['Dumbbell Bicep Curl', 'Arms', 12],
    ['Dumbbell Lunge', 'Legs', 11],
    ['Deadlift', 'Back & Legs', 10],
    ['Romanian Deadlift', 'Hamstrings', 9],
    ['Overhead Press', 'Shoulders', 8],
    ['Cable Row', 'Back', 7],
    ['Hip Thrust', 'Glutes', 6],
    ['Pull-up', 'Back', 5],
    ['Power Clean', 'Full Body', 4],
    ['Walking Lunges', 'Legs', 3],
    ['Box Jumps', 'Power', 2],
    ['Plank Hold', 'Core', 1]
].map(([name, category, usage]) => ({
    name,
    category,
    usage,
    image: exerciseImageMap[name] || 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80'
}));

const yearOptions = ['ALL', '2026', '2025'];
const monthOptions = ['ALL', 'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

const filterTrainees = (filters) => trainees.filter((trainee) => {
    const matchesGender = filters.gender === 'ALL' || trainee.gender === filters.gender;
    const [minAge, maxAge] = filters.ageRange === 'ALL'
        ? [0, Infinity]
        : filters.ageRange.split('-').map(Number);
    return matchesGender && trainee.age >= minAge && trainee.age <= maxAge;
});

const average = (values) => values.length
    ? values.reduce((total, value) => total + value, 0) / values.length
    : 0;

const getExerciseUsage = (traineeGroup, timeFilters) => {
    const groupRatio = traineeGroup.length / trainees.length;
    const yearRatio = timeFilters.year === 'ALL' ? 1 : timeFilters.year === '2026' ? 0.7 : 0.3;
    const monthIndex = timeFilters.month === 'ALL' ? -1 : monthOptions.indexOf(timeFilters.month) - 1;
    const exercises = exerciseCatalog.map((exercise, index) => ({
        ...exercise,
        sets: Math.max(1, Math.round(exercise.usage * (0.8 + groupRatio) * yearRatio * (
            monthIndex === -1 ? 1 : 0.72 + (((index * 3 + monthIndex * 5) % 9) * 0.06)
        ) + (index % 3)))
    }));
    const totalSets = exercises.reduce((total, exercise) => total + exercise.sets, 0);

    return exercises
        .sort((first, second) => second.sets - first.sets)
        .map((exercise, index) => ({
            ...exercise,
            rank: index + 1,
            percentage: Math.round((exercise.sets / totalSets) * 100)
        }));
};

const aggregateMuscleCatalog = [
    ['Pectoralis Major', '#69cbd5'],
    ['Latissimus Dorsi', '#70b9dc'],
    ['Anterior Deltoids', '#9da3e2'],
    ['Triceps Brachii', '#b99cdd'],
    ['Biceps Brachii', '#e2b66b'],
    ['Quadriceps', '#72c6b3'],
    ['Gluteus Maximus', '#dc91a4'],
    ['Hamstrings', '#e0a0ad'],
    ['Core', '#dfc76c'],
    ['Erector Spinae', '#969ddd']
];

const getTraineeMuscleSeed = (trainee, year, month) => {
    const monthIndex = month === 'ALL' ? 0 : monthOptions.indexOf(month);
    return trainee.id.split('').reduce((total, character) => total + character.charCodeAt(0), trainee.age * 13)
        + Number(year === 'ALL' ? 2026 : year) * 7
        + monthIndex * 29;
};

const getAverageMuscleDistribution = (traineeGroup, timeFilters) => {
    if (!traineeGroup.length) return [];

    const totals = aggregateMuscleCatalog.map(([name, color], muscleIndex) => ({ name, color, value: 0 }));
    traineeGroup.forEach((trainee) => {
        const seed = getTraineeMuscleSeed(trainee, timeFilters.year, timeFilters.month);
        totals.forEach((muscle, muscleIndex) => {
            muscle.value += 8 + ((seed + muscleIndex * 17) % 42);
        });
    });

    const totalValue = totals.reduce((total, muscle) => total + muscle.value, 0);
    return totals.map((muscle) => ({
        ...muscle,
        percentage: Math.round((muscle.value / totalValue) * 100)
    }));
};

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

const getTeamAiInsights = (traineeGroup, filters) => {
    if (!traineeGroup.length) return ['No trainees match the selected filters.'];

    const averageScore = Math.round(average(traineeGroup.map((trainee) => trainee.score)));
    const activeRate = Math.round((traineeGroup.filter((trainee) => trainee.status === 'ACTIVE').length / traineeGroup.length) * 100);
    const muscleData = getAverageMuscleDistribution(traineeGroup, filters);
    const topMuscle = [...muscleData].sort((first, second) => second.percentage - first.percentage)[0];
    const exerciseData = getExerciseUsage(traineeGroup, filters);
    const topExercise = exerciseData[0];
    const filterLabel = [
        filters.gender === 'ALL' ? 'all genders' : filters.gender === 'M' ? 'male trainees' : 'female trainees',
        filters.ageRange === 'ALL' ? 'all age groups' : `${filters.ageRange} years`,
        filters.year === 'ALL' ? 'all years' : filters.year,
        filters.month === 'ALL' ? 'all months' : filters.month.toLowerCase()
    ].join(' / ');

    return [
        `${traineeGroup.length} trainees match the current view: ${filterLabel}.`,
        `The group averages ${averageScore}/100, with ${activeRate}% currently marked active.`,
        `${topMuscle.name} is the leading target area at ${topMuscle.percentage}% of average volume.`,
        `${topExercise.name} leads exercise usage at ${topExercise.percentage}% for this filtered group.`
    ];
};

function TeamAiInsights({ traineeGroup, filters }) {
    return (
        <div className="rounded-2xl border border-cyan-500/20 bg-[#12191d] p-6 shadow-[0_0_24px_rgba(34,211,238,0.06)]">
            <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-400">AI Team Insights</p>
                    <h3 className="mt-1 text-lg font-bold text-white">Aggregate analytics snapshot</h3>
                </div>
                <span className="rounded border border-cyan-500/20 bg-cyan-500/10 px-2 py-1 text-[9px] font-mono uppercase text-cyan-300">Filter based</span>
            </div>
            <div className="grid gap-2 md:grid-cols-2">
                {getTeamAiInsights(traineeGroup, filters).map((insight) => (
                    <p key={insight} className="rounded-lg border border-gray-800/80 bg-[#181b20] px-3 py-2.5 text-xs leading-relaxed text-gray-300">
                        {insight}
                    </p>
                ))}
            </div>
        </div>
    );
}

function AggregateMuscleCard({ traineeGroup, filters, onChange }) {
    const distribution = getAverageMuscleDistribution(traineeGroup, filters);
    const [activeMuscle, setActiveMuscle] = useState(null);
    let startAngle = 0;
    const genderSelectStyle = filters.gender === 'ALL'
        ? {
            backgroundImage: 'linear-gradient(135deg, rgba(59, 130, 246, 0.28), rgba(236, 72, 153, 0.28))',
            borderColor: 'rgba(125, 211, 252, 0.6)',
            color: '#e0f2fe'
        }
        : filters.gender === 'M'
            ? {
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                borderColor: 'rgba(96, 165, 250, 0.65)',
                color: '#93c5fd'
            }
            : {
                backgroundColor: 'rgba(219, 39, 119, 0.2)',
                borderColor: 'rgba(244, 114, 182, 0.65)',
                color: '#f9a8d4'
            };

    return (
        <div className="lg:col-span-2 rounded-2xl border border-gray-800/80 bg-[#121418] p-6 shadow-xl">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-400">Team Muscle Analytics</p>
                    <h3 className="mt-1 text-xl font-bold text-white">Average Targeted Muscles Distribution</h3>
                    <p className="mt-1 text-xs font-mono text-gray-500">Average across {traineeGroup.length} matched trainees</p>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    <select value={filters.gender} onChange={(event) => onChange({ ...filters, gender: event.target.value })} style={genderSelectStyle} className="rounded-lg border px-2 py-2 text-[10px] font-mono outline-none transition-colors focus:ring-1 focus:ring-cyan-400/50" aria-label="Filter team muscles by gender">
                        <option value="ALL" style={{ backgroundColor: '#181b20', color: '#e0f2fe' }}>Gender: All</option>
                        <option value="M" style={{ backgroundColor: '#172554', color: '#bfdbfe' }}>Gender: Male</option>
                        <option value="F" style={{ backgroundColor: '#500724', color: '#fbcfe8' }}>Gender: Female</option>
                    </select>
                    <select value={filters.ageRange} onChange={(event) => onChange({ ...filters, ageRange: event.target.value })} className="rounded-lg border border-gray-700 bg-[#181b20] px-2 py-2 text-[10px] font-mono text-gray-300 outline-none focus:border-cyan-400" aria-label="Filter team muscles by age">
                        {ageOptions.map((option) => <option key={option.value} value={option.value}>Age: {option.label}</option>)}
                    </select>
                    <select value={filters.year} onChange={(event) => onChange({ ...filters, year: event.target.value })} className="rounded-lg border border-gray-700 bg-[#181b20] px-2 py-2 text-[10px] font-mono text-gray-300 outline-none focus:border-cyan-400" aria-label="Filter team muscles by year">
                        {yearOptions.map((year) => <option key={year} value={year}>Year: {year === 'ALL' ? 'All years' : year}</option>)}
                    </select>
                    <select value={filters.month} onChange={(event) => onChange({ ...filters, month: event.target.value })} className="rounded-lg border border-gray-700 bg-[#181b20] px-2 py-2 text-[10px] font-mono text-gray-300 outline-none focus:border-cyan-400" aria-label="Filter team muscles by month">
                        {monthOptions.map((month) => <option key={month} value={month}>Month: {month === 'ALL' ? 'All months' : month[0] + month.slice(1).toLowerCase()}</option>)}
                    </select>
                </div>
            </div>

            {distribution.length ? (
                <>
                    <div className="mt-6 grid items-center gap-8 md:grid-cols-[minmax(280px,390px)_minmax(0,1fr)]">
                        <div className="mx-auto h-[330px] w-[330px] max-w-full">
                            <svg viewBox="0 0 200 200" className="h-full w-full" role="img" aria-label="Average targeted muscle distribution pie chart">
                                {distribution.map((muscle) => {
                                    const endAngle = startAngle + (muscle.percentage / 100) * 360;
                                    const path = describePieSlice(startAngle, endAngle);
                                    startAngle = endAngle;
                                    return <path key={muscle.name} d={path} fill={muscle.color} className="cursor-pointer stroke-[#121418] stroke-2 transition-opacity" opacity={activeMuscle && activeMuscle !== muscle.name ? 0.35 : 1} onMouseEnter={() => setActiveMuscle(muscle.name)} onMouseLeave={() => setActiveMuscle(null)} />;
                                })}
                            </svg>
                        </div>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {distribution.map((muscle) => (
                                <div key={muscle.name} className={`flex items-center justify-between gap-3 rounded-lg border border-gray-800/70 bg-[#181b20] px-3 py-2.5 transition-colors ${activeMuscle === muscle.name ? 'bg-cyan-500/10 text-white' : ''}`} onMouseEnter={() => setActiveMuscle(muscle.name)} onMouseLeave={() => setActiveMuscle(null)}>
                                    <span className="flex min-w-0 items-center gap-2 text-xs font-mono text-gray-300"><span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: muscle.color }} /><span className="truncate">{muscle.name}</span></span>
                                    <span className="shrink-0 text-xs font-mono text-cyan-300">{muscle.percentage}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 border-t border-gray-800/80 pt-5">
                        {['front', 'back'].map((view) => (
                            <div key={view} className="rounded-xl border border-gray-800 bg-[#0d1013] p-3">
                                <p className="mb-2 text-center text-[10px] font-mono uppercase tracking-widest text-gray-500">{view} view</p>
                                <MuscleBodyDiagram
                                    view={view}
                                    activeMuscle={activeMuscle}
                                    onMuscleEnter={setActiveMuscle}
                                    onMuscleLeave={() => setActiveMuscle(null)}
                                    className="h-72 w-full"
                                />
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <p className="mt-8 rounded-xl border border-dashed border-gray-700 p-8 text-center text-xs font-mono text-gray-500">No trainees match the selected filters.</p>
            )}
        </div>
    );
}

function CardFilters({ filters, onChange }) {
    const genderSelectStyle = filters.gender === 'ALL'
        ? {
            backgroundImage: 'linear-gradient(135deg, rgba(59, 130, 246, 0.28), rgba(236, 72, 153, 0.28))',
            borderColor: 'rgba(125, 211, 252, 0.6)',
            color: '#e0f2fe'
        }
        : filters.gender === 'M'
            ? {
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                borderColor: 'rgba(96, 165, 250, 0.65)',
                color: '#93c5fd'
            }
            : {
                backgroundColor: 'rgba(219, 39, 119, 0.2)',
                borderColor: 'rgba(244, 114, 182, 0.65)',
                color: '#f9a8d4'
            };

    return (
        <div className="flex flex-wrap gap-2 mt-4">
            <select
                value={filters.gender}
                onChange={(event) => onChange({ ...filters, gender: event.target.value })}
                style={genderSelectStyle}
                className="rounded px-2 py-1 text-[10px] font-mono outline-none transition-colors focus:ring-1 focus:ring-cyan-400/50"
                aria-label="Filter by gender"
            >
                <option value="ALL" style={{ backgroundColor: '#181b20', color: '#e0f2fe' }}>Gender: All</option>
                <option value="M" style={{ backgroundColor: '#172554', color: '#bfdbfe' }}>Gender: Male</option>
                <option value="F" style={{ backgroundColor: '#500724', color: '#fbcfe8' }}>Gender: Female</option>
            </select>
            <select
                value={filters.ageRange}
                onChange={(event) => onChange({ ...filters, ageRange: event.target.value })}
                className="bg-[#181b20] border border-gray-800 rounded px-2 py-1 text-[10px] font-mono text-gray-400 outline-none focus:border-cyan-500/50"
                aria-label="Filter by age"
            >
                {ageOptions.map((option) => <option key={option.value} value={option.value}>Age: {option.label}</option>)}
            </select>
        </div>
    );
}

function ExerciseList({ title, exercises, accent = 'cyan' }) {
    const rankColor = accent === 'amber' ? 'text-amber-400' : 'text-cyan-400';

    return (
        <div>
            <h4 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-gray-400">{title}</h4>
            <div className="space-y-2.5">
                {exercises.map((exercise, index) => (
                    <div key={exercise.name} className="flex items-center justify-between gap-3 rounded-xl border border-gray-800/50 bg-[#181b20] p-2.5">
                        <div className="flex min-w-0 items-center gap-3">
                            <img src={exercise.image} alt={`${exercise.name} exercise`} className="h-10 w-10 shrink-0 rounded-lg border border-gray-700 object-cover" />
                            <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded bg-gray-800 font-mono text-[10px] font-bold ${rankColor}`}>#{index + 1}</span>
                            <div className="min-w-0">
                                <span className="block truncate text-xs font-semibold text-gray-200">{exercise.name}</span>
                                <span className="font-mono text-[10px] text-gray-500">{exercise.category}</span>
                            </div>
                        </div>
                        <span className="shrink-0 rounded border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] text-cyan-400">{exercise.percentage}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function AllTraineesView() {
    const navigate = useNavigate();
    const [cardFilters, setCardFilters] = useState({
        rating: defaultFilters,
        duration: defaultFilters,
        adherence: defaultFilters,
        efficacy: defaultFilters,
        leaderboard: defaultFilters
    });
    const [allExercisesFilters, setAllExercisesFilters] = useState({ ...defaultFilters, year: 'ALL', month: 'ALL' });
    const [aggregateMuscleFilters, setAggregateMuscleFilters] = useState({ ...defaultFilters, year: '2026', month: 'ALL' });
    const [isAllExercisesOpen, setIsAllExercisesOpen] = useState(false);
    const updateCardFilters = (card, filters) => setCardFilters((current) => ({ ...current, [card]: filters }));
    const ratingGroup = filterTrainees(cardFilters.rating);
    const durationGroup = filterTrainees(cardFilters.duration);
    const adherenceGroup = filterTrainees(cardFilters.adherence);
    const efficacyGroup = filterTrainees(cardFilters.efficacy);
    const leaderboardGroup = filterTrainees(cardFilters.leaderboard);
    const aggregateMuscleGroup = filterTrainees(aggregateMuscleFilters);
    const rating = (average(ratingGroup.map((trainee) => trainee.score)) / 20).toFixed(1);
    const duration = Math.round(35 + average(durationGroup.map((trainee) => trainee.score)) / 2);
    const adherence = adherenceGroup.length ? Math.round((adherenceGroup.filter((trainee) => trainee.status === 'ACTIVE').length / adherenceGroup.length) * 100) : 0;
    const exerciseUsage = getExerciseUsage(efficacyGroup, { year: 'ALL', month: 'ALL' });
    const allExercisesGroup = filterTrainees(allExercisesFilters);
    const allExercisesUsage = getExerciseUsage(allExercisesGroup, allExercisesFilters);
    const topExercises = exerciseUsage.slice(0, 5);
    const bottomExercises = [...exerciseUsage].reverse().slice(0, 5);
    const leaderboard = [...leaderboardGroup].sort((first, second) => second.score - first.score).slice(0, 3);

    return (
        <div className="p-8 font-sans text-left min-h-screen bg-[#0d0f12]" dir="ltr">
            <TopHeader title="Performance Benchmarks & Insights" />

            <p className="text-xs text-gray-500 font-mono -mt-4 mb-6">
                System-Wide & Aggregate Analytics across all active cohorts.
            </p>

            {/* Top Stat Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#121418] border border-gray-800/80 rounded-2xl p-6 shadow-xl">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-2">
                        ALL TRAINEES AVG RATING
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-white font-mono">{rating}</span>
                        <span className="text-sm font-mono text-gray-500">/ 5.0</span>
                    </div>
                    <span className="text-xs text-emerald-400 font-mono mt-3 block">{ratingGroup.length} trainees matched</span>
                    <CardFilters filters={cardFilters.rating} onChange={(filters) => updateCardFilters('rating', filters)} />
                </div>

                <div className="bg-[#121418] border border-gray-800/80 rounded-2xl p-6 shadow-xl">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-2">
                        AVG WORKOUT DURATION
                    </span>
                    <div className="text-3xl font-black text-white font-mono">
                        {duration} <span className="text-sm text-gray-400 font-normal">MIN</span> 15 <span className="text-sm text-gray-400 font-normal">SEC</span>
                    </div>
                    <div className="flex gap-4 text-xs font-mono text-gray-500 mt-3">
                        <span>Weekly: {Math.max(20, duration + 3)}m</span>
                        <span>Monthly: {Math.max(20, duration - 1)}m</span>
                    </div>
                    <CardFilters filters={cardFilters.duration} onChange={(filters) => updateCardFilters('duration', filters)} />
                </div>

                <div className="bg-[#121418] border border-gray-800/80 rounded-2xl p-6 shadow-xl flex items-center justify-between">
                    <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-2">
                            PROGRAM ADHERENCE
                        </span>
                        <span className="text-4xl font-black text-white font-mono">{adherence}%</span>
                        <span className="text-xs text-cyan-400 font-mono block mt-2">OPTIMAL RANGE</span>
                    </div>
                    <CardFilters filters={cardFilters.adherence} onChange={(filters) => updateCardFilters('adherence', filters)} />
                </div>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-6">
                <TeamAiInsights traineeGroup={aggregateMuscleGroup} filters={aggregateMuscleFilters} />
                <AggregateMuscleCard
                    traineeGroup={aggregateMuscleGroup}
                    filters={aggregateMuscleFilters}
                    onChange={setAggregateMuscleFilters}
                />
            </div>

            {/* Exercise Efficacy & Global Leaderboards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-[#121418] border border-gray-800/80 rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-base font-bold text-white">Exercise Efficacy & Volume</h3>
                            <p className="text-xs text-gray-500 font-mono">Top vs. Least popular relative to engagement score.</p>
                        </div>
                        <span className="text-[10px] font-mono text-gray-500">{efficacyGroup.length} trainees matched</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <CardFilters filters={cardFilters.efficacy} onChange={(filters) => updateCardFilters('efficacy', filters)} />
                    </div>
                    <div className="mt-5 grid grid-cols-1 gap-6 border-b border-gray-800/80 pb-5 xl:grid-cols-2">
                        <ExerciseList title="Top 5 Exercises (By Usage)" exercises={topExercises} />
                        <ExerciseList title="Bottom 5 Exercises (By Usage)" exercises={bottomExercises} accent="amber" />
                    </div>
                    <button onClick={() => setIsAllExercisesOpen(true)} className="mt-4 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 font-mono text-[10px] text-cyan-300 transition-colors hover:bg-cyan-500/20">
                        All Exercises
                    </button>
                </div>

                <div className="bg-[#121418] border border-gray-800/80 rounded-2xl p-6 shadow-xl">
                    <h3 className="text-base font-bold text-white mb-4">Global Leaderboards</h3>
                    <CardFilters filters={cardFilters.leaderboard} onChange={(filters) => updateCardFilters('leaderboard', filters)} />
                    <div className="space-y-3">
                        {leaderboard.map((user, index) => (
                            <button
                                key={user.id}
                                type="button"
                                onClick={() => navigate('/trainees', { state: { trainee: user } })}
                                className="w-full p-3 bg-[#181b20] rounded-xl border border-gray-800/50 flex items-center justify-between text-left transition-colors hover:border-cyan-500/50 hover:bg-[#1c2228] focus:outline-none focus:ring-1 focus:ring-cyan-400/60"
                                aria-label={`Open profile for ${user.name}`}
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={user.image}
                                        alt={`${user.name} profile`}
                                        className="h-10 w-10 shrink-0 rounded-full border border-gray-700 object-cover"
                                    />
                                    <span className="text-xs font-mono font-bold text-cyan-400">{String(index + 1).padStart(2, '0')}</span>
                                    <div>
                                        <div className="text-xs font-bold text-white">{user.name}</div>
                                        <div className="text-[9px] font-mono text-gray-500">{user.tier}</div>
                                    </div>
                                </div>
                                <span className="text-sm font-black font-mono text-white">{user.score}</span>
                            </button>
                        ))}
                        {!leaderboard.length && <p className="text-xs font-mono text-gray-500">No trainees match these filters.</p>}
                    </div>
                </div>
            </div>

            {isAllExercisesOpen && (
                <div role="dialog" aria-modal="true" aria-label="All exercises usage" onClick={() => setIsAllExercisesOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
                    <div onClick={(event) => event.stopPropagation()} className="w-full max-w-4xl rounded-2xl border border-cyan-500/30 bg-[#12191d] p-5 shadow-[0_0_40px_rgba(34,211,238,0.12)]">
                        <div className="mb-5 flex items-start justify-between gap-4">
                            <div>
                                <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-400">Exercise Usage</p>
                                <h3 className="mt-1 text-xl font-bold text-white">All Exercises</h3>
                            </div>
                            <button onClick={() => setIsAllExercisesOpen(false)} aria-label="Close all exercises" className="h-8 w-8 rounded-lg border border-gray-700 text-gray-400 hover:border-cyan-400 hover:text-white">×</button>
                        </div>
                        <div className="mb-5 flex flex-wrap items-center gap-2">
                            <CardFilters filters={allExercisesFilters} onChange={(filters) => setAllExercisesFilters((current) => ({ ...current, ...filters }))} />
                            <select value={allExercisesFilters.year} onChange={(event) => setAllExercisesFilters((current) => ({ ...current, year: event.target.value }))} className="mt-4 rounded border border-gray-800 bg-[#181b20] px-2 py-1 font-mono text-[10px] text-gray-400 outline-none focus:border-cyan-500/50" aria-label="Filter all exercises by year">
                                {yearOptions.map((year) => <option key={year} value={year}>Year: {year === 'ALL' ? 'All years' : year}</option>)}
                            </select>
                            <select value={allExercisesFilters.month} onChange={(event) => setAllExercisesFilters((current) => ({ ...current, month: event.target.value }))} className="mt-4 rounded border border-gray-800 bg-[#181b20] px-2 py-1 font-mono text-[10px] text-gray-400 outline-none focus:border-cyan-500/50" aria-label="Filter all exercises by month">
                                {monthOptions.map((month) => <option key={month} value={month}>Month: {month === 'ALL' ? 'All months' : month[0] + month.slice(1).toLowerCase()}</option>)}
                            </select>
                        </div>
                        <div className="grid max-h-[65vh] grid-cols-1 gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
                            {allExercisesUsage.map((exercise) => (
                                <div key={exercise.name} className="flex items-center justify-between gap-3 rounded-xl border border-gray-800/50 bg-[#181b20] p-2.5">
                                    <div className="flex min-w-0 items-center gap-3">
                                        <img src={exercise.image} alt={`${exercise.name} exercise`} className="h-10 w-10 shrink-0 rounded-lg border border-gray-700 object-cover" />
                                        <div className="min-w-0"><span className="block truncate text-xs font-semibold text-gray-200">{exercise.name}</span><span className="font-mono text-[10px] text-gray-500">{exercise.category}</span></div>
                                    </div>
                                    <span className="shrink-0 rounded border border-cyan-500/20 bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] text-cyan-400">{exercise.percentage}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AllTraineesView;