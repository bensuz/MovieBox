require("dotenv/config");
const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 8000;

const cookieParser = require("cookie-parser");
const path = require("path");
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

const publicMoviesRoutes = require("./routes/publicMovies");
const userMoviesRoutes = require("./routes/userMovies");
const authRoutes = require("./routes/auth");

app.use("/api/publicmovies", publicMoviesRoutes);
app.use("/api/usermovies", userMoviesRoutes);
app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
    const buildPath = path.join(__dirname, "../client/dist");
    app.use(express.static(buildPath));
    app.get("*", (req, res) => {
        res.sendFile(path.join(buildPath, "index.html"));
    });
}

app.listen(PORT, () => console.log(`SERVER IS RUNNING ON ${PORT}`));
