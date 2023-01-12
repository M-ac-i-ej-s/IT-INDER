import userRouter from './routes/user.route.js';

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
mongoose.set('strictQuery', false)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const whitelist = ['http://localhost:3000'];
const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};
app.use(cors(corsOptions));
mongoose.connect(
    'mongodb+srv://' +
        process.env.LOGIN +
        ':' +
        process.env.PASSWORD +
        process.env.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) {
            console.log('error in connection');
        } else {
            console.log('mongodb is connected');
        }
    }
);

app.use('/users', userRouter)

app.listen(process.env.PORT, () => {
    console.log(`Our server is running on port ${process.env.PORT}`);
});