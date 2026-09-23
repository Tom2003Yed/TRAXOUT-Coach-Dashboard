import React, { useMemo, useState } from 'react';
import { workoutProfiles } from './TraineeHistory';

const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const scheduleByWeekday = [null, 0, 1, 2, null, 0, 1];

const formatMonth = (date) => date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

const getMonthDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const leadingDays = firstDay.getDay();

    return Array.from({ length: leadingDays + daysInMonth }, (_, index) => {
        if (index < leadingDays) return null;
        const day = index - leadingDays + 1;
        return new Date(year, month, day);
    });
};

const sameDay = (first, second) => (
    first.getFullYear() === second.getFullYear()
    && first.getMonth() === second.getMonth()
    && first.getDate() === second.getDate()
);

const getNameSeed = (name = '') => [...name].reduce((total, character, index) => total + character.charCodeAt(0) * (index + 1), 17);

const getPersonalPlan = (profile, baseWorkouts) => {
    const seed = getNameSeed(profile?.name) + getNameSeed(profile?.id);
    const rotation = seed % baseWorkouts.length;

    return baseWorkouts.map((workout, index) => {
        const exercises = workout.exercises.map((exercise, exerciseIndex) => ({
            ...exercise,
            sets: exercise.sets.map((set) => ({ ...set, target: Math.max(1, set.target + ((seed + exerciseIndex) % 3) - 1) }))
        }));
        const reorderedExercises = exercises.slice((seed + index) % exercises.length).concat(exercises.slice(0, (seed + index) % exercises.length));
        const personalIndex = (index + rotation) % baseWorkouts.length;

        return {
            ...workout,
            id: `${profile?.id || 'trainee'}-${workout.id}`,
            title: `${workout.title} - ${profile?.name?.split(' ')[0] || 'Personal'} Focus`,
            points: workout.points + (seed % 5) * 10 + personalIndex * 5,
            exercises: reorderedExercises
        };
    });
};

const getPerformanceStatus = (profile, date, workout) => {
    const seed = getNameSeed(profile?.name) + date.getDate() * 13 + workout.id.length * 7;
    const result = seed % 5;
    if (result === 0) return 'missed';
    if (result === 1) return 'partial';
    return 'completed';
};

const performanceStyles = {
    completed: { label: 'Completed 100%', card: 'border-emerald-500/40 bg-emerald-500/10 hover:border-emerald-300', text: 'text-emerald-300', points: 1 },
    partial: { label: 'Partial completion', card: 'border-amber-500/40 bg-amber-500/10 hover:border-amber-300', text: 'text-amber-300', points: 0.5 },
    missed: { label: 'Missed workout', card: 'border-red-500/40 bg-red-500/10 hover:border-red-300', text: 'text-red-300', points: 0 }
};

function DumbbellIllustration() {
    return (
        <span className="relative mx-auto mb-2 block h-10 w-16 text-cyan-300" aria-hidden="true">
            <span className="absolute left-1/2 top-1/2 h-1.5 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current shadow-[0_0_10px_rgba(103,232,249,0.5)]" />
            <span className="absolute left-1 top-1/2 h-6 w-2 -translate-y-1/2 rounded-sm bg-current" />
            <span className="absolute left-4 top-1/2 h-8 w-1.5 -translate-y-1/2 rounded-sm bg-current" />
            <span className="absolute right-4 top-1/2 h-8 w-1.5 -translate-y-1/2 rounded-sm bg-current" />
            <span className="absolute right-1 top-1/2 h-6 w-2 -translate-y-1/2 rounded-sm bg-current" />
        </span>
    );
}

function RestDayIllustration() {
    return (
        <div className="mb-2 text-center" aria-label="Rest day">
            <div className="text-xl font-black leading-none tracking-[0.25em] text-slate-400">Z<span className="text-lg text-slate-500">Z</span><span className="text-sm text-slate-600">Z</span></div>
            <div className="mt-1 text-[9px] font-bold font-mono uppercase tracking-[0.18em] text-slate-500">Rest Day</div>
        </div>
    );
}

