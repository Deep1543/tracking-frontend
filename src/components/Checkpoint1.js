import React, { useState, useEffect } from "react";
import api from "../axios";
import * as XLSX from "xlsx"; // Import SheetJS for Excel

const Checkpoint1 = () => {
    const [checkpointData, setCheckpointData] = useState([]);

    useEffect(() => {
        api.get("/checkpoint1")
            .then((response) => {
                console.log("Fetched Data:", response.data); // Debugging
                setCheckpointData(response.data);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
            });
    }, []);

    // Function to Export Data to Excel
    const exportToExcel = () => {
        if (checkpointData.length === 0) {
            alert("No data available to export!");
            return;
        }

        // Define the worksheet and workbook
        const worksheet = XLSX.utils.json_to_sheet(checkpointData);
        const workbook = XLSX.utils.book_new();

        // Append worksheet to workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Checkpoint Data");

        // Save the Excel file
        XLSX.writeFile(workbook, "Checkpoint1_Data.xlsx");
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkpoint 1 Data</h1>

            {/* Export to Excel Button */}
            <button
                onClick={exportToExcel}
                className="mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
                Export to Excel
            </button>

            <div className="overflow-x-auto w-full max-w-6xl bg-white shadow rounded-lg">
                <table className="table-auto w-full">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="px-4 py-2 text-left">Log ID</th>
                            <th className="px-4 py-2 text-left">RFID</th>
                            <th className="px-4 py-2 text-left">Log Time</th>
                            <th className="px-4 py-2 text-left">Race Time</th>
                            <th className="px-4 py-2 text-left">Bib Number</th>
                            <th className="px-4 py-2 text-left">Is Uploaded</th>
                        </tr>
                    </thead>
                    <tbody>
                        {checkpointData.length > 0 ? (
                            checkpointData.map((checkpoint) => (
                                <tr
                                    key={checkpoint.logid}
                                    className="odd:bg-gray-100 even:bg-gray-200 hover:bg-gray-300 transition"
                                >
                                    <td className="px-4 py-2">{checkpoint.logid}</td>
                                    <td className="px-4 py-2">{checkpoint.rfid}</td>
                                    <td className="px-4 py-2">{checkpoint.logtime}</td>
                                    <td className="px-4 py-2">{checkpoint.racetime}</td>
                                    <td className="px-4 py-2">{checkpoint.bibno}</td>
                                    <td className="px-4 py-2">
                                        {checkpoint.IsUpload === 1 ? "Uploaded" : "Not Uploaded"}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-4 py-2 text-center text-gray-700">
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

export default Checkpoint1;
