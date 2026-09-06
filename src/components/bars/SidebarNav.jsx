import React from 'react';
import { NavLink } from 'react-router-dom';

function SidebarNav() {
    const navItems = [
        { name: 'Brief', path: '/', icon: '🎛️' },
        { name: 'Trainees', path: '/trainees', icon: '📂' },
        { name: 'Analytics', path: '/analytics', icon: '📈' },
        { name: 'Traxout Value', path: '/value', icon: '⭐' },
    ];

    return (
        <aside className="w-64 bg-[#0d0f12] border-r border-gray-800/80 p-5 flex flex-col justify-between shrink-0 h-screen sticky top-0 font-sans text-left" dir="ltr">
            <div>
                {/* Brand Header */}
                <div className="mb-8 px-2">
                    <h1 className="text-xl font-black text-cyan-400 tracking-wider">Traxout</h1>
                    <h2 className="text-xs font-bold text-white tracking-widest uppercase">Performance HQ</h2>
                    <p className="text-[10px] text-gray-500 font-mono mt-0.5">Elite Performance Data</p>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-1.5">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border ${
                                    isActive
                                        ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] font-semibold'
                                        : 'text-gray-400 border-transparent hover:bg-[#181b20] hover:text-gray-200'
                                }`
                            }
                        >
                            <span className="text-base">{item.icon}</span>
                            <span>{item.name}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Bottom Actions & Profile */}
            <div className="space-y-4 pt-4 border-t border-gray-800/80">
                <button className="w-full py-2.5 px-4 bg-[#181b20] hover:bg-[#22262d] border border-gray-800 text-cyan-400 rounded-xl text-xs font-mono tracking-wider uppercase transition-colors flex items-center justify-center gap-2">
                    <span>📥</span> Export Global Data
                </button>

                <div className="flex items-center gap-3 px-2 pt-2">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-xs font-bold text-cyan-400 font-mono">
                        CP
                    </div>
                    <div>
                        <div className="text-xs font-bold text-white">Coach Profile</div>
                        <div className="text-[10px] text-gray-500 font-mono">System Admin</div>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default SidebarNav;