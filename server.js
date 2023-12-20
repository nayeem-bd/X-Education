const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASS);
mongoose.connect(DB).then(() => {
    console.log('DB connection successfully...');
}).catch(() => {
    console.log('DB connection error');
});

const port = process.env.PORT || 4000;
const server = app.listen(port, '0.0.0.0', () => {
    console.log(`App is running on ${port}`);
});