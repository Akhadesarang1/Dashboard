import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Mock data for the dashboard
const chartData = [
  {
    name: "Jan",
    revenue: 4000,
    users: 2400,
    sessions: 3200,
    conversions: 2400,
  },
  {
    name: "Feb",
    revenue: 3000,
    users: 1398,
    sessions: 2800,
    conversions: 2210,
  },
  {
    name: "Mar",
    revenue: 2000,
    users: 9800,
    sessions: 2000,
    conversions: 2290,
  },
  {
    name: "Apr",
    revenue: 2780,
    users: 3908,
    sessions: 2780,
    conversions: 2000,
  },
  {
    name: "May",
    revenue: 1890,
    users: 4800,
    sessions: 1890,
    conversions: 2181,
  },
  {
    name: "Jun",
    revenue: 2390,
    users: 3800,
    sessions: 2390,
    conversions: 2500,
  },
  {
    name: "Jul",
    revenue: 3490,
    users: 4300,
    sessions: 3490,
    conversions: 2100,
  },
];

const pieData = [
  { name: "Direct", value: 400 },
  { name: "Social", value: 300 },
  { name: "Referral", value: 300 },
  { name: "Organic", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Skeleton Loader Component
const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl"></div>
  </div>
);

// Data Card Component
const DataCard = ({ title, value, change, icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        <p
          className={`text-sm mt-1 ${
            change >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {change >= 0 ? "↑" : "↓"} {Math.abs(change)}% from last month
        </p>
      </div>
      <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white">
        {icon}
      </div>
    </div>
  </motion.div>
);

// Filter Component
const FilterSection = ({ filters, onFilterChange }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-wrap gap-4 mb-6"
  >
    <select
      value={filters.date}
      onChange={(e) => onFilterChange("date", e.target.value)}
      className="px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
    >
      <option value="7d">Last 7 days</option>
      <option value="30d">Last 30 days</option>
      <option value="90d">Last 90 days</option>
    </select>

    <select
      value={filters.status}
      onChange={(e) => onFilterChange("status", e.target.value)}
      className="px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
    >
      <option value="all">All Status</option>
      <option value="active">Active</option>
      <option value="pending">Pending</option>
    </select>

    <select
      value={filters.category}
      onChange={(e) => onFilterChange("category", e.target.value)}
      className="px-4 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
    >
      <option value="all">All Categories</option>
      <option value="saas">SaaS</option>
      <option value="ecommerce">E-commerce</option>
    </select>
  </motion.div>
);

// Chart Components
const ChartRenderer = ({ chartType, data, isLoading }) => {
  if (isLoading) return <SkeletonLoader />;

  const chartConfig = {
    bar: (
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          contentStyle={{
            borderRadius: "12px",
            border: "none",
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
          }}
        />
        <Legend />
        <Bar dataKey="revenue" fill="#8884d8" radius={[4, 4, 0, 0]} />
        <Bar dataKey="users" fill="#82ca9d" radius={[4, 4, 0, 0]} />
      </BarChart>
    ),
    line: (
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          contentStyle={{
            borderRadius: "12px",
            border: "none",
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#8884d8"
          strokeWidth={3}
          dot={{ r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="users"
          stroke="#82ca9d"
          strokeWidth={3}
          dot={{ r: 4 }}
        />
      </LineChart>
    ),
    area: (
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          contentStyle={{
            borderRadius: "12px",
            border: "none",
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
          }}
        />
        <Legend />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorRevenue)"
        />
        <Area
          type="monotone"
          dataKey="users"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorUsers)"
        />
      </AreaChart>
    ),
    pie: (
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            borderRadius: "12px",
            border: "none",
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
          }}
        />
      </PieChart>
    ),
    donut: (
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            borderRadius: "12px",
            border: "none",
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
          }}
        />
      </PieChart>
    ),
  };

  return (
    <motion.div
      key={chartType}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="h-64 bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
    >
      <ResponsiveContainer width="100%" height="100%">
        {chartConfig[chartType]}
      </ResponsiveContainer>
    </motion.div>
  );
};

// Main Dashboard Component
const AnalyticsDashboard = () => {
  const [chartType, setChartType] = useState("bar");
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    date: "30d",
    status: "all",
    category: "all",
  });

  // Simulate loading state when chart type changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [chartType]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const handleExport = () => {
    // Simulate export functionality
    alert(
      `Exporting ${chartType} chart data with filters: ${JSON.stringify(
        filters
      )}`
    );
  };

  // Icons for data cards
  const icons = {
    users: "👥",
    conversions: "📈",
    revenue: "💰",
    sessions: "🌐",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-64 bg-white shadow-xl min-h-screen p-6 border-r border-gray-200"
        >
          <div className="mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Analytics Pro
            </h1>
            <p className="text-gray-500 text-sm">Dashboard v2.0</p>
          </div>

          <nav className="space-y-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Charts
            </p>
            {["bar", "line", "area", "pie", "donut"].map((type) => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setChartType(type)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                  chartType === type
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span className="capitalize font-medium">{type} Chart</span>
              </motion.button>
            ))}
          </nav>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleExport}
            className="w-full mt-8 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg font-medium flex items-center justify-center gap-2"
          >
            <span>📊</span>
            Export Data
          </motion.button>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              Analytics Dashboard
            </h2>
            <p className="text-gray-600">
              Monitor your key metrics and performance indicators
            </p>
          </motion.div>

          {/* Data Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <DataCard
              title="Active Users"
              value="12.4K"
              change={12.5}
              icon={icons.users}
              delay={0.1}
            />
            <DataCard
              title="Conversions"
              value="1,248"
              change={8.2}
              icon={icons.conversions}
              delay={0.2}
            />
            <DataCard
              title="Revenue"
              value="$42.8K"
              change={15.3}
              icon={icons.revenue}
              delay={0.3}
            />
            <DataCard
              title="Sessions"
              value="24.9K"
              change={5.7}
              icon={icons.sessions}
              delay={0.4}
            />
          </div>

          {/* Filters */}
          <FilterSection
            filters={filters}
            onFilterChange={handleFilterChange}
          />

          {/* Chart Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 capitalize">
                {chartType} Analytics
              </h3>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-700"
              >
                Real-time Data
              </motion.div>
            </div>

            <AnimatePresence mode="wait">
              <ChartRenderer
                chartType={chartType}
                data={chartData}
                isLoading={isLoading}
              />
            </AnimatePresence>
          </motion.div>

          {/* Additional Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h4 className="font-semibold text-gray-900 mb-4">
                Performance Metrics
              </h4>
              <div className="space-y-3">
                {[
                  { label: "Page Load Time", value: "1.2s", change: -5 },
                  { label: "Bounce Rate", value: "32%", change: -12 },
                  { label: "Avg. Session", value: "4m 12s", change: 8 },
                ].map((metric, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                  >
                    <span className="text-gray-600">{metric.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{metric.value}</span>
                      <span
                        className={`text-xs ${
                          metric.change >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {metric.change >= 0 ? "↗" : "↘"}{" "}
                        {Math.abs(metric.change)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <h4 className="font-semibold text-gray-900 mb-4">
                Recent Activity
              </h4>
              <div className="space-y-3">
                {[
                  { activity: "New user registration", time: "2 min ago" },
                  { activity: "Payment processed", time: "5 min ago" },
                  { activity: "API key generated", time: "12 min ago" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">{item.activity}</p>
                      <p className="text-xs text-gray-500">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
