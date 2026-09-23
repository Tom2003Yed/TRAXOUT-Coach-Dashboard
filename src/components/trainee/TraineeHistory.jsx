import React, { useState } from 'react';
import WorkoutCard from './WorkoutCard';

// Image Assets
const maleExerciseImage =
    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=320&q=80';
const femaleExerciseImage =
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=320&q=80';
const maleBodyImage =
    'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=480&q=80';
const femaleBodyImage =
    'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=480&q=80';

// Workout Datasets
const workoutSets = {
    squat: [
        { set: 1, target: 8, actual: 8, weight: 100, rpe: 7, rest: '2:00' },
        { set: 2, target: 6, actual: 6, weight: 120, rpe: 8, rest: '2:30' },
    ],
    press: [
        { set: 1, target: 10, actual: 10, weight: 60, rpe: 7, rest: '1:30' },
        { set: 2, target: 8, actual: 8, weight: 70, rpe: 8, rest: '2:00' },
    ],
    row: [
        { set: 1, target: 10, actual: 10, weight: 55, rpe: 7, rest: '1:30' },
        { set: 2, target: 10, actual: 9, weight: 60, rpe: 8, rest: '1:45' },
    ],
    lunge: [
        { set: 1, target: 12, actual: 12, weight: 18, rpe: 6, rest: '1:00' },
        { set: 2, target: 12, actual: 11, weight: 20, rpe: 7, rest: '1:15' },
    ],
    single: [
        { set: 1, target: 10, actual: 10, weight: 24, rpe: 7, rest: '1:30' },
    ],
    triple: [
        { set: 1, target: 10, actual: 10, weight: 40, rpe: 7, rest: '1:30' },
        { set: 2, target: 8, actual: 8, weight: 45, rpe: 8, rest: '1:45' },
        { set: 3, target: 8, actual: 7, weight: 45, rpe: 9, rest: '2:00' },
    ],
    four: [
        { set: 1, target: 12, actual: 12, weight: 16, rpe: 6, rest: '1:00' },
        { set: 2, target: 12, actual: 12, weight: 18, rpe: 7, rest: '1:00' },
        { set: 3, target: 10, actual: 10, weight: 20, rpe: 8, rest: '1:15' },
        { set: 4, target: 10, actual: 9, weight: 20, rpe: 9, rest: '1:30' },
    ],
};

