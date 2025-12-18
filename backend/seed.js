import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import DashboardData from './models/DashboardData.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dashboard')
    .then(() => console.log('MongoDB connected for seeding'))
    .catch(err => console.error('MongoDB connection error:', err));

const seedData = async () => {
    try {
        const dataPath = process.argv[2] || path.join(__dirname, 'data.json');

        if (!fs.existsSync(dataPath)) {
            console.error(`Data file not found at ${dataPath}`);
            process.exit(1);
        }

        const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

        // Clear existing data
        await DashboardData.deleteMany({});
        console.log('Cleared existing data');

        // Insert new data
        await DashboardData.insertMany(jsonData);
        console.log('Data imported successfully');

        process.exit();
    } catch (err) {
        console.error('Error with data import:', err);
        process.exit(1);
    }
};

seedData();
