import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkpoint = () => {
    const [selectedCheckpoint, setSelectedCheckpoint] = useState('');
    const navigate = useNavigate();

    const handleCheckpointRedirect = () => {
        if (selectedCheckpoint) {
            navigate(`/${selectedCheckpoint}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <h1 className="text-2xl font-bold text-gray-800 mb-8">Select a Checkpoint</h1>
            <div className="w-full sm:w-1/2 md:w-1/3">
                <select
                    value={selectedCheckpoint}
                    onChange={(e) => setSelectedCheckpoint(e.target.value)}
                    className="px-4 py-2 w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                >
                    <option value="">Select Checkpoint</option>
                    <option value="Checkpoint1">Checkpoint 1</option>
                    <option value="Checkpoint2">Checkpoint 2</option>
                    <option value="Checkpoint3">Checkpoint 3</option>
                    <option value="Checkpoint4">Checkpoint 4</option>
                    <option value="Checkpoint5">Checkpoint 5</option>
                </select>
            </div>
            <button
                onClick={handleCheckpointRedirect}
                disabled={!selectedCheckpoint}
                className={`mt-4 px-6 py-3 bg-blue-600 text-white font-medium rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${!selectedCheckpoint ? 'cursor-not-allowed opacity-50' : ''
                    }`}
            >
                Go to Checkpoint
            </button>
        </div>
    );
};

export default Checkpoint;