export const workoutProfiles = {
    male: [
        {
            id: 'strength',
            title: 'Lower Body Power',
            date: 'Oct 24, 08:30 AM',
            points: 180,
            duration: '62 min',
            type: 'Power',
            targetMuscles: ['QUADS', 'GLUTES', 'HAMSTRINGS'],
            bodyView: 'Front',
            bodyImage: maleBodyImage,
            exercises: [
                { name: 'Barbell Back Squat', image: maleExerciseImage, sets: workoutSets.squat },
                { name: 'Romanian Deadlift', image: maleExerciseImage, sets: workoutSets.triple },
                { name: 'Walking Lunges', image: maleExerciseImage, sets: workoutSets.lunge },
                { name: 'Standing Calf Raise', image: maleExerciseImage, sets: workoutSets.single },
            ],
        },
        {
            id: 'upper',
            title: 'Upper Body Strength',
            date: 'Oct 22, 17:15 PM',
            points: 165,
            duration: '54 min',
            type: 'Strength',
            targetMuscles: ['CHEST', 'BACK', 'ARMS'],
            bodyView: 'Back',
            bodyImage: maleBodyImage,
            exercises: [
                { name: 'Barbell Bench Press', image: maleExerciseImage, sets: workoutSets.press },
                { name: 'Cable Row', image: maleExerciseImage, sets: workoutSets.triple },
                { name: 'Overhead Press', image: maleExerciseImage, sets: workoutSets.single },
                { name: 'EZ-Bar Curl', image: maleExerciseImage, sets: workoutSets.four },
            ],
        },
        {
            id: 'conditioning',
            title: 'Sprint Conditioning',
            date: 'Oct 20, 09:00 AM',
            points: 140,
            duration: '45 min',
            type: 'Conditioning',
            targetMuscles: ['LEGS', 'CORE'],
            bodyView: 'Front',
            bodyImage: maleBodyImage,
            exercises: [
                { name: 'Walking Lunges', image: maleExerciseImage, sets: workoutSets.lunge },
                { name: 'Box Jumps', image: maleExerciseImage, sets: workoutSets.single },
                { name: 'Mountain Climbers', image: maleExerciseImage, sets: workoutSets.triple },
                { name: 'Plank Hold', image: maleExerciseImage, sets: workoutSets.four },
            ],
        },
    ],
    female: [
        {
            id: 'glutes',
            title: 'Glute Activation',
            date: 'Oct 25, 09:00 AM',
            points: 155,
            duration: '48 min',
            type: 'Strength',
            targetMuscles: ['GLUTES', 'CORE'],
            bodyView: 'Back',
            bodyImage: femaleBodyImage,
            exercises: [
                { name: 'Dumbbell Lunges', image: femaleExerciseImage, sets: workoutSets.lunge },
                { name: 'Hip Thrust', image: femaleExerciseImage, sets: workoutSets.triple },
                { name: 'Step Ups', image: femaleExerciseImage, sets: workoutSets.single },
                { name: 'Banded Kickback', image: femaleExerciseImage, sets: workoutSets.four },
            ],
        },
        {
            id: 'upper',
            title: 'Upper Body Mobility',
            date: 'Oct 23, 16:30 PM',
            points: 125,
            duration: '42 min',
            type: 'Mobility',
            targetMuscles: ['BACK', 'SHOULDERS'],
            bodyView: 'Back',
            bodyImage: femaleBodyImage,
            exercises: [
                { name: 'Dumbbell Row', image: femaleExerciseImage, sets: workoutSets.row },
                { name: 'Band Pull Apart', image: femaleExerciseImage, sets: workoutSets.single },
                { name: 'Dumbbell Lateral Raise', image: femaleExerciseImage, sets: workoutSets.triple },
                { name: 'Assisted Pull-up', image: femaleExerciseImage, sets: workoutSets.four },
            ],
        },
        {
            id: 'conditioning',
            title: 'Cardio Intervals',
            date: 'Oct 21, 07:45 AM',
            points: 135,
            duration: '38 min',
            type: 'Conditioning',
            targetMuscles: ['FULL BODY'],
            bodyView: 'Front',
            bodyImage: femaleBodyImage,
            exercises: [
                { name: 'Bodyweight Squat', image: femaleExerciseImage, sets: workoutSets.squat },
                { name: 'Jumping Jacks', image: femaleExerciseImage, sets: workoutSets.single },
                { name: 'High Knees', image: femaleExerciseImage, sets: workoutSets.triple },
                { name: 'Plank Shoulder Tap', image: femaleExerciseImage, sets: workoutSets.four },
            ],
        },
    ],
};

const getExerciseType = (exerciseName) => {
    if (exerciseName.includes('Squat') || exerciseName.includes('Deadlift') || exerciseName.includes('Press')) return 'Compound Strength';
    if (exerciseName.includes('Lunge') || exerciseName.includes('Step') || exerciseName.includes('Raise')) return 'Unilateral Strength';
    if (exerciseName.includes('Plank') || exerciseName.includes('Climber') || exerciseName.includes('Jacks') || exerciseName.includes('Knees')) return 'Bodyweight Conditioning';
    if (exerciseName.includes('Row') || exerciseName.includes('Pull') || exerciseName.includes('Curl')) return 'Pull Strength';
    if (exerciseName.includes('Thrust') || exerciseName.includes('Kickback')) return 'Glute Isolation';
    if (exerciseName.includes('Jump')) return 'Explosive Power';
    return 'Accessory Exercise';
};

