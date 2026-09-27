const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticate = require("../middlewares/auth");

// User Registration Route
router.post("/register", authController.register);

// User Login Route
router.post("/login", authController.login);

// Signed-out visitors get `{ user: null }` rather than a 403, so checking the
// session on page load doesn't log an error in the browser console.
router.get(
    "/currentUser",
    (req, res, next) =>
        req.cookies.accessToken ? authenticate(req, res, next) : res.json({ user: null }),
    authController.getLoggedInUser
);

// User Logout Route
router.post("/logout", authController.logOut);

router.get("/avatar", authenticate, authController.getAvatar);
router.post("/upload-avatar", authenticate, authController.updateAvatar);
router.delete("/delete-avatar", authenticate, authController.deleteAvatar);

module.exports = router;
