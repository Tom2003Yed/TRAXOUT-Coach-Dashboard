import React, { useState } from 'react';
import TopHeader from '../bars/TopHeader';

function AllTraineesView() {
    const [filters, setFilters] = useState({ gender: 'All', ageRange: '18-35', weightRange: 'All' });

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
                        SYSTEM AVG RATING
                    </span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-white font-mono">4.8</span>
                        <span className="text-sm font-mono text-gray-500">/ 5.0</span>
                    </div>
                    <span className="text-xs text-emerald-400 font-mono mt-3 block">📈 +0.2 from last quarter</span>
                </div>

                <div className="bg-[#121418] border border-gray-800/80 rounded-2xl p-6 shadow-xl">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-2">
                        AVG WORKOUT DURATION
                    </span>
                    <div className="text-3xl font-black text-white font-mono">
                        42 <span className="text-sm text-gray-400 font-normal">MIN</span> 15 <span className="text-sm text-gray-400 font-normal">SEC</span>
                    </div>
                    <div className="flex gap-4 text-xs font-mono text-gray-500 mt-3">
                        <span>Weekly: 45m</span>
                        <span>Monthly: 41m</span>
                    </div>
                </div>

                <div className="bg-[#121418] border border-gray-800/80 rounded-2xl p-6 shadow-xl flex items-center justify-between">
                    <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-2">
                            PROGRAM ADHERENCE
                        </span>
                        <span className="text-4xl font-black text-white font-mono">92%</span>
                        <span className="text-xs text-cyan-400 font-mono block mt-2">OPTIMAL RANGE</span>
                    </div>
                    <div className="w-16 h-16 rounded-full border-4 border-cyan-400/30 border-t-cyan-400 flex items-center justify-center font-mono text-xs font-bold text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                        92%
                    </div>
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
                        <div className="flex gap-2">
                            <span className="text-[10px] font-mono bg-[#181b20] border border-gray-800 px-2.5 py-1 rounded text-gray-400">GENDER: ALL</span>
                            <span className="text-[10px] font-mono bg-[#181b20] border border-gray-800 px-2.5 py-1 rounded text-gray-400">AGE: 18-35</span>
                        </div>
                    </div>

                    {/* Chart Mock Visual */}
                    <div className="h-48 flex items-end justify-between gap-4 pt-8 px-4 border-b border-gray-800/80 pb-4">
                        {[
                            { name: 'SQUAT', val: '80%' },
                            { name: 'DEADLIFT', val: '65%' },
                            { name: 'BENCH', val: '90%' },
                            { name: 'CURL', val: '45%' },
                            { name: 'CALF', val: '20%' },
                        ].map((bar, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                                <div className="w-full bg-cyan-500/20 hover:bg-cyan-500/40 rounded-t-lg transition-all" style={{ height: bar.val }}></div>
                                <span className="text-[10px] font-mono text-gray-500">{bar.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#121418] border border-gray-800/80 rounded-2xl p-6 shadow-xl">
                    <h3 className="text-base font-bold text-white mb-4">Global Leaderboards</h3>
                    <div className="space-y-3">
                        {[
                            { rank: '01', name: 'Marcus J.', tier: 'ELITE TIER', score: '1,402' },
                            { rank: '02', name: 'Sarah K.', tier: 'PRO TIER', score: '1,385' },
                            { rank: '03', name: 'David L.', tier: 'PRO TIER', score: '1,290' },
                        ].map((user) => (
                            <div key={user.rank} className="p-3 bg-[#181b20] rounded-xl border border-gray-800/50 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-mono font-bold text-cyan-400">{user.rank}</span>
                                    <div>
                                        <div className="text-xs font-bold text-white">{user.name}</div>
                                        <div className="text-[9px] font-mono text-gray-500">{user.tier}</div>
                                    </div>
                                </div>
                                <span className="text-sm font-black font-mono text-white">{user.score}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllTraineesView;