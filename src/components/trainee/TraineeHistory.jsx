import React, { useState } from 'react';

const temporaryTraineeProfile = {
    height: '180 cm',
    weight: '78 kg',
    age: 24,
    gender: 'Male'
};

const temporaryWorkoutHistory = [
    {
        id: 'w1',
        title: 'Chest & Triceps Focus',
        date: '2026-08-01',
        duration: '55 mins',
        targetMuscles: ['Pectoralis Major', 'Triceps Brachii', 'Anterior Deltoids'],
        details: {
            exerciseType: 'Hypertrophy / Compound',
            totalSets: 16,
            totalReps: 140,
            workRestRatio: '1:2',
            restTimes: '90 sec avg'
        }
    },
    {
        id: 'w2',
        title: 'Back & Biceps Day',
        date: '2026-07-29',
        duration: '62 mins',
        targetMuscles: ['Latissimus Dorsi', 'Biceps Brachii', 'Rhomboids'],
        details: {
            exerciseType: 'Strength & Hypertrophy',
            totalSets: 18,
            totalReps: 150,
            workRestRatio: '1:2.5',
            restTimes: '120 sec avg'
        }
    },
    {
        id: 'w3',
        title: 'Legs & Core',
        date: '2026-07-27',
        duration: '48 mins',
        targetMuscles: ['Quadriceps', 'Hamstrings', 'Glutes', 'Abs'],
        details: {
            exerciseType: 'Strength',
            totalSets: 14,
            totalReps: 110,
            workRestRatio: '1:3',
            restTimes: '150 sec avg'
        }
    }
];

function TraineeHistory() {
    const [selectedWorkout, setSelectedWorkout] = useState(null);

    return (
        <div className="space-y-6">
            {/* Trainee Profile Summary */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
                    Trainee Profile
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                        <span className="text-xs text-gray-400 block">Height</span>
                        <span className="text-lg font-bold text-gray-800">{temporaryTraineeProfile.height}</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                        <span className="text-xs text-gray-400 block">Weight</span>
                        <span className="text-lg font-bold text-gray-800">{temporaryTraineeProfile.weight}</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                        <span className="text-xs text-gray-400 block">Age</span>
                        <span className="text-lg font-bold text-gray-800">{temporaryTraineeProfile.age}</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                        <span className="text-xs text-gray-400 block">Gender</span>
                        <span className="text-lg font-bold text-gray-800">{temporaryTraineeProfile.gender}</span>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Workout History</h3>

                <div className="space-y-4">
                    {temporaryWorkoutHistory.map((workout) => (
                        <div key={workout.id} className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:border-gray-300 transition-all">
                            <div className="flex flex-wrap justify-between items-start gap-4 mb-3">
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900">{workout.title}</h4>
                                    <span className="text-xs text-gray-500">{workout.date}</span>
                                </div>
                                <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full">
                                    Duration: {workout.duration}
                                </span>
                            </div>

                            {/* Muscles Worked */}
                            <div className="mb-4">
                                <span className="text-xs font-medium text-gray-400 block mb-1">Targeted Muscles:</span>
                                <div className="flex flex-wrap gap-1.5">
                                    {workout.targetMuscles.map((muscle, idx) => (
                                        <span key={idx} className="bg-gray-50 text-gray-700 text-xs px-2.5 py-1 rounded-md border border-gray-200">
                                            {muscle}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Details Toggle Button */}
                            <button
                                onClick={() => setSelectedWorkout(selectedWorkout === workout.id ? null : workout.id)}
                                className="text-sm font-semibold text-black hover:underline inline-flex items-center gap-1"
                            >
                                {selectedWorkout === workout.id ? 'Hide Details' : 'View Details'}
                            </button>

                            {selectedWorkout === workout.id && (
                                <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 md:grid-cols-5 gap-3 bg-gray-50 p-4 rounded-lg">
                                    <div>
                                        <span className="text-xs text-gray-400 block">Exercise Type</span>
                                        <span className="text-xs font-semibold text-gray-800">{workout.details.exerciseType}</span>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-400 block">Total Sets</span>
                                        <span className="text-xs font-semibold text-gray-800">{workout.details.totalSets}</span>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-400 block">Total Reps</span>
                                        <span className="text-xs font-semibold text-gray-800">{workout.details.totalReps}</span>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-400 block">Work / Rest Ratio</span>
                                        <span className="text-xs font-semibold text-gray-800">{workout.details.workRestRatio}</span>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-400 block">Rest Times</span>
                                        <span className="text-xs font-semibold text-gray-800">{workout.details.restTimes}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TraineeHistory;