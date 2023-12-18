import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import adventureRouter from './routes/adventureRoutes.js';
import userRouter from './routes/userRoutes.js';
import cors from "cors"

const __dirname = process.cwd();

const envPath = '../.env';

dotenv.config({ path: envPath });

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static('dist'));

mongoose.connect(process.env.MONGODB);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to the database');
});

// Routes
// Adventures
app.use('/adventures', adventureRouter);
// Users
app.use('/user', userRouter);

// Catch-all route to serve the index.html
app.get('*', (req, res) => {
  const filePath = path.join(__dirname, 'dist', 'index.html');
  res.sendFile(filePath);
});

app.listen(port, () => {
    console.log('Express Server Running on Port:', port);
});
