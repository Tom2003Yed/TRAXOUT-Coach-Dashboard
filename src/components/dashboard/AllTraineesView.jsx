import React, { useState } from 'react';
import TopHeader from '../bars/TopHeader';
import { trainees } from '../../data/trainees';

const ageOptions = [
    { value: 'ALL', label: 'All ages' },
    { value: '18-24', label: '18-24' },
    { value: '25-29', label: '25-29' },
    { value: '30-35', label: '30-35' }
];

const defaultFilters = { gender: 'ALL', ageRange: 'ALL' };

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

function AllTraineesView() {
    const [cardFilters, setCardFilters] = useState({
        rating: defaultFilters,
        duration: defaultFilters,
        adherence: defaultFilters,
        efficacy: defaultFilters,
        leaderboard: defaultFilters
    });
    const updateCardFilters = (card, filters) => setCardFilters((current) => ({ ...current, [card]: filters }));
    const ratingGroup = filterTrainees(cardFilters.rating);
    const durationGroup = filterTrainees(cardFilters.duration);
    const adherenceGroup = filterTrainees(cardFilters.adherence);
    const efficacyGroup = filterTrainees(cardFilters.efficacy);
    const leaderboardGroup = filterTrainees(cardFilters.leaderboard);
    const rating = (average(ratingGroup.map((trainee) => trainee.score)) / 20).toFixed(1);
    const duration = Math.round(35 + average(durationGroup.map((trainee) => trainee.score)) / 2);
    const adherence = adherenceGroup.length ? Math.round((adherenceGroup.filter((trainee) => trainee.status === 'ACTIVE').length / adherenceGroup.length) * 100) : 0;
    const efficacyBars = ['SQUAT', 'DEADLIFT', 'BENCH', 'CURL', 'CALF'].map((name, index) => ({
        name,
        value: `${Math.max(12, Math.min(96, Math.round(35 + average(efficacyGroup.map((trainee) => trainee.score)) / 2 + index * 5)))}%`
    }));
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
                    <CardFilters filters={cardFilters.efficacy} onChange={(filters) => updateCardFilters('efficacy', filters)} />

                    {/* Chart Mock Visual */}
                    <div className="h-48 flex items-end justify-between gap-4 pt-8 px-4 border-b border-gray-800/80 pb-4">
                        {efficacyBars.map((bar, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                                <div className="w-full bg-cyan-500/20 hover:bg-cyan-500/40 rounded-t-lg transition-all" style={{ height: bar.value }}></div>
                                <span className="text-[10px] font-mono text-gray-500">{bar.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#121418] border border-gray-800/80 rounded-2xl p-6 shadow-xl">
                    <h3 className="text-base font-bold text-white mb-4">Global Leaderboards</h3>
                    <CardFilters filters={cardFilters.leaderboard} onChange={(filters) => updateCardFilters('leaderboard', filters)} />
                    <div className="space-y-3">
                        {leaderboard.map((user, index) => (
                            <div key={user.id} className="p-3 bg-[#181b20] rounded-xl border border-gray-800/50 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-mono font-bold text-cyan-400">{String(index + 1).padStart(2, '0')}</span>
                                    <div>
                                        <div className="text-xs font-bold text-white">{user.name}</div>
                                        <div className="text-[9px] font-mono text-gray-500">{user.tier}</div>
                                    </div>
                                </div>
                                <span className="text-sm font-black font-mono text-white">{user.score}</span>
                            </div>
                        ))}
                        {!leaderboard.length && <p className="text-xs font-mono text-gray-500">No trainees match these filters.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllTraineesView;