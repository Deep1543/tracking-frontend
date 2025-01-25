import React, { useState, useEffect } from 'react';

const Finishline = () => {
    const [FinishlineData, setFinishlineData] = useState([]);

    useEffect(() => {
        // Fetch data from backend API
        fetch('http://localhost:5000/finishline')
            .then((response) => response.json())
            .then((data) => setFinishlineData(data))
            .catch((err) => console.error('Error fetching data:', err));
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Finishline Data</h1>
            <div className="overflow-x-auto">
                <table className="table-auto border-collapse w-full text-sm bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-blue-600 border-b border-gray-300">
                            <th className="py-2 px-4 text-left text-gray-600 font-semibold">Log ID</th>
                            <th className="py-2 px-4 text-left text-gray-600 font-semibold">RFID</th>
                            <th className="py-2 px-4 text-left text-gray-600 font-semibold">Log Time</th>
                            <th className="py-2 px-4 text-left text-gray-600 font-semibold">Race Time</th>
                            <th className="py-2 px-4 text-left text-gray-600 font-semibold">Bib Number</th>
                            <th className="py-2 px-4 text-left text-gray-600 font-semibold">Is Uploaded</th>
                        </tr>
                    </thead>
                    <tbody>
                        {FinishlineData.length > 0 ? (
                            FinishlineData.map((Finishline) => (
                                <tr key={Finishline.logid} className="border-b hover:bg-gray-50">
                                    <td className="py-2 px-4">{Finishline.logid}</td>
                                    <td className="py-2 px-4">{Finishline.rfid}</td>
                                    <td className="py-2 px-4">{Finishline.logtime}</td>
                                    <td className="py-2 px-4">{Finishline.racetime}</td>
                                    <td className="py-2 px-4">{Finishline.bibno}</td>
                                    <td className="py-2 px-4">
                                        {Finishline.IsUpload === 1 ? (
                                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-600 rounded">
                                                Uploaded
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-600 rounded">
                                                Not Uploaded
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="py-4 text-center text-gray-500">
                                    No data found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Finishline;
