const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static('public'));


const connectDB = require('./config/db');
connectDB();

// Cors settings
const corsOption = {
    origin: process.env.ALLOWED_CLIENT
}

app.use(cors(corsOption));

// Templete Engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');


// Routes

app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
}) 