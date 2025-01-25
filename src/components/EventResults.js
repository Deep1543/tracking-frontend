import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const EventResults = () => {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bibSearch, setBibSearch] = useState('');
  const { event_id } = useParams();
  const location = useLocation();
  const eventName = location.state?.name || 'Event Results';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/results/${event_id}`);
        if (!response.ok) throw new Error('Failed to fetch results');
        const data = await response.json();
        setResults(data);
        setFilteredResults(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [event_id]);

  const handleBibSearch = (e) => {
    e.preventDefault();
    if (bibSearch.trim() === '') {
      setFilteredResults(results);
    } else {
      const filtered = results.filter(result =>
        result.bibno.toString().includes(bibSearch.trim())
      );
      setFilteredResults(filtered);
    }
  };

  const handleViewCertificate = async (bibno) => {
    navigate("/Racetimes", {
      state: {
        bibno: bibno,
        autoGenerate: true,
        fromResults: true,
        event_id: event_id
      }
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">{eventName}</h1>

        {/* Search Form */}
        <form onSubmit={handleBibSearch} className="mb-8">
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="text"
              value={bibSearch}
              onChange={(e) => setBibSearch(e.target.value)}
              placeholder="Search by Bib Number"
              className="border border-gray-300 rounded-lg p-3 flex-grow shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-200 shadow-sm"
            >
              Search
            </button>
          </div>
        </form>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Bib No</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Finish Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredResults.map((result) => (
                  <tr
                    key={result.bibno}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">{result.bibno}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{result.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{result.categoryid}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{result.finishtime || 'Not finished'}</td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => handleViewCertificate(result.bibno)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200 flex items-center gap-2"
                        title="View/Download Certificate"
                      >
                        <FontAwesomeIcon icon={faEye} />
                        View Certificate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredResults.length === 0 && (
          <div className="text-center mt-8 p-6 bg-white rounded-lg shadow-md">
            <p className="text-gray-500">No results found</p>
          </div>
        )}

        {loading && (
          <div className="text-center mt-8">
            <div className="inline-block px-4 py-2 bg-white rounded-lg shadow-md">
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center mt-8">
            <div className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventResults;
