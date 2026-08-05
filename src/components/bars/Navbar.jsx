import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('/');

    const getLinkClass = (path) =>
        `px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === path
            ? 'bg-black text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`;
    return (
        <div>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div
                    onClick={() => {
                        setActiveTab('/');
                        navigate('/');
                    }}
                    className="text-xl font-bold tracking-wide cursor-pointer"
                >
                    Traxout
                </div>

                <div className="flex gap-4">
                    <Link
                        to="/"
                        onClick={() => setActiveTab('/')}
                        className={getLinkClass('/')}
                    >
                        All Trainees
                    </Link>

                    <Link
                        to="/single"
                        onClick={() => setActiveTab('/single')}
                        className={getLinkClass('/single')}
                    >
                        Single Trainee
                    </Link>

                    <Link
                        to="/traxout"
                        onClick={() => setActiveTab('/traxout')}
                        className={getLinkClass('/traxout')}
                    >
                        Traxout Overview
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar