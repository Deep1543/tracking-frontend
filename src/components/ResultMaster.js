import React, { useState, useEffect } from "react";
import api from "../axios";

const ResultMaster = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get("/resultmaster")
            .then((response) => {
                console.log("API Response:", response.data);
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError("Error fetching data");
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-center text-xl">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Race Results</h1>

            {Object.entries(data).length === 0 ? (
                <p className="text-center text-gray-600">No results found.</p>
            ) : (
                Object.entries(data).map(([category, ageGroups]) => (
                    <div key={category} className="mb-10">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">{category}</h2>

                        {Object.entries(ageGroups).map(([ageGroup, genderData]) => (
                            <div key={ageGroup} className="mb-8">
                                <h3 className="text-xl font-bold bg-white text-black p-2 rounded-md">
                                    {category} - {ageGroup} Age Group
                                </h3>

                                {["Male", "Female"].map((gender) =>
                                    genderData[gender] && genderData[gender].length > 0 ? (
                                        <div key={gender} className="mb-6">
                                            <h3 className="text-lg font-bold bg-white text-black p-2 rounded-md">
                                                {ageGroup} - {gender}
                                            </h3>
                                            <table className="w-full border-collapse border border-gray-300 mt-2">
                                                <thead>
                                                    <tr className="bg-gray-200 text-left">
                                                        <th className="border border-gray-400 p-2">Bib No</th>
                                                        <th className="border border-gray-400 p-2">Name</th>
                                                        <th className="border border-gray-400 p-2">Category</th>
                                                        <th className="border border-gray-400 p-2">Race Time</th>
                                                        <th className="border border-gray-400 p-2">Start Time</th>
                                                        <th className="border border-gray-400 p-2">Finish Time</th>
                                                        <th className="border border-gray-400 p-2">Overall Rank</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {genderData[gender].map((runner, index) => (
                                                        <tr key={index} className="text-center border border-gray-400">
                                                            <td className="p-2">{runner.bIBNo}</td>
                                                            <td className="p-2">{runner.name}</td>
                                                            <td className="p-2">{runner.category || "Uncategorized"}</td>
                                                            <td className="p-2">{runner.raceTime}</td>
                                                            <td className="p-2">{runner.startTime}</td>
                                                            <td className="p-2">{runner.finishTime}</td>
                                                            <td className="p-2">{runner.overall_rank}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : null
                                )}
                            </div>
                        ))}
                    </div>
                ))
            )}

            <p className="mt-4 text-gray-600">DNQ: Did Not Qualify ; DNF: Did Not Finish</p>
        </div>
    );
};

export default ResultMaster;
