// CONFIGURATION

const mongoDB_url = "mongodb://localhost:27017/";
const db_name = "todoDB";

const db_url = mongoDB_url + db_name;
const PORT = 5555;

module.exports = { PORT, db_url };