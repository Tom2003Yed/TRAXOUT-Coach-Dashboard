import React, { useContext, useState } from 'react';
import Sidebar from '../bars/Sidebar';
import TraineeHistory from '../trainee/TraineeHistory';
import TraineeAnalytics from '../trainee/TraineeAnalytics';
import { AppContext } from '../../AppContext';

function SingleTraineeView() {
    const [activeTab, setActiveTab] = useState('history');
    const { selectedTraineeId } = useContext(AppContext);

    const getBtnClass = (tabName) =>
        `px-5 py-2.5 rounded-xl font-mono text-xs font-semibold tracking-wider transition-all duration-200 uppercase border ${
            activeTab === tabName
                ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                : 'bg-[#181b20] text-gray-400 border-gray-800/80 hover:bg-[#22262d] hover:text-gray-200'
        }`;

    return (
        <div className="flex flex-col lg:flex-row gap-8 p-6 md:p-8 max-w-7xl mx-auto min-h-[85vh]">
            <Sidebar />

            <main className="flex-1 bg-[#121418] p-6 md:p-8 rounded-2xl border border-gray-800/80 shadow-xl flex flex-col">
                {!selectedTraineeId ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-gray-800 rounded-2xl bg-[#181b20]/50">
                        <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center mb-4 text-2xl text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                            👤
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2">Select a Trainee Profile</h2>
                        <p className="text-gray-400 text-sm max-w-sm font-mono">
                            Choose an active athlete from the roster sidebar to inspect performance history and real-time metrics.
                        </p>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col">
                        <div className="flex items-center justify-between border-b border-gray-800/80 pb-6 mb-8">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setActiveTab('history')}
                                    className={getBtnClass('history')}
                                >
                                    Session History
                                </button>

                                <button
                                    onClick={() => setActiveTab('analytics')}
                                    className={getBtnClass('analytics')}
                                >
                                    Trainee Analytics
                                </button>
                            </div>

                            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full hidden sm:inline-block">
                                ● Last Synced 2m ago
                            </span>
                        </div>

                        <div className="flex-1">
                            {activeTab === 'history' && <TraineeHistory />}
                            {activeTab === 'analytics' && <TraineeAnalytics />}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default SingleTraineeView;