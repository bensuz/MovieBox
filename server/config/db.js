const pgp = require("pg-promise")();

// Database connection details
const connectionOptions = {
    host: "tai.db.elephantsql.com",
    database: "jcekntyd",
    user: "jcekntyd",
    password: "RpfL9Bb5i5IqVvYJfmCeizGQly_Df0K0",
};

// Create a PostgreSQL database instance
const db = pgp(connectionOptions);

// Export the database instance
module.exports = db;
