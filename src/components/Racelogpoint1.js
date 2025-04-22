import React, { useState, useEffect } from 'react';
import api from '../axios';
const Finishline = () => {
    const [FinishlineData, setFinishlineData] = useState([]);

    useEffect(() => {
        // Fetch data from backend API
        api.get('/finishline')
            .then((response) => {
                console.log("API Response:", response.data);
                setFinishlineData(response.data); // Ensure response.data is an array
            })
            .catch((err) => console.error('Error fetching data:', err));
    }, []);

    return (
        <div className="container mx-auto p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-4 sm:mb-6">
                Finishline Data
            </h1>

            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <div className="max-w-full">
                    <table className="min-w-full table-auto border-collapse">
                        <thead className="bg-blue-600 text-gray-700">
                            <tr>
                                <th className="px-2 sm:px-4 py-2 border-b text-left text-sm sm:text-base">
                                    Log ID
                                </th>
                                <th className="px-2 sm:px-4 py-2 border-b text-left text-sm sm:text-base">
                                    RFID
                                </th>
                                <th className="px-2 sm:px-4 py-2 border-b text-left text-sm sm:text-base">
                                    Log Time
                                </th>
                                <th className="px-2 sm:px-4 py-2 border-b text-left text-sm sm:text-base">
                                    Race Time
                                </th>
                                <th className="px-2 sm:px-4 py-2 border-b text-left text-sm sm:text-base">
                                    Bib Number
                                </th>
                                <th className="px-2 sm:px-4 py-2 border-b text-left text-sm sm:text-base">
                                    Is Uploaded
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {FinishlineData.length > 0 ? (
                                FinishlineData.map((finishline) => (
                                    <tr key={finishline.logid} className="hover:bg-gray-50">
                                        <td className="px-2 sm:px-4 py-2 border-b text-sm sm:text-base">
                                            {finishline.logid}
                                        </td>
                                        <td className="px-2 sm:px-4 py-2 border-b text-sm sm:text-base">
                                            {finishline.rfid}
                                        </td>
                                        <td className="px-2 sm:px-4 py-2 border-b text-sm sm:text-base">
                                            {finishline.logtime}
                                        </td>
                                        <td className="px-2 sm:px-4 py-2 border-b text-sm sm:text-base">
                                            {finishline.racetime}
                                        </td>
                                        <td className="px-2 sm:px-4 py-2 border-b text-sm sm:text-base">
                                            {finishline.bibno}
                                        </td>
                                        <td className="px-2 sm:px-4 py-2 border-b text-sm sm:text-base">
                                            {finishline.IsUpload === 1 ? 'Uploaded' : 'Not Uploaded'}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td 
                                        colSpan="6" 
                                        className="text-center py-4 text-gray-500 text-sm sm:text-base"
                                    >
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

export default Finishline;