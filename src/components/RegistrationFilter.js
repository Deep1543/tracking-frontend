import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../axios";

const RegistrationFilter = () => {
    // State to store registration data
    const [registrations, setRegistrations] = useState([]);
    const [filteredRegistrations, setFilteredRegistrations] = useState([]);
    const [error, setError] = useState(null);

    // Filter states
    const [filters, setFilters] = useState({
        categoryid: "",
        gender: "",
        year: ""
    });

    // Fetch registration data from the backend
    useEffect(() => {
        api
            .get("/registration")
            .then((response) => {
                console.log("API Response",response.data)
                setRegistrations(response.data);
                setFilteredRegistrations(response.data);
            })
            .catch((err) => {
                console.error("Error fetching registration data:", err);
                setError("Failed to load data. Please try again later.");
            });
    }, []);

    // Apply filters to the registrations data
    useEffect(() => {
        const filteredData = registrations.filter((registration) => {
            return (
                (filters.categoryid ? (parseInt(filters.categoryid) >= 2 && parseInt(filters.categoryid) <= 6) && registration.categoryid === parseInt(filters.categoryid) : true) &&
                (filters.gender ? registration.gender === filters.gender : true) &&
                (filters.year ? new Date(registration.entrydate).getFullYear() === parseInt(filters.year) : true)
            );
        });

        setFilteredRegistrations(filteredData);
    }, [filters, registrations]);

    // Handle filter change
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    return (
        
        <div className=" container mx-auto p-6   bg-blue-200 ">
            <h1 className="text-xl md:text-3xl font-semibold text-center text-gray-800 mb-4 md:mb-6">
                Registration Details
            </h1>

            {error && <p className="text-red-600 text-center mb-4">{error}</p>}

            {/* Responsive Filter Section */}
            <div className="mb-4 md:mb-6 flex flex-col md:flex-row flex-wrap gap-2 md:gap-4">
                <div className="flex items-center w-full md:w-auto">
                    <label className="w-24 md:w-auto md:mr-2 text-sm md:text-base">Category:</label>
                    <select
                        name="categoryid"
                        value={filters.categoryid}
                        onChange={handleFilterChange}
                        className="flex-1 md:flex-none border px-2 py-1 rounded text-sm md:text-base"
                    >
                        <option value="">All Categories</option>
                        <option value="2">Category 2</option>
                        <option value="3">Category 3</option>
                        <option value="4">Category 4</option>
                        <option value="5">Category 5</option>
                        <option value="6">Category 6</option>
                    </select>
                </div>

                <div className="flex items-center w-full md:w-auto">
                    <label className="w-24 md:w-auto md:mr-2 text-sm md:text-base">Gender:</label>
                    <select
                        name="gender"
                        value={filters.gender}
                        onChange={handleFilterChange}
                        className="flex-1 md:flex-none border px-2 py-1 rounded text-sm md:text-base"
                    >
                        <option value="">All Genders</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div className="flex items-center w-full md:w-auto">
                    <label className="w-24 md:w-auto md:mr-2 text-sm md:text-base">Year:</label>
                    <select
                        name="year"
                        value={filters.year}
                        onChange={handleFilterChange}
                        className="flex-1 md:flex-none border px-2 py-1 rounded text-sm md:text-base"
                    >
                        <option value="">All Years</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                    </select>
                </div>
            </div>

            {/* Responsive Table Container */}
            <div className="flex-1 min-h-0 bg-white rounded-lg shadow-md">
                {filteredRegistrations.length > 0 ? (
                    <div className="h-full overflow-hidden">
                        {/* Mobile View - Card Layout */}
                        <div className="block md:hidden">
                            <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
                                {filteredRegistrations.map((registration) => (
                                    <div key={registration.registrationid} 
                                         className="p-4 border-b hover:bg-gray-50">
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="text-gray-600 text-sm">Registration ID:</div>
                                            <div className="text-sm">{registration.registrationid}</div>
                                            
                                            <div className="text-gray-600 text-sm">Name:</div>
                                            <div className="text-sm">{registration.name}</div>
                                            
                                            <div className="text-gray-600 text-sm">Bib No:</div>
                                            <div className="text-sm">{registration.bibno}</div>
                                            
                                            <div className="text-gray-600 text-sm">Gender:</div>
                                            <div className="text-sm">{registration.gender}</div>
                                            
                                            <div className="text-gray-600 text-sm">DOB:</div>
                                            <div className="text-sm">{new Date(registration.dob).toLocaleDateString()}</div>
                                            
                                            <div className="text-gray-600 text-sm">City:</div>
                                            <div className="text-sm">{registration.city}</div>
                                            
                                            <div className="text-gray-600 text-sm">Contact:</div>
                                            <div className="text-sm">{registration.contactno}</div>
                                            
                                            <div className="text-gray-600 text-sm">Category:</div>
                                            <div className="text-sm">{registration.categoryid}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Desktop View - Table Layout */}
                        <div className="hidden md:block">
                            <div className="overflow-x-auto">
                                <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 220px)" }}>
                                    <table className="min-w-full table-auto border-collapse">
                                        <thead className="sticky top-0 bg-blue-500 text-white">
                                            <tr>
                                                <th className="px-3 py-2 text-sm border-b">ID</th>
                                                <th className="px-3 py-2 text-sm border-b">Bib No</th>
                                                <th className="px-3 py-2 text-sm border-b">Name</th>
                                                <th className="px-3 py-2 text-sm border-b">Gender</th>
                                                <th className="px-3 py-2 text-sm border-b">Date of Birth</th>
                                                <th className="px-3 py-2 text-sm border-b">City</th>
                                                <th className="px-3 py-2 text-sm border-b">Email</th>
                                                <th className="px-3 py-2 text-sm border-b">Contact</th>
                                                <th className="px-3 py-2 text-sm border-b">Emergency</th>
                                                <th className="px-3 py-2 text-sm border-b">T-Shirt</th>
                                                <th className="px-3 py-2 text-sm border-b">Event</th>
                                                <th className="px-3 py-2 text-sm border-b">Status</th>
                                                <th className="px-3 py-2 text-sm border-b">Entry Date</th>
                                                <th className="px-3 py-2 text-sm border-b">Category</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredRegistrations.map((registration) => (
                                                <tr key={registration.registrationid} className="hover:bg-gray-50">
                                                    <td className="px-3 py-2 text-sm border-b">{registration.registrationid}</td>
                                                    <td className="px-3 py-2 text-sm border-b">{registration.bibno}</td>
                                                    <td className="px-3 py-2 text-sm border-b">{registration.name}</td>
                                                    <td className="px-3 py-2 text-sm border-b">{registration.gender}</td>
                                                    <td className="px-3 py-2 text-sm border-b">{new Date(registration.dob).toLocaleDateString()}</td>
                                                    <td className="px-3 py-2 text-sm border-b">{registration.city}</td>
                                                    <td className="px-3 py-2 text-sm border-b">{registration.email}</td>
                                                    <td className="px-3 py-2 text-sm border-b">{registration.contactno}</td>
                                                    <td className="px-3 py-2 text-sm border-b">{registration.emergencyno}</td>
                                                    <td className="px-3 py-2 text-sm border-b">{registration.tshirtsize}</td>
                                                    <td className="px-3 py-2 text-sm border-b">{registration.participatein}</td>
                                                    <td className="px-3 py-2 text-sm border-b">{registration.isactive ? "Yes" : "No"}</td>
                                                    <td className="px-3 py-2 text-sm border-b">{new Date(registration.entrydate).toLocaleString()}</td>
                                                    <td className="px-3 py-2 text-sm border-b">{registration.categoryid}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 py-4">No data available for the selected filters.</p>
                )}
            </div>
        </div>
    );
};

export default RegistrationFilter;