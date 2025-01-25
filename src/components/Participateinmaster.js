import React, { useEffect, useState } from 'react';

const Participateinmaster = () => {
    const [participate, setparticipate] = useState([]);

    useEffect(() => {
        // Fetch data from backend API
        fetch('http://localhost:5000/participateinmaster')
            .then((response) => response.json())
            .then((data) => setparticipate(data))
            .catch((err) => console.error('Error fetching data:', err));
    }, []);

    return (
        <div className="container mx-auto p-2 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-4 sm:mb-6">
                Participate Data
            </h1>

            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <div className="max-w-full overflow-x-scroll">
                    <table className="min-w-full table-auto border-collapse whitespace-nowrap">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-2 sm:px-4 py-2 border-b text-left">ID</th>
                                <th className="px-2 sm:px-4 py-2 border-b text-left">KM</th>
                                <th className="px-2 sm:px-4 py-2 border-b text-left">Status</th>
                                <th className="px-2 sm:px-4 py-2 border-b text-left">Entry By</th>
                                <th className="px-2 sm:px-4 py-2 border-b text-left">Entry Date</th>
                                <th className="px-2 sm:px-4 py-2 border-b text-left">Update By</th>
                                <th className="px-2 sm:px-4 py-2 border-b text-left">Update Date</th>
                                <th className="px-2 sm:px-4 py-2 border-b text-left">Start Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {participate.length > 0 ? (
                                participate.map((entry) => (
                                    <tr key={entry.participateinID} className="hover:bg-gray-50 text-sm sm:text-base">
                                        <td className="px-2 sm:px-4 py-2 border-b">{entry.participateinID}</td>
                                        <td className="px-2 sm:px-4 py-2 border-b">{entry.km}</td>
                                        <td className="px-2 sm:px-4 py-2 border-b">
                                            {entry.isactive === 1 ? 'Active' : 'Inactive'}
                                        </td>
                                        <td className="px-2 sm:px-4 py-2 border-b">{entry.entryby}</td>
                                        <td className="px-2 sm:px-4 py-2 border-b">
                                            {new Date(entry.entrydate).toLocaleDateString()}
                                        </td>
                                        <td className="px-2 sm:px-4 py-2 border-b">{entry.updateby}</td>
                                        <td className="px-2 sm:px-4 py-2 border-b">
                                            {new Date(entry.updatedate).toLocaleDateString()}
                                        </td>
                                        <td className="px-2 sm:px-4 py-2 border-b">{entry.StartTime}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center py-4 text-gray-500">
                                        No data found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Participateinmaster;