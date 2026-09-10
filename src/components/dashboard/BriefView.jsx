import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopHeader from '../bars/TopHeader';
import { useAppContext } from '../../AppContext';

function BriefView() {
    const navigate = useNavigate();
    const { trainees } = useAppContext();
    const alertTrainees = trainees.filter((trainee) => trainee.status !== 'ACTIVE');

    const priorityTrainees = trainees.filter((trainee) => trainee.status === 'CRITICAL');
    const alertCounts = {
        CRITICAL: alertTrainees.filter((trainee) => trainee.status === 'CRITICAL').length,
        'AT RISK': alertTrainees.filter((trainee) => trainee.status === 'AT RISK').length
    };

    const [tooltip, setTooltip] = useState(null);
    const [contactTraineeId, setContactTraineeId] = useState(null);
    const hideTooltipTimer = useRef(null);
    const contactContainerRef = useRef(null);

    useEffect(() => {
        if (!contactTraineeId) {
            return undefined;
        }

        const closeOnOutsideClick = (event) => {
            if (!contactContainerRef.current?.contains(event.target)) {
                setContactTraineeId(null);
            }
        };

        document.addEventListener('mousedown', closeOnOutsideClick);
        return () => document.removeEventListener('mousedown', closeOnOutsideClick);
    }, [contactTraineeId]);

    const showTooltip = (event, status) => {
        const tooltipWidth = 280;
        const tooltipHeight = status === 'CRITICAL' ? 210 : 360;
        window.clearTimeout(hideTooltipTimer.current);
        setTooltip({
            status,
            x: Math.min(event.clientX + 18, window.innerWidth - tooltipWidth - 12),
            y: Math.min(event.clientY + 18, window.innerHeight - tooltipHeight - 12)
        });
    };

    const keepTooltipOpen = () => {
        window.clearTimeout(hideTooltipTimer.current);
    };

    const hideTooltip = () => {
        hideTooltipTimer.current = window.setTimeout(() => setTooltip(null), 250);
    };

    const hoveredTrainees = tooltip
        ? alertTrainees
            .filter((trainee) => trainee.status === tooltip.status)
            .sort((first, second) => first.name.localeCompare(second.name))
        : [];

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
                        <div
                            className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-xl text-center min-w-[100px] cursor-help"
                            onMouseEnter={(event) => showTooltip(event, 'CRITICAL')}
                            onMouseLeave={hideTooltip}
                        >
                            <span className="text-[10px] font-mono text-rose-400 uppercase block">Critical Risk</span>
                            <span className="text-2xl font-black text-rose-400 font-mono">{alertCounts.CRITICAL}</span>
                        </div>
                        <div
                            className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl text-center min-w-[100px] cursor-help"
                            onMouseEnter={(event) => showTooltip(event, 'AT RISK')}
                            onMouseLeave={hideTooltip}
                        >
                            <span className="text-[10px] font-mono text-amber-400 uppercase block">At Risk</span>
                            <span className="text-2xl font-black text-amber-400 font-mono">{alertCounts['AT RISK']}</span>
                        </div>
                    </div>
                </div>
            </div>

            {tooltip && (
                <div
                    className={`fixed z-50 w-[280px] rounded-xl bg-[#121418] p-3 shadow-2xl pointer-events-auto ${
                        tooltip.status === 'CRITICAL' ? 'border border-rose-500/50' : 'border border-amber-500/50'
                    }`}
                    style={{ left: tooltip.x, top: tooltip.y }}
                    onMouseEnter={keepTooltipOpen}
                    onMouseLeave={hideTooltip}
                >
                    <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-mono uppercase tracking-widest ${
                            tooltip.status === 'CRITICAL' ? 'text-rose-400' : 'text-amber-400'
                        }`}>
                            {tooltip.status === 'CRITICAL' ? 'Critical Risk' : 'At Risk'}
                        </span>
                        <span className="text-[10px] font-mono text-gray-500">{hoveredTrainees.length} athletes</span>
                    </div>
                    <div className="space-y-1.5 max-h-[320px] overflow-y-auto">
                        {hoveredTrainees.map((trainee) => (
                            <button
                                key={trainee.id}
                                type="button"
                                onClick={() => {
                                    setTooltip(null);
                                    navigate('/trainees', {
                                        state: { trainee }
                                    });
                                }}
                                className="flex w-full items-center gap-2 rounded-lg bg-[#181b20] px-2 py-1.5 text-left hover:bg-[#22262d]"
                            >
                                <img className="h-8 w-8 rounded-full object-cover" src={trainee.image} alt="" />
                                <span className="text-xs font-semibold text-gray-200">{trainee.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

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
                                        <div className="flex min-w-0 items-center gap-2">
                                            <img
                                                src={trainee.image}
                                                alt={`${trainee.name} profile`}
                                                className="h-10 w-10 shrink-0 rounded-full border border-gray-700 object-cover"
                                            />
                                            <div className="min-w-0">
                                                <h4 className="text-base font-bold text-white">{trainee.name}</h4>
                                                <span className="text-[10px] font-mono text-gray-500">ID: {trainee.id}</span>
                                            </div>
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
                                <div
                                    ref={contactTraineeId === trainee.id ? contactContainerRef : null}
                                    className="relative flex-1"
                                >
                                    <button
                                        type="button"
                                        onClick={() => setContactTraineeId(trainee.id)}
                                        className="w-full py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-xl text-xs font-mono transition-colors"
                                    >
                                        Message Client
                                    </button>
                                    {contactTraineeId === trainee.id && (
                                        <div className="absolute bottom-full left-0 z-20 mb-2 w-64 rounded-xl border border-cyan-500/40 bg-[#121418] p-3 text-left shadow-2xl">
                                            <div className="mb-2 flex items-center justify-between">
                                                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
                                                    Client Contact
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => setContactTraineeId(null)}
                                                    aria-label="Close client contact details"
                                                    className="text-lg leading-none text-gray-500 hover:text-white"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                            <div className="space-y-1.5 text-xs font-mono text-gray-300">
                                                <p><span className="text-gray-500">Email:</span> {trainee.email}</p>
                                                <p><span className="text-gray-500">Phone:</span> {trainee.phone}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <button className="flex-1 py-2 bg-[#181b20] hover:bg-[#22262d] text-gray-300 border border-gray-800 rounded-xl text-xs font-mono transition-colors">
                                    Modify Program
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Trainee Milestones */}
            <div className="bg-[#121418] border border-gray-800/80 rounded-2xl p-6 shadow-xl">
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
        </div>
    );
}

export default BriefView;