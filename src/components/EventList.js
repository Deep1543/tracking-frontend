import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const Eventlist = () => {
    const [events, setEvents] = useState([]);
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [year, setYear] = useState("");
    const [city, setCity] = useState("");
    const [types, setTypes] = useState([]);
    const [years, setYears] = useState([]);
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchEvents = useCallback(async () => {
        setIsLoading(true);
        try {
            const queryParams = new URLSearchParams({
                ...(name && { name }),
                ...(type && { type }),
                ...(year && { year }),
                ...(city && { city }),
            });

            const res = await fetch(`http://localhost:5000/event_master?${queryParams}`);

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Failed to fetch events: ${res.status} ${errorText}`);
            }

            let data = await res.json();

            data = data.filter(event => {
                const nameMatch = !name || event.event_name.toLowerCase().includes(name.toLowerCase());
                const typeMatch = !type || event.event_type === type;
                const yearMatch = !year || event.event_year.toString() === year;
                const cityMatch = !city || event.event_city.toLowerCase().includes(city.toLowerCase());

                return nameMatch && typeMatch && yearMatch && cityMatch;
            });

            setEvents(data);

            if (data.length && types.length === 0) {
                setTypes([...new Set(data.map(event => event.event_type))].sort());
                setYears([...new Set(data.map(event => event.event_year))].sort((a, b) => b - a));
                setCities([...new Set(data.map(event => event.event_city))].sort());
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [name, type, year, city, types.length]);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    return (
        <div className="p-4">
            <form onSubmit={(e) => { e.preventDefault(); fetchEvents(); }} className="mb-4">
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Event Name"
                        className="border p-2"
                    />
                    <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2 border-gray-300">
                        <option value="">All Types</option>
                        {types.map((t) => (<option key={t} value={t}>{t}</option>))}
                    </select>
                    <select value={year} onChange={(e) => setYear(e.target.value)} className="border p-2">
                        <option value="">All Years</option>
                        {years.map((y) => (<option key={y} value={y}>{y}</option>))}
                    </select>
                    <select value={city} onChange={(e) => setCity(e.target.value)} className="border p-2">
                        <option value="">All Cities</option>
                        {cities.map((c) => (<option key={c} value={c}>{c}</option>))}
                    </select>
                </div>
                <button type="submit" className="w-full mt-4 bg-blue-500 text-white p-2">Search</button>
            </form>

            {isLoading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}

            {events.length === 0 ? (
                <p>No events found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border-b px-4 py-2 text-left">ID</th>
                                <th className="border-b px-4 py-2 text-left">Name</th>
                                <th className="border-b px-4 py-2 text-left">Date</th>
                                <th className="border-b px-4 py-2 text-left">City</th>
                                <th className="border-b px-4 py-2 text-left">Type</th>
                                <th className="border-b px-4 py-2 text-left">Year</th>
                                <th className="border-b px-4 py-2 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event, index) => (
                                <tr
                                    key={event.event_id || index}
                                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                                >
                                    <td className="border-b px-4 py-2">{event.event_id}</td>
                                    <td className="border-b px-4 py-2">{event.event_name}</td>
                                    <td className="border-b px-4 py-2">{event.event_date}</td>
                                    <td className="border-b px-4 py-2">{event.event_city}</td>
                                    <td className="border-b px-4 py-2">{event.event_type}</td>
                                    <td className="border-b px-4 py-2">{event.event_year}</td>
                                    <td className="border-b px-4 py-2 text-center">
                                        <button
                                            onClick={() => navigate(`/EventResults/${event.event_id}`, {
                                                state: { eventId: event.event_id, name: event.event_name }
                                            })}
                                            className="bg-blue-500 text-white px-3 py-1 rounded flex items-center justify-center"
                                        >
                                            <FontAwesomeIcon icon={faEye} className="mr-2" /> View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Eventlist;
