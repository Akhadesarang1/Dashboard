import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
                            <span className="text-xl font-bold">AnalyticsHub</span>
                        </div>
                        <p className="text-slate-400 max-w-sm">
                            Empowering businesses with data-driven insights.
                            Visualize, analyze, and grow with our advanced analytics platform.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-blue-400">Platform</h3>
                        <ul className="space-y-2">
                            {['Features', 'Integrations', 'Pricing', 'API'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-slate-400 hover:text-white transition-colors hover:translate-x-1 inline-block transform duration-200">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-blue-400">Company</h3>
                        <ul className="space-y-2">
                            {['About Us', 'Careers', 'Blog', 'Contact'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-slate-400 hover:text-white transition-colors hover:translate-x-1 inline-block transform duration-200">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} AnalyticsHub. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                            <a key={social} href="#" className="text-slate-500 hover:text-blue-400 transition-colors">
                                {social}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
