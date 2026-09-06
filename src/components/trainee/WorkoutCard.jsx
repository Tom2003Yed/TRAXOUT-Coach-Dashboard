import React from 'react';

const musclePositions = {
    CHEST: { top: '31%', left: '50%' },
    BACK: { top: '31%', left: '50%' },
    SHOULDERS: { top: '25%', left: '35%' },
    BICEPS: { top: '35%', left: '35%' },
    TRICEPS: { top: '35%', left: '65%' },
    FOREARMS: { top: '44%', left: '33%' },
    TRAPS: { top: '24%', left: '50%' },
    LATS: { top: '36%', left: '42%' },
    CORE: { top: '42%', left: '50%' },
    GLUTES: { top: '53%', left: '50%' },
    QUADS: { top: '65%', left: '43%' },
    HAMSTRINGS: { top: '65%', left: '57%' },
    CALVES: { top: '82%', left: '43%' },
    LEGS: { top: '67%', left: '50%' },
    FULL: { top: '45%', left: '50%' }
};

function WorkoutCard({ title, date, duration, ratio, restTimes, exerciseType, type, image, bodyImage, muscles = [], isExpanded, onToggle }) {
    return (
        <div className="bg-[#181b20] border border-gray-800/80 hover:border-cyan-500/40 rounded-2xl p-5 shadow-lg transition-all font-sans text-left" dir="ltr">
            {bodyImage && <div className="relative h-56 mb-4 rounded-xl overflow-hidden border border-gray-800 bg-[#0f1316]"><img src={bodyImage} alt={'view of human body showing trained muscles'} className="w-full h-full object-contain object-center opacity-80" /></div>}
            <div className="flex items-center gap-4 mb-3">
                {image && <img src={image} alt={title} className="w-16 h-16 rounded-lg object-cover border border-gray-700" />}
                <div className="flex-1 flex items-center justify-between gap-3">
                    <div><h4 className="text-base font-bold text-white">{title}</h4><span className="text-[11px] font-mono text-gray-500">{date}</span></div>
                    <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded uppercase">
                        {type || 'Workout'}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 py-3 border-y border-gray-800/80 my-3 font-mono text-xs sm:grid-cols-3">
                <div>
                    <span className="text-[10px] text-gray-500 block">DURATION</span>
                    <span className="text-white font-bold">{duration || '0 min'}</span>
                </div>
                <div>
                    <span className="text-[10px] text-gray-500 block">WORK / REST</span>
                    <span className="text-cyan-400 font-bold">{ratio || '1:2'}</span>
                </div>
                <div><span className="text-[10px] text-gray-500 block">REST TIMES</span><span className="text-white font-bold">{restTimes || 'Not set'}</span></div>
                <div><span className="text-[10px] text-gray-500 block">WORKOUT TYPE</span><span className="text-white font-bold">{exerciseType || type || 'Workout'}</span></div>
            </div>

            <div className="mb-3"><span className="text-[10px] text-gray-500 block font-mono uppercase">Muscles Worked</span><span className="text-xs font-mono text-red-300">{muscles.length ? muscles.join(' • ') : 'Not set'}</span></div>

            <button onClick={onToggle} className="w-full py-2 bg-[#121418] hover:bg-cyan-500/10 text-gray-300 hover:text-cyan-400 border border-gray-800 hover:border-cyan-500/30 rounded-xl text-xs font-mono transition-colors">
                {isExpanded ? 'Hide Full Details' : 'View Full Details'}
            </button>
        </div>
    );
}

export default WorkoutCard;