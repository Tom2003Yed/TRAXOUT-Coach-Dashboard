import React from 'react';
import TopHeader from '../bars/TopHeader';

function BriefView() {
    const priorityTrainees = [
        {
            id: 'TR-8924',
            name: 'Marcus Jensen',
            status: 'CRITICAL',
            triggers: ['Missed 4 consecutive days', 'Volume dropped 35% weekly']
        },
        {
            id: 'TR-4412',
            name: 'Elena Rodriguez',
            status: 'AT RISK',
            triggers: ['HRV indicates under-recovery', 'Reported high RPE on light day']
        },
        {
            id: 'TR-1099',
            name: 'David Chen',
            status: 'AT RISK',
            triggers: ['Load progression stalled (3 wks)']
        }
    ];

    const milestones = [
        { icon: '🏆', text: 'Sarah Jenkins hit a new 1RM on Back Squat.', sub: '105 KG • 2 hours ago' },
        { icon: '⚡', text: 'James O\'Connor completed 14-day streak.', sub: 'Consistency Metric • 5 hours ago' },
        { icon: '📈', text: 'Team Alpha average recovery score increased.', sub: '+12% WoW • Yesterday' }
    ];

    return (
        <div className="p-8 font-sans text-left min-h-screen bg-[#0d0f12]" dir="ltr">
            <TopHeader title="Dashboard Overview" />

            {/* Top Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#121418] border border-gray-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-2">
                        Total Active Trainees
                    </span>
                    <div className="text-5xl font-black text-white font-mono mb-2">142</div>
                    <span className="text-xs text-emerald-400 font-mono">📈 +8.4% vs last week</span>
                </div>

                <div className="bg-[#121418] border border-rose-500/30 rounded-2xl p-6 shadow-xl col-span-2 flex items-center justify-between">
                    <div>
                        <h3 className="text-base font-bold text-white flex items-center gap-2 mb-1">
                            <span className="text-rose-400">⚠️</span> Early Alert System
                        </h3>
                        <p className="text-xs text-gray-400 font-mono">Immediate intervention required for flagged athletes</p>
                    </div>

                    <div className="flex gap-4">
                        <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-xl text-center min-w-[100px]">
                            <span className="text-[10px] font-mono text-rose-400 uppercase block">Critical Risk</span>
                            <span className="text-2xl font-black text-rose-400 font-mono">3</span>
                        </div>
                        <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl text-center min-w-[100px]">
                            <span className="text-[10px] font-mono text-amber-400 uppercase block">At Risk</span>
                            <span className="text-2xl font-black text-amber-400 font-mono">8</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Priority Interventions */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">Priority Interventions</h3>
                    <span className="text-xs font-mono text-cyan-400">● LIVE FEED</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {priorityTrainees.map((trainee) => (
                        <div key={trainee.id} className="bg-[#121418] border border-gray-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <h4 className="text-base font-bold text-white">{trainee.name}</h4>
                                        <span className="text-[10px] font-mono text-gray-500">ID: {trainee.id}</span>
                                    </div>
                                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                                        trainee.status === 'CRITICAL' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                    }`}>
                                        {trainee.status}
                                    </span>
                                </div>

                                <div className="space-y-1.5 mb-6">
                                    <span className="text-[10px] font-mono uppercase text-gray-500 block">Detection Triggers</span>
                                    {trainee.triggers.map((trigger, idx) => (
                                        <p key={idx} className="text-xs text-gray-300 font-mono flex items-center gap-1.5">
                                            <span>📉</span> {trigger}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button className="flex-1 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-xl text-xs font-mono transition-colors">
                                    Message Client
                                </button>
                                <button className="flex-1 py-2 bg-[#181b20] hover:bg-[#22262d] text-gray-300 border border-gray-800 rounded-xl text-xs font-mono transition-colors">
                                    Modify Program
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Milestones & System Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-[#121418] border border-gray-800/80 rounded-2xl p-6 shadow-xl">
                    <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider mb-4">
                        Recent Trainee Milestones
                    </h3>
                    <div className="space-y-3">
                        {milestones.map((item, idx) => (
                            <div key={idx} className="p-3.5 bg-[#181b20] rounded-xl border border-gray-800/50 flex items-center gap-4">
                                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center text-base shrink-0">
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-200">{item.text}</p>
                                    <span className="text-[10px] font-mono text-gray-500">{item.sub}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#121418] border border-gray-800/80 rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-xl mb-3 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                        ⚙️
                    </div>
                    <h4 className="text-sm font-bold text-white">System Optimal</h4>
                    <p className="text-xs text-gray-500 font-mono mt-1 leading-relaxed">
                        All tracking nodes reporting seamlessly. No system latency detected.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default BriefView;