import React from 'react';

function TraxoutOverview() {

    const totalTrainees = 124;

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-10 shadow-sm text-center max-w-md w-full">
                <h2 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">
                    Total Traxout Active Users
                </h2>

                <div className="text-6xl font-extrabold text-gray-900 my-4">
                    {totalTrainees}
                </div>

                <p className="text-gray-600 text-sm">
                    Trainees currently tracked by Traxout system
                </p>
            </div>
        </div>
    )
}

export default TraxoutOverview