const { Client } = require("pg");
const dbConfig = require("../src/config/db_config.json");

// Update these values with your PostgreSQL credentials
const user = dbConfig.user;
const password = dbConfig.password;
const host = dbConfig.host;
const port = dbConfig.port;
const newDatabase = dbConfig.databaseName;

// Connect to the default 'postgres' database
const client = new Client({
    user,
    host,
    database: "postgres",
    password,
    port,
});

async function dropDatabase() {
    try {
        await client.connect();
        await client.query(`DROP DATABASE IF EXISTS ${databaseToDrop};`);
        console.log(`Database "${databaseToDrop}" dropped successfully.`);
    } catch (err) {
        console.error("Error dropping database:", err);
    } finally {
        await client.end();
    }
}

dropDatabase();