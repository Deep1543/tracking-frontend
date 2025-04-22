import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../axios";

const RegistrationTable = () => {
    // State to store registration data
    const [registrations, setRegistrations] = useState([]);
    const [error, setError] = useState(null);

    // Fetch registration data from the backend
    useEffect(() => {
        api
            .get("/registration") // Update with your backend URL
            .then((response) => {
                console.log("API Response:", response.data)
                setRegistrations(response.data);
            })
            .catch((err) => {
                console.error("Error fetching registration data:", err);
                setError("Failed to load data. Please try again later.");
            });
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Registration Details</h1>

            {/* Display error message if any */}
            {error && <p className="text-red-600 text-center mb-4">{error}</p>}

            {/* Check if data exists */}
            {registrations.length > 0 ? (
                <div className="overflow-x-auto bg-beige rounded-lg shadow-md">
                    <table className="min-w-full table-auto border-collapse">
                        <thead>
                            <tr className="bg-blue-500 text-left">
                                <th className="px-4 py-2 border-b">Registration ID</th>
                                <th className="px-4 py-2 border-b">Bib No</th>
                                <th className="px-4 py-2 border-b">Name</th>
                                <th className="px-4 py-2 border-b">Gender</th>
                                <th className="px-4 py-2 border-b">Date of Birth</th>
                                <th className="px-4 py-2 border-b">City</th>
                                <th className="px-4 py-2 border-b">Email</th>
                                <th className="px-4 py-2 border-b">Contact No</th>
                                <th className="px-4 py-2 border-b">Emergency No</th>
                                <th className="px-4 py-2 border-b">T-Shirt Size</th>
                                <th className="px-4 py-2 border-b">Participate In</th>
                                <th className="px-4 py-2 border-b">Is Active</th>
                                <th className="px-4 py-2 border-b">Entry Date</th>
                                <th className="px-4 py-2 border-b">Category ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registrations.map((registration) => (
                                <tr key={registration.registrationid} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border-b">{registration.registrationid}</td>
                                    <td className="px-4 py-2 border-b">{registration.bibno}</td>
                                    <td className="px-4 py-2 border-b">{registration.name}</td>
                                    <td className="px-4 py-2 border-b">{registration.gender}</td>
                                    <td className="px-4 py-2 border-b">{new Date(registration.dob).toLocaleDateString()}</td>
                                    <td className="px-4 py-2 border-b">{registration.city}</td>
                                    <td className="px-4 py-2 border-b">{registration.email}</td>
                                    <td className="px-4 py-2 border-b">{registration.contactno}</td>
                                    <td className="px-4 py-2 border-b">{registration.emergencyno}</td>
                                    <td className="px-4 py-2 border-b">{registration.tshirtsize}</td>
                                    <td className="px-4 py-2 border-b">{registration.participatein}</td>
                                    <td className="px-4 py-2 border-b">{registration.isactive ? "Yes" : "No"}</td>
                                    <td className="px-4 py-2 border-b">{new Date(registration.entrydate).toLocaleString()}</td>
                                    <td className="px-4 py-2 border-b">{registration.categoryid}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-black mt-4">Loading registration data...</p>
            )}
        </div>
    );
};

export default RegistrationTable;
