import React, { useState } from 'react';
import TopHeader from '../bars/TopHeader';
import TraineeHistory from '../trainee/TraineeHistory';
import TraineeAnalytics from '../trainee/TraineeAnalytics';

const trainees = [
    {
        id: 'TR-8924',
        name: 'Marcus Sterling',
        tier: 'Sprinter • Pro',
        score: 92,
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=160&q=80',
        height: '188 cm',
        weight: '84.5 kg',
        age: 24,
        gender: 'M',
    },
    {
        id: 'TR-4412',
        name: 'Elena Rodriguez',
        tier: 'Endurance • Elite',
        score: 88,
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80',
        height: '172 cm',
        weight: '64 kg',
        age: 27,
        gender: 'F',
    },
    {
        id: 'TR-1099',
        name: 'David Chen',
        tier: 'Strength • Pro',
        score: 85,
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
        height: '181 cm',
        weight: '91 kg',
        age: 29,
        gender: 'M',
    },
    {
        id: 'TR-2301',
        name: 'Sarah Jenkins',
        tier: 'CrossFit • Tier 1',
        score: 91,
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80',
        height: '168 cm',
        weight: '62 kg',
        age: 26,
        gender: 'F',
    },
    {
        id: 'TR-7782',
        name: "James O'Connor",
        tier: 'Triathlete • Pro',
        score: 79,
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80',
        height: '184 cm',
        weight: '78 kg',
        age: 31,
        gender: 'M',
    },
];

