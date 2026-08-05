import React, { useContext, useState } from 'react';
import Sidebar from '../bars/Sidebar';
import TraineeHistory from '../trainee/TraineeHistory';
import TraineeAnalytics from '../trainee/TraineeAnalytics';
import { AppContext } from '../../AppContext';

function SingleTraineeView() {
    const [activeTab, setActiveTab] = useState('history');
    const { selectedTraineeId } = useContext(AppContext);

    const getBtnClass = (tabName) =>
        `px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === tabName
            ? 'bg-black text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`;

    return (
        <div className="flex gap-8 p-8 max-w-7xl mx-auto min-h-[85vh]">
            <Sidebar />

            <main className="flex-1 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col">
                {!selectedTraineeId ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-gray-200 rounded-xl">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-2xl text-gray-400">
                            👤
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Select a Trainee</h2>
                        <p className="text-gray-500 max-w-sm">
                            Please choose a trainee from the list on the side to view their history and analytics.
                        </p>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col">
                        <div className="flex justify-center gap-6 mb-8 border-b pb-6">
                            <button
                                onClick={() => setActiveTab('history')}
                                className={getBtnClass('history')}
                            >
                                Trainee History
                            </button>

                            <button
                                onClick={() => setActiveTab('analytics')}
                                className={getBtnClass('analytics')}
                            >
                                Trainee Analytics
                            </button>
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