const getComparisonData = (workout) => {
    const plannedExercises = workout.exercises;
    const actualExercises = workout.actualExercises || workout.exercises;
    const actualByName = new Map(actualExercises.map((exercise) => [exercise.name, exercise]));
    const plannedNames = new Set(plannedExercises.map((exercise) => exercise.name));
    const rows = plannedExercises.map((planned) => ({ planned, actual: actualByName.get(planned.name) || null }));

    actualExercises.forEach((actual) => {
        if (!plannedNames.has(actual.name)) rows.push({ planned: null, actual });
    });

    const plannedExerciseCount = plannedExercises.length;
    const matchedExerciseCount = rows.filter((row) => row.planned && row.actual).length;
    const plannedSets = plannedExercises.reduce((total, exercise) => total + exercise.sets.length, 0);
    const actualSets = actualExercises.reduce((total, exercise) => total + exercise.sets.filter((set) => set.actual !== undefined).length, 0);
    const plannedReps = plannedExercises.reduce((total, exercise) => total + exercise.sets.reduce((sum, set) => sum + set.target, 0), 0);
    const actualReps = actualExercises.reduce((total, exercise) => total + exercise.sets.reduce((sum, set) => sum + (set.actual ?? 0), 0), 0);
    const matchingReps = plannedExercises.reduce((total, exercise) => {
        const actual = actualByName.get(exercise.name);
        if (!actual) return total;
        return total + exercise.sets.reduce((sum, set, index) => sum + (actual.sets[index]?.actual === set.target ? set.target : 0), 0);
    }, 0);
    const matchingSets = plannedExercises.reduce((total, exercise) => {
        const actual = actualByName.get(exercise.name);
        if (!actual) return total;
        return total + exercise.sets.filter((set, index) => actual.sets[index]?.actual !== undefined).length;
    }, 0);

    return {
        rows,
        exercisePercentage: plannedExerciseCount ? Math.round((matchedExerciseCount / plannedExerciseCount) * 100) : 0,
        repsPercentage: plannedReps ? Math.round((matchingReps / plannedReps) * 100) : 0,
        setsPercentage: plannedSets ? Math.round((matchingSets / plannedSets) * 100) : 0,
        plannedSets,
        actualSets,
        plannedReps,
        actualReps
    };
};

const getExerciseStatus = (planned, actual) => {
    if (!planned) return { label: 'Additional exercise', className: 'border-amber-400/50 bg-amber-500/10 text-amber-300' };
    if (!actual) return { label: 'Missing exercise', className: 'border-red-400/50 bg-red-500/10 text-red-300' };
    const exactSets = planned.sets.length === actual.sets.length;
    const exactReps = planned.sets.every((set, index) => actual.sets[index]?.actual === set.target);
    if (exactSets && exactReps) return { label: 'On plan', className: 'border-emerald-400/50 bg-emerald-500/10 text-emerald-300' };
    return { label: exactSets ? 'Rep change' : 'Set missing', className: 'border-red-400/50 bg-red-500/10 text-red-300' };
};

