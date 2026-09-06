import React from 'react';

function TraxoutOverview() {
    const totalTrainees = 142;

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-6">
            <div className="bg-[#121418] border border-gray-800/80 rounded-2xl p-10 shadow-2xl text-center max-w-md w-full relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl"></div>
                
                <span className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-[10px] font-mono tracking-widest uppercase mb-4">
                    HQ Operational Status
                </span>

                <h2 className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">
                    Total Active Trainees Tracked
                </h2>

                <div className="text-7xl font-black text-white font-mono my-6 shadow-cyan-500/20 drop-shadow-[0_0_25px_rgba(6,182,212,0.3)]">
                    {totalTrainees}
                </div>

                <p className="text-gray-500 text-xs font-mono leading-relaxed">
                    All tracking nodes reporting seamlessly. No system latency detected.
                </p>

                <div className="mt-8 pt-6 border-t border-gray-800/80 flex items-center justify-center gap-2 text-xs text-emerald-400 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    System Optimal (+8.4% vs last week)
                </div>
            </div>
        </div>
    )
}

export default TraxoutOverview;