function WorkoutDetails({ workout, onClose }) {
    const totalSets = workout.exercises.reduce((total, exercise) => total + exercise.sets.length, 0);
    const statusStyle = workout.status ? performanceStyles[workout.status] : null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4" role="dialog" aria-modal="true" aria-labelledby="plan-workout-title" onClick={onClose}>
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-cyan-500/30 bg-[#121418] p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
                <div className="flex items-start justify-between gap-4 border-b border-gray-800 pb-5">
                    <div>
                        <p className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">Workout plan</p>
                        <h2 id="plan-workout-title" className="mt-1 text-2xl font-bold text-white">{workout.title}</h2>
                        <p className="mt-1 text-xs font-mono text-gray-500">{workout.type} | {workout.duration}</p>
                        {statusStyle && <p className={`mt-2 text-xs font-mono font-bold ${statusStyle.text}`}>{statusStyle.label} | +{workout.awardedPoints} points</p>}
                    </div>
                    <button onClick={onClose} aria-label="Close workout details" className="h-8 w-8 rounded-lg border border-gray-700 text-gray-400 hover:border-cyan-400 hover:text-white">x</button>
                </div>

                <div className="grid grid-cols-3 gap-3 py-5 text-center font-mono">
                    <div className="rounded-lg border border-gray-800 bg-[#181b20] p-3"><span className="block text-[10px] text-gray-500">EXERCISES</span><b className="text-lg text-white">{workout.exercises.length}</b></div>
                    <div className="rounded-lg border border-gray-800 bg-[#181b20] p-3"><span className="block text-[10px] text-gray-500">SETS</span><b className="text-lg text-white">{totalSets}</b></div>
                    <div className={`rounded-lg border p-3 ${statusStyle ? statusStyle.card : 'border-emerald-500/20 bg-emerald-500/5'}`}><span className="block text-[10px] text-gray-500">POINTS EARNED</span><b className={`text-lg ${statusStyle ? statusStyle.text : 'text-emerald-300'}`}>+{workout.awardedPoints ?? workout.points}</b></div>
                </div>

                <div className="space-y-3">
                    {workout.exercises.map((exercise) => (
                        <div key={exercise.name} className="flex items-center justify-between gap-4 rounded-xl border border-gray-800 bg-[#181b20] p-3">
                            <div className="flex min-w-0 items-center gap-3">
                                <img src={exercise.image} alt={exercise.name} className="h-12 w-12 rounded-lg object-cover border border-gray-700" />
                                <div><h3 className="text-sm font-bold text-white">{exercise.name}</h3><p className="text-[10px] font-mono text-gray-500">{exercise.sets.length} sets | {exercise.sets.reduce((total, set) => total + set.target, 0)} target reps</p></div>
                            </div>
                            <span className="shrink-0 text-xs font-mono text-cyan-300">{exercise.sets.length} sets</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function TrainingPlan({ profile }) {
    const [visibleMonth, setVisibleMonth] = useState(() => new Date());
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const baseWorkouts = workoutProfiles[profile?.gender === 'F' ? 'female' : 'male'];
    const workouts = useMemo(() => getPersonalPlan(profile, baseWorkouts), [profile, baseWorkouts]);
    const today = new Date();
    const days = useMemo(() => getMonthDays(visibleMonth), [visibleMonth]);

    const getWorkoutForDay = (date) => {
        if (!date) return null;
        const workoutIndex = scheduleByWeekday[(date.getDay() + getNameSeed(profile?.id)) % scheduleByWeekday.length];
        return workoutIndex === null ? null : workouts[workoutIndex];
    };

    const shiftMonth = (amount) => setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + amount, 1));

    return (
        <div className="space-y-6 font-sans text-left" dir="ltr">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div><p className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">Training calendar</p><h2 className="mt-1 text-xl font-bold text-white">{formatMonth(visibleMonth)}</h2></div>
                <div className="flex items-center gap-2">
                    <button onClick={() => shiftMonth(-1)} className="rounded-lg border border-gray-700 bg-[#181b20] px-3 py-2 text-xs font-mono text-gray-300 hover:border-cyan-400 hover:text-white">Previous</button>
                    <button onClick={() => setVisibleMonth(new Date())} className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-xs font-mono text-cyan-300 hover:bg-cyan-500/20">Current</button>
                    <button onClick={() => shiftMonth(1)} className="rounded-lg border border-gray-700 bg-[#181b20] px-3 py-2 text-xs font-mono text-gray-300 hover:border-cyan-400 hover:text-white">Next</button>
                </div>
            </div>

            <div className="flex flex-wrap gap-3 text-[10px] font-mono text-gray-400"><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-emerald-400" />Completed 100%</span><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-amber-400" />Partial</span><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-red-400" />Missed</span><span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-cyan-300" />Upcoming</span></div>

            <div className="overflow-hidden rounded-2xl border border-gray-800 bg-[#0f1316]">
                <div className="grid grid-cols-7 border-b border-gray-800 bg-[#181b20]">{weekdayLabels.map((label) => <div key={label} className="px-2 py-3 text-center text-[10px] font-mono uppercase tracking-wider text-gray-500">{label}</div>)}</div>
                <div className="grid grid-cols-7">
                    {days.map((date, index) => {
                        const workout = getWorkoutForDay(date);
                        const completed = date && date < today && !sameDay(date, today);
                        const status = completed && workout ? getPerformanceStatus(profile, date, workout) : null;
                        const statusStyle = status ? performanceStyles[status] : null;
                        return (
                            <div key={date ? date.toISOString() : `empty-${index}`} className="min-h-[150px] border-b border-r border-gray-800/80 p-2 last:border-r-0">
                                {date && <>
                                    <div className={`mb-2 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-mono ${sameDay(date, today) ? 'bg-cyan-300 font-bold text-[#071014]' : 'text-gray-500'}`}>{date.getDate()}</div>
                                    {workout ? (
                                        <button onClick={() => setSelectedWorkout({ ...workout, completed, status, awardedPoints: Math.round(workout.points * (status ? performanceStyles[status].points : 0)) })} className={`w-full rounded-lg border p-2 text-left transition-colors ${statusStyle ? statusStyle.card : 'border-cyan-500/30 bg-cyan-500/5 hover:border-cyan-300'}`}>
                                            <DumbbellIllustration />
                                            <span className={`mb-1 block text-[9px] font-mono uppercase ${statusStyle?.text || 'text-cyan-300'}`}>{statusStyle?.label || 'Upcoming'}</span>
                                            <strong className="block truncate text-xs text-white">{workout.title}</strong>
                                            <span className="mt-1 block text-[10px] font-mono text-gray-500">{workout.exercises.length} exercises | {workout.exercises.reduce((total, exercise) => total + exercise.sets.length, 0)} sets</span>
                                            <span className={`mt-1 block text-[10px] font-mono ${statusStyle?.text || 'text-gray-500'}`}>{completed ? `+${Math.round(workout.points * performanceStyles[status].points)} points earned` : `+${workout.points} points planned`}</span>
                                        </button>
                                    ) : (
                                        <div className="flex min-h-[110px] flex-col justify-center rounded-lg border border-slate-700/50 bg-slate-900/30 p-2 text-center">
                                            <RestDayIllustration />
                                            <span className="text-[9px] font-mono uppercase tracking-wider text-slate-600">Recovery</span>
                                        </div>
                                    )}
                                </>}
                            </div>
                        );
                    })}
                </div>
            </div>

            {selectedWorkout && <WorkoutDetails workout={selectedWorkout} onClose={() => setSelectedWorkout(null)} />}
        </div>
    );
}

export default TrainingPlan;
