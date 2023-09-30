const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;
const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
const db = require("../config/db");

const { Pool } = require("pg");
const pool = new Pool({
    connectionString: process.env.ELEPHANT_SQL_CONNECTION_STRING,
});

// User Registration
const register = async (req, res) => {
    try {
        const { firstName, lastName, email, userName, password } = req.body;

        // Check if the email or username is already in use
        const existingUser = await pool.query(
            "SELECT * FROM users WHERE email = $1 OR user_name = $2",
            [email, userName]
        );

        if (existingUser.rowCount > 0) {
            return res
                .status(400)
                .json({ message: "Email or username already in use" });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const newUser = await pool.query(
            'INSERT INTO users ("first_name", "last_name", "email", "user_name", "password") VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [firstName, lastName, email, userName, hashedPassword]
        );

        const user = newUser.rows[0];

        // Create a JWT token for the user
        const accessToken = jwt.sign(
            {
                _id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                userName: user.user_name,
            },
            SECRET
        );

        res.status(201)
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                expires: new Date(Date.now() + oneDayInMilliseconds),
            })
            .json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(500).json({
            message: "Registration failed",
            error: error.message,
        });
    }
};

// User Login
const login = async (req, res) => {
    try {
        const { userName, password } = req.body;

        // Check if the user exists
        const user = await pool.query(
            'SELECT * FROM users WHERE "user_name" = $1',
            [userName]
        );

        if (user.rowCount === 0) {
            return res.status(400).json({ message: "Invalid login attempt" });
        }

        const userData = user.rows[0];

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(
            password,
            userData.password
        );

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid login attempt" });
        }

        // Create a JWT token for the user
        const accessToken = jwt.sign(
            {
                _id: userData.id,
                firstName: userData.first_name,
                lastName: userData.last_name,
                email: userData.email,
                userName: userData.user_name,
            },
            SECRET
        );

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            expires: new Date(Date.now() + oneDayInMilliseconds),
        }).json({ message: "User logged in successfully", user: userData });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }
};

const getLoggedInUser = async (req, res) => {
    try {
        const { userName } = req.user; // Assuming the user ID is available in req.user

        // Query the PostgreSQL database to retrieve user information
        const loggedUser = await pool.query(
            'SELECT * FROM users WHERE "user_name" = $1',
            [userName]
        );

        if (loggedUser.rows?.length === 1) {
            const user = loggedUser.rows[0];
            console.log("user still logged in", user);
            res.json({ user });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// User Logout
const logOut = (req, res) => {
    res.clearCookie("accessToken");
    res.json({ message: "User logged out" });
};

module.exports = {
    register,
    login,
    logOut,
    getLoggedInUser,
};
