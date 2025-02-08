import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import router from './routes/product.route.js';

dotenv.config();                         

const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.json());

// Routes
app.use('/api/products', router);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB();
});