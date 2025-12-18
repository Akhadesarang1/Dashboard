import express from 'express';
import DashboardData from '../models/DashboardData.js';

const router = express.Router();

// Get all dashboard data with filters
router.get('/', async (req, res) => {
    try {
        const { end_year, topic, sector, region, pestle, source, swot, country, city } = req.query;
        const query = {};

        if (end_year) query.end_year = end_year;
        if (topic) query.topic = topic;
        if (sector) query.sector = sector;
        if (region) query.region = region;
        if (pestle) query.pestle = pestle;
        if (source) query.source = source;
        if (swot) query.swot = swot;
        if (country) query.country = country;
        if (city) query.city = city;

        const data = await DashboardData.find(query);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get distinct values for filters
router.get('/filters', async (req, res) => {
    try {
        const filters = {
            end_year: await DashboardData.distinct('end_year'),
            topic: await DashboardData.distinct('topic'),
            sector: await DashboardData.distinct('sector'),
            region: await DashboardData.distinct('region'),
            pestle: await DashboardData.distinct('pestle'),
            source: await DashboardData.distinct('source'),
            country: await DashboardData.distinct('country'),
            city: await DashboardData.distinct('city'), // Assuming city exists in data, though not in schema explicitly shown earlier, but requested.
        };
        res.json(filters);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
