import React, { useState } from 'react';

function TopHeader({ title }) {
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <>
            <header className="flex items-center justify-between pb-6 mb-6 border-b border-gray-800/80 font-sans text-left" dir="ltr">
                <h1 className="text-2xl font-bold text-white tracking-wide">{title}</h1>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search trainees, analytics..."
                            className="bg-[#121418] border border-gray-800/80 text-gray-200 text-xs rounded-xl pl-9 pr-4 py-2.5 w-64 focus:outline-none focus:border-cyan-500/50 font-mono"
                        />
                        <span className="absolute left-3 top-2.5 text-gray-500 text-xs">🔍</span>
                    </div>

                    <button type="button" onClick={() => setIsContactOpen(true)} aria-label="Open Traxout contact details" className="w-9 h-9 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center text-xs font-bold text-gray-300 font-mono hover:border-cyan-400 hover:text-cyan-400 transition-colors">
                        👤
                    </button>
                </div>
            </header>

            {isContactOpen && (
                <div role="dialog" aria-modal="true" aria-labelledby="contact-title" onClick={() => setIsContactOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm">
                    <div onClick={(event) => event.stopPropagation()} className="relative w-full max-w-md rounded-2xl border border-gray-700 bg-[#121418] p-6 shadow-2xl">
                        <button type="button" onClick={() => setIsContactOpen(false)} aria-label="Close contact details" className="absolute right-4 top-4 text-xl text-gray-400 hover:text-white">×</button>
                        <p className="mb-2 text-[10px] font-mono uppercase tracking-widest text-cyan-400">Traxout Support</p>
                        <h2 id="contact-title" className="mb-5 text-xl font-bold text-white">Contact Traxout</h2>
                        <div className="space-y-3 font-mono text-sm">
                            <div className="rounded-xl border border-gray-800 bg-[#181b20] p-3"><span className="block text-[10px] uppercase text-gray-500">Email</span><span className="text-gray-200">support@traxout.example</span></div>
                            <div className="rounded-xl border border-gray-800 bg-[#181b20] p-3"><span className="block text-[10px] uppercase text-gray-500">Phone</span><span className="text-gray-200">+1 (555) 014-2026</span></div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default TopHeader;