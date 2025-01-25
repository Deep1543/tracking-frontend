import React, { useState, useEffect } from 'react';

const Usermaster = () => {
    const [UsermasterData, setUsermasterData] = useState([]);

    useEffect(() => {
        // Fetch data from backend API
        fetch('http://localhost:5000/usermaster')
            .then((response) => response.json())
            .then((data) => setUsermasterData(data))
            .catch((err) => console.error('Error fetching data:', err));
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold text-center text-black mb-6">Usermaster Data</h1>

            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-blue-500 text-black">
                        <tr>
                            <th className="px-4 py-2 border-b text-left">User ID</th>
                            <th className="px-4 py-2 border-b text-left">User Name</th>
                            <th className="px-4 py-2 border-b text-left">Password</th>
                            <th className="px-4 py-2 border-b text-left">Is Active</th>
                            <th className="px-4 py-2 border-b text-left">Checkpoint Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {UsermasterData.length > 0 ? (
                            UsermasterData.map((Usermaster) => (
                                <tr key={Usermaster.userid} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border-b">{Usermaster.userid}</td>
                                    <td className="px-4 py-2 border-b">{Usermaster.username}</td>
                                    <td className="px-4 py-2 border-b">{Usermaster.password}</td>
                                    <td className="px-4 py-2 border-b">
                                        {Usermaster.isactive === 1 ? 'Active' : 'Inactive'}
                                    </td>
                                    <td className="px-4 py-2 border-b">{Usermaster.checkpointname}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-black">No data found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Usermaster;
