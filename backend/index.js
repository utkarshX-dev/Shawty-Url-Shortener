import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { getUrl } from './controllers/user.controller.js';

const app = express();
const PORT = process.env.PORT || 3000;

//dekho kitna code hai

app.use(cookieParser());

app.use(cors({
    origin: ["http://localhost:5173", "https://ushawty.vercel.app"],
    credentials: true
}));

app.use(express.json());

connectDB(process.env.MONGODB_URL);

app.set('view engine', 'ejs');

app.use('/api', userRoutes);

app.get('/', (req, res) => {
    res.send('Welcome, Shawty');
});

app.get('/:shortUrl', getUrl);

app.use((req, res) => {
    res.status(404).json({
        message: "Endpoint not found"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});