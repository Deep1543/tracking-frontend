import React, { useEffect, useState } from "react";
import axios from "axios";

const RegistrationsDisplay = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch registrations from the backend
    useEffect(() => {
        axios.get("http://localhost:5000/registrationdisplay")
            .then(response => {
                setRegistrations(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching registrations:", error);
                setError("Failed to fetch registrations");
                setLoading(false);
            });
    }, []);

    return (
        <div className="max-w-6xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">Registered Participants</h2>

            {loading ? (
                <p className="text-center text-gray-600">Loading registrations...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="p-3 border">#</th>
                                <th className="p-3 border">Name</th>
                                <th className="p-3 border">Email</th>
                                <th className="p-3 border">Mobile</th>
                                <th className="p-3 border">Gender</th>
                                <th className="p-3 border">DOB</th>
                                <th className="p-3 border">Ticket Type</th>
                                <th className="p-3 border">City</th>
                                <th className="p-3 border">State</th>
                                <th className="p-3 border">Country</th>
                                <th className="p-3 border">Blood Group</th>
                                <th className="p-3 border">Ticket Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registrations.map((user, index) => (
                                <tr key={user.id} className="text-center border-b hover:bg-gray-100">
                                    <td className="p-3 border">{index + 1}</td>
                                    <td className="p-3 border">{user.name}</td>
                                    <td className="p-3 border">{user.email}</td>
                                    <td className="p-3 border">{user.mobile}</td>
                                    <td className="p-3 border">{user.gender}</td>
                                    <td className="p-3 border">{user.dob}</td>
                                    <td className="p-3 border">{user.ticket_type}</td>
                                    <td className="p-3 border">{user.city}</td>
                                    <td className="p-3 border">{user.state}</td>
                                    <td className="p-3 border">{user.country}</td>
                                    <td className="p-3 border">{user.blood_group}</td>
                                    <td className="p-3 border">₹{user.ticket_amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default RegistrationsDisplay;
