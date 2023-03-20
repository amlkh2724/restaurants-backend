
// server.mjs
import colors from "colors"
import express from 'express';
import connectDB from "./config/db.js";
import dotenv from 'dotenv';
import morgan from "morgan";
import restaurants from './routes/resturantroutes.js'
dotenv.config({ path: './config/config.env' });
console.log(process.env.MONGO_URI);

connectDB()
const app = express();
app.use(express.json())
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

app.get('/', (req, res) => {
    res.send({
        message: 'Welcome to Shop API'
    });
});
app.use('/api/v1/resturant', restaurants)


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));


// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    server.close(() => process.exit(1));
});
