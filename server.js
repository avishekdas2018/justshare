const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const schedule = require('node-schedule');
const File = require('./models/file');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static('public'));

// Cors settings
const corsOption = {
    origin: [process.env.ALLOWED_CLIENT]
}

app.use(cors());

const connectDB = require('./config/db');
connectDB();


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


const autoDelete = schedule.scheduleJob('* * * * * *', async () => {
    const files = await File.find({ createdAt : { $lt: new Date(Date.now() - 10 * 60 * 1000)} })
    if(files.length) {
        for(const file of files) {
            try {
                fs.unlinkSync(file.path);
                await file.remove();
                console.log(`Scuccess: ${file.filename}`);
            } catch(err) {
                console.log(`Error: ${err}`);
            }
        }
        console.log('Job done!');
    }
    process.exit(autoDelete);
});