function TraineesView() {
    const [selectedTrainee, setSelectedTrainee] = useState(trainees[0]);
    const [activeTab, setActiveTab] = useState('history');
    const [search, setSearch] = useState('');
    const [expandedImage, setExpandedImage] = useState(null);

    const visibleTrainees = trainees.filter((trainee) =>
        trainee.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#0d0f12] font-sans text-left" dir="ltr">
            <div className="px-8 pt-8">
                <TopHeader title={`Trainee Profile: ${selectedTrainee.name}`} />
            </div>

            <div className="flex flex-col lg:flex-row gap-6 px-6 pb-8">
                {/* Sidebar / Roster Navigation */}
                <aside className="lg:w-64 shrink-0 bg-[#101318] border border-gray-800/80 rounded-2xl p-3 h-fit lg:sticky lg:top-6">
                    <div className="flex items-center justify-between px-2 mb-3">
                        <h2 className="text-[11px] font-black uppercase tracking-widest text-gray-300">
                            Trainees Roster
                        </h2>
                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-1 rounded">
                            5 Active
                        </span>
                    </div>

                    <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Filter athletes..."
                        className="w-full bg-[#181b20] border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-200 placeholder:text-gray-600 outline-none focus:border-cyan-500/50 mb-3"
                    />

                    <div className="space-y-2">
                        {visibleTrainees.map((trainee) => {
                            const isSelected = selectedTrainee.id === trainee.id;

                            return (
                                <div
                                    key={trainee.id}
                                    className={`w-full text-left p-2.5 rounded-lg border transition-colors ${isSelected
                                        ? 'border-cyan-400/60 bg-cyan-500/10'
                                        : 'border-gray-800/70 bg-[#15181d] hover:border-gray-700'
                                        }`}
                                >
                                    <button
                                        onClick={() => {
                                            setSelectedTrainee(trainee);
                                            setActiveTab('history');
                                        }}
                                        className="w-full text-left"
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <span
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    setExpandedImage(trainee);
                                                }}
                                                className="cursor-zoom-in"
                                            >
                                                <img
                                                    src={trainee.image}
                                                    alt={trainee.name}
                                                    className="w-8 h-8 rounded-lg object-cover border border-gray-700"
                                                />
                                            </span>
                                            <span className="min-w-0 flex-1">
                                                <strong className="block truncate text-xs text-gray-200">
                                                    {trainee.name}
                                                </strong>
                                                <small className="block truncate text-[10px] text-gray-500">
                                                    {trainee.tier}
                                                </small>
                                            </span>
                                            <span className="text-[10px] font-mono text-gray-300">
                                                {trainee.score}
                                            </span>
                                        </div>
                                    </button>

                                    <div className="grid grid-cols-2 gap-1 mt-2">
                                        <button
                                            onClick={() => {
                                                setSelectedTrainee(trainee);
                                                setActiveTab('analytics');
                                            }}
                                            className={`text-center py-1 rounded text-[10px] font-mono ${isSelected && activeTab === 'analytics'
                                                ? 'bg-cyan-300 text-[#071014]'
                                                : 'border border-cyan-500/20 text-cyan-400'
                                                }`}
                                        >
                                            Analytics
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedTrainee(trainee);
                                                setActiveTab('history');
                                            }}
                                            className={`text-center py-1 rounded text-[10px] font-mono ${isSelected && activeTab === 'history'
                                                ? 'bg-cyan-300 text-[#071014]'
                                                : 'border border-gray-700 text-gray-400'
                                                }`}
                                        >
                                            History
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex justify-between text-[10px] font-mono text-gray-500 border-t border-gray-800 mt-4 pt-3">
                        <span>Total in roster: 24</span>
                        <span className="text-cyan-400">+ Add Trainee</span>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 min-w-0">
                    {/* Header Info Cards */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-6">
                        <div className="xl:col-span-2 bg-[#12191d] border border-gray-700/80 rounded-xl p-5 flex items-center gap-5">
                            <button
                                onClick={() => setExpandedImage(selectedTrainee)}
                                aria-label={`Open ${selectedTrainee.name} photo`}
                                className="cursor-zoom-in"
                            >
                                <img
                                    src={selectedTrainee.image}
                                    alt={selectedTrainee.name}
                                    className="w-28 h-28 rounded-xl object-cover border-2 border-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.25)]"
                                />
                            </button>

                            <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h2 className="text-3xl font-black text-white">{selectedTrainee.name}</h2>
                                    <span className="text-[10px] font-mono text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 rounded">
                                        Active Status
                                    </span>
                                </div>
                                <p className="text-xs font-mono tracking-widest text-cyan-400 mt-1 uppercase">
                                    {selectedTrainee.tier}
                                </p>

                                <div className="flex flex-wrap gap-4 mt-5 text-xs font-mono text-gray-400">
                                    <span>
                                        Height: <b className="text-white">{selectedTrainee.height}</b>
                                    </span>
                                    <span>
                                        Weight: <b className="text-white">{selectedTrainee.weight}</b>
                                    </span>
                                    <span>
                                        Age: <b className="text-white">{selectedTrainee.age} yrs</b>
                                    </span>
                                    <span>
                                        Gender: <b className="text-white">{selectedTrainee.gender}</b>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#12191d] border border-cyan-500/20 rounded-xl p-5 flex flex-col items-center justify-center">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
                                Trainee Baseline Rating
                            </span>
                            <div className="w-28 h-28 rounded-full border-[10px] border-cyan-300/90 border-l-cyan-500/20 flex flex-col items-center justify-center mt-2 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                                <b className="text-4xl text-white font-mono">{selectedTrainee.score}</b>
                                <small className="text-[10px] font-mono text-cyan-400">/100</small>
                            </div>
                            <span className="text-[11px] text-emerald-400 font-mono mt-3">
                                ↗ +3 pts since last evaluation
                            </span>
                        </div>
                    </div>

                    {/* View Toggle Tabs */}
                    <div className="flex gap-2 border-b border-gray-800 pb-3 mb-6">
                        <button
                            onClick={() => setActiveTab('analytics')}
                            className={`px-5 py-2 rounded-lg text-xs font-mono font-semibold ${activeTab === 'analytics'
                                ? 'bg-cyan-300 text-[#071014]'
                                : 'bg-[#181b20] text-gray-400 border border-gray-800'
                                }`}
                        >
                            Analytics
                        </button>
                        <button
                            onClick={() => setActiveTab('history')}
                            className={`px-5 py-2 rounded-lg text-xs font-mono font-semibold ${activeTab === 'history'
                                ? 'bg-cyan-300 text-[#071014]'
                                : 'bg-[#181b20] text-gray-400 border border-gray-800'
                                }`}
                        >
                            Training History
                        </button>
                    </div>

                    {/* Active View Display */}
                    {activeTab === 'history' ? (
                        <TraineeHistory profile={selectedTrainee} />
                    ) : (
                        <TraineeAnalytics traineeName={selectedTrainee.name} />
                    )}
                </main>
            </div>

            {/* Enlarged Image Modal */}
            {expandedImage && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${expandedImage.name} photo`}
                    onClick={() => setExpandedImage(null)}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-6 backdrop-blur-sm"
                >
                    <div
                        onClick={(event) => event.stopPropagation()}
                        className="relative w-[420px] max-w-full flex flex-col items-center"
                    >
                        <button
                            onClick={() => setExpandedImage(null)}
                            aria-label="Close photo"
                            className="absolute -top-12 right-0 w-9 h-9 rounded-full bg-white/10 text-white text-xl hover:bg-white/20"
                        >
                            ×
                        </button>
                        <img
                            src={expandedImage.image}
                            alt={`${expandedImage.name} enlarged`}
                            className="w-full max-h-[82vh] rounded-2xl border-2 border-cyan-300 shadow-[0_0_45px_rgba(34,211,238,0.3)] object-cover"
                        />
                        <p className="mt-3 text-sm font-mono text-white bg-black/60 px-3 py-1 rounded">
                            {expandedImage.name}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TraineesView;