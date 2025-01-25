import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {FaSearch, FaChevronRight } from 'react-icons/fa';

const ResultPage = () => {
    const [searchTerm,] = useState('');
    const navigate = useNavigate();

    const tables = [
        { id: 1, name: 'CategoryMaster', icon: '📊', description: 'Manage race categories and age groups' },
        { id: 2, name: 'Checkpoint', icon: '🏁', description: 'Track race checkpoints and timing' },
        { id: 3, name: 'Finishline', icon: '🎯', description: 'Record race completion data' },
        { id: 4, name: 'Participateinmaster', icon: '👥', description: 'Manage race participants' },
        { id: 5, name: 'Racelogpoint1', icon: '📝', description: 'Track race progress points' },
        { id: 6, name: 'Startline', icon: '🏃', description: 'Manage race start data' },
        { id: 7, name: 'Usermaster', icon: '👤', description: 'User management system' },
        { id: 8, name: 'RegistrationFilter', icon: '📋', description: 'Race registration records' },
        { id: 9, name: 'EventList', icon: '📅', description: 'Event master' }
    ];

    const filteredTables = tables.filter(table =>
        table.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        table.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 p-0 mt-16 md:mt-20 lg:mt-24 shadow-md">
            {/* Main Content */}
            <main className="px-2 sm:px-4 md:px-6 lg:px-8 m-0">
                <div className="max-w-7xl mx-auto p-0 m-0">
                    {/* Grid Layout - Updated breakpoints and spacing */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 p-0 m-0">
                        {filteredTables.map((table) => (
                            <TableCard
                                key={table.id}
                                table={table}
                                onClick={() => navigate(`/${table.name}`)}
                            />
                        ))}
                    </div>

                    {/* No Results */}
                    {filteredTables.length === 0 && (
                        <NoResults searchTerm={searchTerm} />
                    )}
                </div>
            </main>
        </div>
    );
};

// Table Card Component - Updated for better responsiveness
const TableCard = ({ table, onClick }) => (
    <button
        onClick={onClick}
        className="group bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-lg p-4 sm:p-6 transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-blue-100 text-left w-full"
    >
        <div className="flex items-start space-x-3 sm:space-x-4">
            <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-300">
                {table.icon}
            </span>
            <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate mb-1">
                    {table.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                    {table.description}
                </p>
            </div>
            <FaChevronRight className="text-gray-400 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all duration-300" />
        </div>
    </button>
);

// NoResults Component - Updated for better spacing
const NoResults = ({ searchTerm }) => (
    <div className="text-center py-8 sm:py-12">
        <div className="inline-block p-3 sm:p-4 rounded-full bg-gray-100 mb-3 sm:mb-4">
            <FaSearch className="text-gray-400 text-xl sm:text-2xl" />
        </div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
            No tables found
        </h2>
        <p className="text-sm sm:text-base text-gray-500">
            No results found for "{searchTerm}". Try another search term.
        </p>
    </div>
);

export default ResultPage;
