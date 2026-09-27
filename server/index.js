require("dotenv/config");
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const app = express();

const PORT = process.env.PORT || 8000;

const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");
const { featuredPreloadTag } = require("./utils/featuredPreload");
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

app.use(compression());
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
    // Vite fingerprints everything in /assets, so it can be cached forever.
    app.use(
        "/assets",
        express.static(path.join(buildPath, "assets"), {
            immutable: true,
            maxAge: "1y",
        })
    );
    app.use(express.static(buildPath, { maxAge: "1h", index: false }));

    // A missing client build must not take the API down with it: log it and
    // answer page requests with a 503 until the build exists.
    const indexPath = path.join(buildPath, "index.html");
    let indexHtml = null;
    if (!fs.existsSync(indexPath)) {
        console.error(`Client build not found at ${indexPath}. Run "npm run build" in client/.`);
    }

    app.get("*", async (req, res) => {
        if (indexHtml === null && fs.existsSync(indexPath)) {
            indexHtml = fs.readFileSync(indexPath, "utf8");
        }
        if (indexHtml === null) {
            return res.status(503).send("MovieBox is being deployed. Please try again shortly.");
        }
        // On the homepage, hint the hero image so it loads alongside the JS.
        const hint = req.path === "/" ? await featuredPreloadTag() : "";
        res.set("Cache-Control", "no-cache");
        res.type("html").send(indexHtml.replace("</head>", `${hint}</head>`));
    });
}

app.listen(PORT, () => console.log(`SERVER IS RUNNING ON ${PORT}`));

