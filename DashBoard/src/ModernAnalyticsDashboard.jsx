import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import DashboardFilters from "./components/DashboardFilters";
import DashboardCharts from "./components/DashboardCharts";
import Footer from "./components/Footer";

const ModernAnalyticsDashboard = () => {
  const [scrolled, setScrolled] = useState(false);
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch Filters
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dashboard/filters');
        const data = await response.json();
        setFilters(data);
      } catch (error) {
        console.error("Error while fetching filters:", error);
      }
    };
    fetchFilters();
  }, []);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams(selectedFilters).toString();
        const response = await fetch(`http://localhost:5000/api/dashboard?${queryParams}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error while fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedFilters]);

  const handleFilterChange = (key, value) => {
    setSelectedFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setSelectedFilters({});
  };

  const scrollToDashboard = () => {
    const element = document.getElementById('dashboard-content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 font-sans text-white">

      {/* Sticky Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-50 transition-all duration-300 ${scrolled
          ? "bg-slate-900/95 backdrop-blur-md shadow-lg py-3 border-b border-white/10"
          : "bg-transparent py-6"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-lg shadow-lg shadow-blue-500/30"></div>
              <span className="text-xl font-bold text-white tracking-tight">
                AnalyticsHub
              </span>
            </motion.div>

            <div className="flex items-center space-x-6">
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30 border border-white/20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </motion.button>

                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-xl shadow-xl border border-slate-700 overflow-hidden"
                  >
                    <button
                      onClick={() => {
                        localStorage.removeItem('userInfo');
                        window.location.reload();
                      }}
                      className="w-full text-left px-4 py-3 text-red-400 hover:bg-slate-700 hover:text-red-300 transition-colors flex items-center space-x-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
              Advanced Analytics
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 block mt-2">
                Made Simple
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
              Explore global trends, insights, and data visualizations with our premium analytics dashboard.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToDashboard}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full font-semibold transition-all shadow-lg shadow-blue-600/30 border border-white/10"
            >
              Open Analytical Dashboard
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section id="dashboard-content" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-800/50 p-8 rounded-3xl border border-white/5 shadow-2xl backdrop-blur-xl">
            <DashboardFilters
              filters={filters}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
            />

            {loading ? (
              <div className="flex justify-center items-center h-96">
                <div className="relative w-24 h-24">
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500/30 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                </div>
              </div>
            ) : (
              <DashboardCharts data={data} />
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ModernAnalyticsDashboard;
