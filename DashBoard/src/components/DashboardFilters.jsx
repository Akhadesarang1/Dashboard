import React from 'react';

const DashboardFilters = ({ filters, selectedFilters, onFilterChange, onReset }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.keys(filters).map((key) => (
                    <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                            {key.replace('_', ' ')}
                        </label>
                        <select
                            value={selectedFilters[key] || ''}
                            onChange={(e) => onFilterChange(key, e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">All</option>
                            {filters[key].filter(val => val !== "").sort().map((val, index) => (
                                <option key={index} value={val}>
                                    {val}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex justify-end">
                <button
                    onClick={onReset}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                >
                    Reset Filters
                </button>
            </div>
        </div>
    );
};

export default DashboardFilters;
