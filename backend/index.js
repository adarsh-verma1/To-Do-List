const express = require('express');
const mongoose = require('mongoose');
const todoRouter = require('./routes/router');
const app = express();

// CONFIG
const mongoDB_url = "mongodb://localhost:27017/";
const db_name = "todoDB";
const db_url = mongoDB_url + db_name;
const PORT = 5555;

// Middlewares
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

    //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // Pass to next layer of middleware
    next();
});

app.use('/todo', todoRouter.router);

// Connecting to Database and then starting the Server
connectDB(db_url).then(() => { connectServer(PORT) });

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
            console.console.error(); (err);
        }

        console.log(`Server is running at port: ${PORT}`);
    });
}
