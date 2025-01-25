import React, { useState, useEffect } from 'react';

const Checkpoint5 = () => {
    const [checkpointData, setCheckpointData] = useState([]);

    useEffect(() => {
        // Fetch data from backend API
        fetch('http://localhost:5000/checkpoint5')
            .then((response) => response.json())
            .then((data) => setCheckpointData(data))
            .catch((err) => console.error('Error fetching data:', err));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Checkpoint Data</h1>
            <table className="min-w-full bg-white border border-gray-200 shadow-md">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left text-gray-700 font-medium">Log ID</th>
                        <th className="px-4 py-2 text-left text-gray-700 font-medium">RFID</th>
                        <th className="px-4 py-2 text-left text-gray-700 font-medium">Log Time</th>
                        <th className="px-4 py-2 text-left text-gray-700 font-medium">Race Time</th>
                        <th className="px-4 py-2 text-left text-gray-700 font-medium">Bib Number</th>
                        <th className="px-4 py-2 text-left text-gray-700 font-medium">Is Uploaded</th>
                    </tr>
                </thead>
                <tbody>
                    {checkpointData.length > 0 ? (
                        checkpointData.map((checkpoint) => (
                            <tr key={checkpoint.logid} className="border-t border-gray-200">
                                <td className="px-4 py-2 text-gray-900">{checkpoint.logid}</td>
                                <td className="px-4 py-2 text-gray-900">{checkpoint.rfid}</td>
                                <td className="px-4 py-2 text-gray-900">{checkpoint.logtime}</td>
                                <td className="px-4 py-2 text-gray-900">{checkpoint.racetime}</td>
                                <td className="px-4 py-2 text-gray-900">{checkpoint.bibno}</td>
                                <td className="px-4 py-2 text-gray-900">
                                    {checkpoint.IsUpload === 1 ? 'Uploaded' : 'Not Uploaded'}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center py-4 text-gray-500">No data found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Checkpoint5;
