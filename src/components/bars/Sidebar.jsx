import React, { useContext } from 'react';
import { AppContext } from '../../AppContext';

function Sidebar() {
    const { selectedTraineeId, setSelectedTraineeId } = useContext(AppContext);

    const mockTrainees = [
        { id: '1', name: 'Israel Israeli' },
        { id: '2', name: 'Danny Dean' },
        { id: '3', name: 'Gal Noah' },
    ];

    return (
        <aside className="w-72 bg-white border border-gray-200 rounded-2xl p-5 shrink-0 shadow-sm">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-3">
                Trainees List
            </h2>
            <div className="flex flex-col gap-2">
                {mockTrainees.map((trainee, index) => {
                    const isSelected = selectedTraineeId === trainee.id;
                    return (
                        <button
                            key={trainee.id}
                            onClick={() => setSelectedTraineeId(trainee.id)}
                            className={`w-full text-right px-4 py-3 rounded-xl font-medium transition-all duration-150 ${isSelected
                                ? 'bg-black text-white shadow-sm'
                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            <span>{trainee.name}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${isSelected ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-600'}`}>
                                #{index + 1}
                            </span>
                        </button>
                    );
                })}
            </div>
        </aside>
    )
}

export default Sidebar