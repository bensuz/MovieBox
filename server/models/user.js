const { Pool } = require("pg");

// Create a PostgreSQL connection pool
const pool = new Pool({
    connectionString: process.env.ELEPHANT_SQL_CONNECTION_STRING,
});

// Define the User model
class User {
    constructor(id, firstName, lastName, email, userName, password) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.userName = userName;
        this.password = password;
    }

    static async createTable() {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                user_name VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        `;

        try {
            await pool.query(createTableQuery);
            console.log("User table created (if not existed)");
        } catch (error) {
            console.error("Error creating user table:", error);
            throw error; // Throw the error to indicate a failure
        }
    }

    static async createUser(user) {
        const insertQuery = `
            INSERT INTO users ("first_name", "last_name", "email", "user_name", "password")
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;

        try {
            const { rows } = await pool.query(insertQuery, [
                user.firstName,
                user.lastName,
                user.email,
                user.userName,
                user.password,
            ]);
            return new User(
                rows[0].id,
                rows[0].first_name,
                rows[0].last_name,
                rows[0].email,
                rows[0].user_name,
                rows[0].password
            );
        } catch (error) {
            console.error("Error creating user:", error);
            throw error; // Throw the error to indicate a failure
        }
    }
}

module.exports = User;
