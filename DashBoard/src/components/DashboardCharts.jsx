import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    RadialLinearScale,
} from 'chart.js';
import { Bar, Pie, Line, Doughnut, PolarArea } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    RadialLinearScale
);

const DashboardCharts = ({ data }) => {
    if (!data || data.length === 0) {
        return <div className="text-center text-gray-500">No data available for the selected filters.</div>;
    }

    // Helper to count occurrences
    const countOccurrences = (key) => {
        const counts = {};
        data.forEach(item => {
            const val = item[key];
            if (val) {
                counts[val] = (counts[val] || 0) + 1;
            }
        });
        return counts;
    };

    // Helper to average metric by category
    const averageMetric = (categoryKey, metricKey) => {
        const sums = {};
        const counts = {};
        data.forEach(item => {
            const cat = item[categoryKey];
            const val = item[metricKey];
            if (cat && val) {
                sums[cat] = (sums[cat] || 0) + val;
                counts[cat] = (counts[cat] || 0) + 1;
            }
        });
        const averages = {};
        Object.keys(sums).forEach(key => {
            averages[key] = sums[key] / counts[key];
        });
        return averages;
    };

    // Prepare data for charts
    const sectorCounts = countOccurrences('sector');
    const regionCounts = countOccurrences('region');
    const pestleCounts = countOccurrences('pestle');
    const countryCounts = countOccurrences('country');
    const topicCounts = countOccurrences('topic');

    const intensityByYear = averageMetric('end_year', 'intensity');
    const sortedYears = Object.keys(intensityByYear).sort();

    // Limit to top 10 for readability
    const topSectors = Object.entries(sectorCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);
    const topCountries = Object.entries(countryCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);
    const topTopics = Object.entries(topicCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);

    const barData = {
        labels: topSectors.map(i => i[0]),
        datasets: [
            {
                label: 'Number of Projects by Sector',
                data: topSectors.map(i => i[1]),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const pieData = {
        labels: Object.keys(regionCounts).slice(0, 8),
        datasets: [
            {
                label: '# of Votes',
                data: Object.values(regionCounts).slice(0, 8),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(199, 199, 199, 0.2)',
                    'rgba(83, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(199, 199, 199, 1)',
                    'rgba(83, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const lineData = {
        labels: sortedYears,
        datasets: [
            {
                label: 'Average Intensity over Years',
                data: sortedYears.map(year => intensityByYear[year]),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    const doughnutData = {
        labels: Object.keys(pestleCounts).slice(0, 6),
        datasets: [
            {
                label: 'PESTLE Analysis',
                data: Object.values(pestleCounts).slice(0, 6),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const polarData = {
        labels: topTopics.map(t => t[0]),
        datasets: [
            {
                label: 'Top Topics',
                data: topTopics.map(t => t[1]),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-center">Projects by Sector</h3>
                <Bar options={{ responsive: true }} data={barData} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-center">Projects by Region</h3>
                <Pie data={pieData} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-center">Average Intensity Trends</h3>
                <Line options={{ responsive: true }} data={lineData} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-center">PESTLE Distribution</h3>
                <Doughnut data={doughnutData} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
                <h3 className="text-lg font-semibold mb-4 text-center">Top Topics</h3>
                <div className="h-96 flex justify-center">
                    <PolarArea data={polarData} />
                </div>
            </div>
        </div>
    );
};

export default DashboardCharts;
