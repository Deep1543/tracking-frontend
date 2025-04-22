import React, { useEffect, useState } from 'react';
import api from '../axios';

const CategoryMaster = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/categorymaster')
      .then((response) => {
        console.log("Fetched Data:", response.data);
        setCategories(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Fetch Error:", err.response ? err.response.data : err.message);
        setError('Failed to fetch categories');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center text-blue-500 font-bold">Loading...</div>;
  if (error) return <div className="text-center text-red-500 font-bold">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Category Master</h1>

      {categories.length > 0 ? (
        categories.map((category, index) => (
          <div key={category.categoryid || index} className="mb-8">
            {/* Table Title */}
            <h2 className="text-lg font-semibold text-center bg-gray-200 py-2 mb-4">
              {category.categoryname} ({category.gender}) - Age {category.fromage} to {category.toage} Years
            </h2>

            {/* Table for Each Category */}
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">ID</th>
                  <th className="border border-gray-300 px-4 py-2">Category Name</th>
                  <th className="border border-gray-300 px-4 py-2">Age Range</th>
                  <th className="border border-gray-300 px-4 py-2">Gender</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-center">{category.categoryid}</td>
                  <td className="border border-gray-300 px-4 py-2">{category.categoryname}</td>
                  <td className="border border-gray-300 px-4 py-2">{category.fromage} - {category.toage} Years</td>
                  <td className="border border-gray-300 px-4 py-2">{category.gender || 'Other'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <div className="text-center text-red-500">No Categories Found</div>
      )}
    </div>
  );
};

export default CategoryMaster;
