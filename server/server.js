const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const connectDB = require('./db/connection');

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/signup', require('./routes/Customers'));
app.use('/api/signin', require('./routes/signin'))
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/billing', require('./routes/billingSummary'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(` Server is running on port ${PORT}`);
});
