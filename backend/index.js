const express = require('express');
const mongoose = require('mongoose');
const todoRouter = require('./routes/router');
const config = require('./config');
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    // Website allowed to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Pass to next layer of middleware
    next();
});

app.use('/todo', todoRouter.router);

// Connecting to Database and then starting the Server
connectDB(config.db_url).then(() => { connectServer(config.PORT) });

// Function establishing connection to Database
function connectDB(db_url) {
    mongoose.connection.on('error', (err) => {
        console.error("Error while connecting to Database");
        console.error(err);
    });

    mongoose.connection.once('open', () => {
        console.error("Successfully connected to Database");
    });

    return mongoose.connect(db_url, {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000
    });
}

// Function starting the Server
function connectServer(PORT) {
    app.listen(PORT, (err) => {
        if (err) {
            console.error("Error while starting the server");
            console.error(err);
            return;
        }

        console.log(`Server is running at port: ${PORT}`);
    });
}