function TraineeHistory({ profile }) {
    const [selectedWorkouts, setSelectedWorkouts] = useState(new Set());
    const [comparisonWorkout, setComparisonWorkout] = useState(null);
    const workouts = workoutProfiles[profile?.gender === 'F' ? 'female' : 'male'];
    const profileImage = profile?.image;

    return (
        <div className="space-y-6 font-sans text-left" dir="ltr">
            {/* Training History Grid */}
            <div>
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider mb-4">
                    Training History
                </h3>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                    {workouts.map((workout) => {
                        const isExpanded = selectedWorkouts.has(workout.id);

                        const toggleWorkout = () =>
                            setSelectedWorkouts((current) => {
                                const next = new Set(current);
                                if (next.has(workout.id)) next.delete(workout.id);
                                else next.add(workout.id);
                                return next;
                            });

                        return (
                            <div key={workout.id}>
                                <WorkoutCard
                                    title={workout.title}
                                    date={workout.date}
                                    duration={workout.duration}
                                    ratio="1:2.2"
                                    restTimes={workout.type === 'Power' ? '90-150 sec' : workout.type === 'Mobility' ? '30-45 sec' : workout.type === 'Conditioning' ? '30-60 sec' : '60-90 sec'}
                                    exerciseType={workout.type === 'Power' ? 'Strength & Power' : workout.type === 'Mobility' ? 'Mobility & Control' : workout.type === 'Conditioning' ? 'Cardio Conditioning' : 'Strength & Activation'}
                                    type={workout.type}
                                    image={workout.exercises[0].image}
                                    bodyImage={workout.bodyImage}
                                    muscles={workout.targetMuscles}
                                    points={workout.points}
                                    isExpanded={isExpanded}
                                    onToggle={toggleWorkout}
                                    onCompare={() => setComparisonWorkout(workout)}
                                />

                                {/* Expanded Details */}
                                {isExpanded && (
                                    <div className="mt-2 bg-[#181b20] border border-gray-800 rounded-xl p-4 space-y-4">
                                        {workout.exercises.map((exercise) => (
                                            <div key={exercise.name}>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <img
                                                        src={exercise.image}
                                                        alt={exercise.name}
                                                        className="w-16 h-16 rounded-lg object-cover border border-gray-700"
                                                    />
                                                    <div>
                                                        <h4 className="text-sm font-bold text-white">{exercise.name}</h4>
                                                        <div className="flex flex-wrap gap-2 mt-1 text-[10px] font-mono">
                                                            <span className="text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-1 rounded">{exercise.sets.length} sets</span>
                                                            <span className="text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2 py-1 rounded">{exercise.sets.reduce((total, set) => total + set.actual, 0)} reps</span>
                                                            <span className="text-gray-300 bg-gray-800/70 border border-gray-700 px-2 py-1 rounded">{exercise.type || getExerciseType(exercise.name)}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="overflow-x-auto">
                                                    <table className="w-full text-left font-mono text-xs">
                                                        <thead>
                                                            <tr className="text-gray-500 border-b border-gray-800">
                                                                <th className="pb-2">SET</th>
                                                                <th className="pb-2">REPS COMPLETED</th>
                                                                <th className="pb-2">REST</th>
                                                                <th className="pb-2">KG</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-gray-800/50 text-gray-300">
                                                            {exercise.sets.map((set) => (
                                                                <tr key={set.set}>
                                                                    <td className="py-2">{set.set}</td>
                                                                    <td className="py-2 text-cyan-400">{set.actual}</td>
                                                                    <td className="py-2 text-amber-300">{set.rest || 'Not set'}</td>
                                                                    <td className="py-2 text-white">{set.weight}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {comparisonWorkout && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4" role="dialog" aria-modal="true" aria-labelledby="comparison-title">
                    <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-gray-700 bg-[#121418] shadow-2xl">
                        {(() => {
                            const comparison = getComparisonData(comparisonWorkout);
                            return (
                                <>
                        <div className="flex items-start justify-between gap-4 border-b border-gray-800 p-5">
                            <div>
                                <p className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">Plan Comparison</p>
                                <h3 id="comparison-title" className="mt-1 text-xl font-bold text-white">{comparisonWorkout.title}</h3>
                                <p className="mt-1 text-xs font-mono text-gray-500">Plan is on the left. Actual workout is on the right.</p>
                            </div>
                            <button onClick={() => setComparisonWorkout(null)} aria-label="Close comparison" className="rounded-lg border border-gray-700 px-3 py-1.5 text-xs font-mono text-gray-300 hover:border-gray-500 hover:text-white">
                                Close
                            </button>
                        </div>

                        <div className="overflow-y-auto p-5">
                            <div className="grid grid-cols-2 gap-3 border-b border-gray-800 pb-3 text-[10px] font-mono uppercase tracking-widest text-gray-500">
                                <div className="flex items-center gap-3 rounded-lg border border-gray-800 bg-[#181b20] px-4 py-3 text-gray-400"><span className="text-lg">&#9745;</span><span><b className="block text-xs text-white">Plan</b>What was planned</span></div>
                                <div className="flex items-center gap-3 rounded-lg border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 to-transparent px-4 py-3 text-emerald-300"><span className="text-lg">&#9876;</span><span><b className="block text-xs text-white">Workout</b>What was completed</span></div>
                            </div>
                            <div className="mt-3 space-y-3">
                                {comparison.rows.map((row, index) => {
                                    const maxSets = Math.max(row.planned?.sets.length || 0, row.actual?.sets.length || 0);
                                    const rowStatus = getExerciseStatus(row.planned, row.actual);
                                    return (
                                        <div key={`${row.planned?.name || 'additional'}-${row.actual?.name || 'missing'}-${index}`} className="relative grid grid-cols-2 gap-3">
                                            <span className="absolute left-1/2 top-1/2 z-10 hidden h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-700 bg-[#121418] text-xs text-gray-500 sm:flex">&#8596;</span>
                                            <span className="absolute -left-3 top-1/2 z-10 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-gray-700 bg-[#181b20] text-[10px] font-mono text-gray-400 sm:flex">{index + 1}</span>
                                            {[row.planned, row.actual].map((exercise, side) => {
                                                const isMissing = !exercise;
                                                const pairedExercise = side === 0 ? row.actual : row.planned;
                                                const isAdditional = side === 1 && !row.planned;
                                                return (
                                                    <div key={side} className={`relative rounded-xl border p-3 ${isMissing ? 'border-dashed border-gray-700 bg-[#0d1114]' : isAdditional ? 'border-amber-500/40 bg-amber-500/5' : 'border-gray-800 bg-[#181b20]'}`}>
                                                        {isMissing ? (
                                                            <div className="flex min-h-[116px] flex-col items-center justify-center text-center"><span className={`mb-2 flex h-9 w-9 items-center justify-center rounded-full border text-lg ${side === 0 ? 'border-gray-700 text-gray-500' : 'border-amber-400/50 text-amber-300'}`}>{side === 0 ? '!' : '+'}</span><span className={`text-[10px] font-mono uppercase tracking-wider ${side === 0 ? 'text-gray-500' : 'text-amber-300'}`}>{side === 0 ? 'Missing exercise' : 'Additional exercise'}</span><span className="mt-1 text-[9px] font-mono text-gray-600">No matching entry on this side</span></div>
                                                        ) : (
                                                            <>
                                                                <div className="flex items-start gap-2 border-b border-gray-800 pb-2">
                                                                    <img src={exercise.image} alt="" className="h-9 w-9 rounded-md object-cover opacity-80" />
                                                                    <div className="min-w-0 flex-1"><h4 className="truncate text-xs font-bold text-white">{exercise.name}</h4><span className="text-[10px] font-mono text-gray-500">{exercise.sets.length} {side === 0 ? 'planned' : 'performed'} sets</span></div>
                                                                    {side === 1 && <span className={`shrink-0 rounded-full border px-2 py-1 text-[8px] font-mono font-bold uppercase ${rowStatus.className}`}>{rowStatus.label}</span>}
                                                                </div>
                                                                <div className="mt-2 space-y-1.5">
                                                                    {Array.from({ length: maxSets }, (_, setIndex) => {
                                                                        const set = exercise.sets[setIndex];
                                                                        const pairedSet = pairedExercise?.sets[setIndex];
                                                                        const target = side === 0 ? set?.target : set?.actual;
                                                                        const otherValue = side === 0 ? pairedSet?.actual : pairedSet?.target;
                                                                        const changed = target !== undefined && otherValue !== undefined && target !== otherValue;
                                                                        const showDifference = side === 1 && changed;
                                                                        return <div key={setIndex} className={`flex items-center justify-between rounded border px-2 py-1 text-[10px] font-mono ${showDifference ? 'border-red-400/50 bg-red-500/10 text-red-200' : 'border-gray-800 text-gray-400'}`}><span>Set {setIndex + 1}</span><span>{target ?? 'Missing'}</span>{showDifference && <span className="text-[9px] uppercase text-red-300">changed</span>}</div>;
                                                                    })}
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="mt-5 border-t border-gray-800 pt-4">
                                <p className="mb-3 text-[10px] font-mono uppercase tracking-widest text-gray-500">Overall match summary</p>
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                    {[['Exercises match', comparison.exercisePercentage], ['Sets match', comparison.setsPercentage], ['Reps match', comparison.repsPercentage]].map(([label, percentage]) => {
                                        const color = percentage === 100 ? 'text-emerald-300' : percentage >= 50 ? 'text-amber-300' : 'text-red-300';
                                        const bar = percentage === 100 ? 'bg-emerald-400' : percentage >= 50 ? 'bg-amber-400' : 'bg-red-400';
                                        return <div key={label} className="rounded-xl border border-gray-800 bg-[#181b20] p-3"><div className="flex items-center justify-between gap-2"><span className="text-[10px] font-mono text-gray-500">{label}</span><strong className={`text-lg font-mono ${color}`}>{percentage}%</strong></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-800"><div className={`h-full rounded-full ${bar}`} style={{ width: `${percentage}%` }} /></div></div>;
                                    })}
                                </div>
                                <div className="mt-3 grid grid-cols-2 gap-3 text-[10px] font-mono text-gray-500"><span>Plan: {comparison.plannedSets} sets / {comparison.plannedReps} reps</span><span className="text-right">Workout: {comparison.actualSets} sets / {comparison.actualReps} reps</span></div>
                            </div>
                        </div>
                                </>
                            );
                        })()}
                    </div>
                </div>
            )}
        </div>
    );
}

export default TraineeHistory;