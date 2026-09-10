import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TopHeader from '../bars/TopHeader';
import TraineeHistory from '../trainee/TraineeHistory';
import TraineeAnalytics from '../trainee/TraineeAnalytics';
import { AppContext } from '../../AppContext';

const ratingRanges = {
    YEAR: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'],
    QUARTER: ['W1', 'W3', 'W5', 'W7', 'W9', 'W12'],
    MONTH: ['1', '5', '10', '15', '20', '25', '30'],
    WEEK: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
};

const getRatingHistory = (score, range) => {
    const patterns = {
        YEAR: [-7, -5, -3, -4, -1, 0],
        QUARTER: [-4, -2, -3, -1, 1, 0],
        MONTH: [-3, -1, -2, 0, 1, 0, 2],
        WEEK: [-2, -1, 1, 0, 2, 1, 0]
    };

    return ratingRanges[range].map((label, index) => ({
        label,
        value: Math.min(100, Math.max(60, Number(score) + patterns[range][index]))
    }));
};

function TraineesView() {
    const location = useLocation();
    const { trainees, updateTraineeStatus } = useContext(AppContext);
    const [selectedTrainee, setSelectedTrainee] = useState(location.state?.trainee || trainees[0]);
    const [activeTab, setActiveTab] = useState('history');
    const [search, setSearch] = useState('');
    const [expandedImage, setExpandedImage] = useState(null);
    const [isRatingChartOpen, setIsRatingChartOpen] = useState(false);
    const [ratingRange, setRatingRange] = useState('MONTH');

    const visibleTrainees = trainees.filter((trainee) =>
        trainee.name.toLowerCase().includes(search.toLowerCase())
    );
    const ratingHistory = getRatingHistory(selectedTrainee.score, ratingRange);
    const chartMin = 60;
    const chartMax = 100;
    const chartWidth = 640;
    const chartHeight = 250;
    const chartPoints = ratingHistory
        .map((point, index) => {
            const x = (index / (ratingHistory.length - 1)) * chartWidth;
            const y = chartHeight - ((point.value - chartMin) / (chartMax - chartMin)) * chartHeight;
            return `${x},${y}`;
        })
        .join(' ');

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
                            {trainees.length} Active
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
                        <span>Total in roster: {trainees.length}</span>
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
                                    <select
                                        value={selectedTrainee.status}
                                        onChange={(event) => {
                                            const status = event.target.value;
                                            updateTraineeStatus(selectedTrainee.id, status);
                                            setSelectedTrainee({ ...selectedTrainee, status });
                                        }}
                                        aria-label={`Set risk status for ${selectedTrainee.name}`}
                                        className={`text-[10px] font-mono border px-2 py-1 rounded outline-none ${selectedTrainee.status === 'CRITICAL'
                                            ? 'text-rose-400 border-rose-500/30 bg-rose-500/10'
                                            : selectedTrainee.status === 'AT RISK'
                                                ? 'text-amber-400 border-amber-500/30 bg-amber-500/10'
                                                : 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
                                            }`}
                                    >
                                        <option value="ACTIVE" style={{ color: '#10b981', backgroundColor: '#ecfdf5' }}>
                                            Active Status
                                        </option>
                                        <option value="AT RISK" style={{ color: '#d97706', backgroundColor: '#fffbeb' }}>
                                            At Risk
                                        </option>
                                        <option value="CRITICAL" style={{ color: '#e11d48', backgroundColor: '#fff1f2' }}>
                                            Critical Risk
                                        </option>
                                    </select>
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
                            <button
                                onClick={() => setIsRatingChartOpen(true)}
                                className="mt-3 px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-[10px] font-mono text-cyan-300 hover:bg-cyan-500/20 transition-colors"
                            >
                                Click to view chart
                            </button>
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

            {isRatingChartOpen && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${selectedTrainee.name} rating history`}
                    onClick={() => setIsRatingChartOpen(false)}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
                >
                    <div
                        onClick={(event) => event.stopPropagation()}
                        className="w-full max-w-3xl rounded-2xl border border-cyan-500/30 bg-[#12191d] p-5 shadow-[0_0_40px_rgba(34,211,238,0.12)]"
                    >
                        <div className="flex items-start justify-between gap-4 mb-5">
                            <div>
                                <p className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">Rating History</p>
                                <h3 className="mt-1 text-xl font-bold text-white">{selectedTrainee.name}</h3>
                            </div>
                            <button
                                onClick={() => setIsRatingChartOpen(false)}
                                aria-label="Close rating chart"
                                className="w-8 h-8 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-cyan-400"
                            >
                                ×
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-5">
                            {Object.keys(ratingRanges).map((range) => (
                                <button
                                    key={range}
                                    onClick={() => setRatingRange(range)}
                                    className={`px-3 py-1.5 rounded-lg text-[10px] font-mono transition-colors ${ratingRange === range
                                        ? 'bg-cyan-300 text-[#071014]'
                                        : 'border border-gray-700 bg-[#181b20] text-gray-400 hover:border-cyan-500/50 hover:text-cyan-300'
                                        }`}
                                >
                                    {range}
                                </button>
                            ))}
                        </div>

                        <div className="overflow-x-auto rounded-xl border border-gray-800 bg-[#0d1215] p-3">
                            <svg viewBox={`0 0 ${chartWidth} ${chartHeight + 36}`} className="min-w-[560px] w-full h-64" role="img" aria-label={`${ratingRange.toLowerCase()} rating chart`}>
                                {[60, 70, 80, 90, 100].map((value) => {
                                    const y = chartHeight - ((value - chartMin) / (chartMax - chartMin)) * chartHeight;
                                    return (
                                        <g key={value}>
                                            <line x1="0" y1={y} x2={chartWidth} y2={y} stroke="#27343b" strokeDasharray="4 6" />
                                            <text x="0" y={y - 5} fill="#718096" fontSize="11" fontFamily="monospace">{value}</text>
                                        </g>
                                    );
                                })}
                                <polyline points={chartPoints} fill="none" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                {ratingHistory.map((point, index) => {
                                    const x = (index / (ratingHistory.length - 1)) * chartWidth;
                                    const y = chartHeight - ((point.value - chartMin) / (chartMax - chartMin)) * chartHeight;
                                    return (
                                        <g key={point.label}>
                                            <circle cx={x} cy={y} r="6" fill="#12191d" stroke="#67e8f9" strokeWidth="3" />
                                            <text x={x} y={chartHeight + 25} textAnchor="middle" fill="#718096" fontSize="11" fontFamily="monospace">{point.label}</text>
                                        </g>
                                    );
                                })}
                            </svg>
                        </div>
                        <div className="flex items-center justify-between mt-4 text-[10px] font-mono text-gray-500">
                            <span>Rating scale: 60 - 100</span>
                            <span className="text-cyan-300">Current: {selectedTrainee.score}/100</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TraineesView;