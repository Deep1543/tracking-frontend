import React, { useState, useEffect } from 'react';
import api from '../axios';

const Startline = () => {
    const [StartlineData, setStartlineData] = useState([]);

    useEffect(() => {
        api.get('/startline')
            .then((response) => {
                console.log("API Full Response:", response); // Logs full response
                console.log("API Data:", response.data); // Logs actual data
                setStartlineData(response.data);
            })
            .catch((err) => console.error('Error fetching data:', err));
    }, []);


    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Startline Data</h1>

            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-blue-600 text-gray-700">
                        <tr>
                            <th className="px-4 py-2 border-b text-left">Log ID</th>
                            <th className="px-4 py-2 border-b text-left">RFID</th>
                            <th className="px-4 py-2 border-b text-left">Log Time</th>
                            <th className="px-4 py-2 border-b text-left">Race Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {StartlineData.length > 0 ? (
                            StartlineData.map((Startline) => (
                                <tr key={Startline.logid} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border-b">{Startline.logid}</td>
                                    <td className="px-4 py-2 border-b">{Startline.rfid}</td>
                                    <td className="px-4 py-2 border-b">{Startline.logtime}</td>
                                    <td className="px-4 py-2 border-b">{Startline.racetime}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-gray-500">No data found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Startline;
