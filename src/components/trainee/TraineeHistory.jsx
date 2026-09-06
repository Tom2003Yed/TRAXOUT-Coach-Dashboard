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

const workoutProfiles = {
    male: [
        {
            id: 'strength',
            title: 'Lower Body Power',
            date: 'Oct 24, 08:30 AM',
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

function TraineeHistory({ profile }) {
    const [selectedWorkouts, setSelectedWorkouts] = useState(new Set());
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
                                    isExpanded={isExpanded}
                                    onToggle={toggleWorkout}
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
                                                                <th className="pb-2">KG</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-gray-800/50 text-gray-300">
                                                            {exercise.sets.map((set) => (
                                                                <tr key={set.set}>
                                                                    <td className="py-2">{set.set}</td>
                                                                    <td className="py-2 text-cyan-400">{set.actual}</td>
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
        </div>
    );
}

export default TraineeHistory;