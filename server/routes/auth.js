const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticate = require("../middlewares/auth");

// User Registration Route
router.post("/register", authController.register);

// User Login Route
router.post("/login", authController.login);

router.get("/currentUser", authenticate, authController.getLoggedInUser);

// User Logout Route
router.post("/logout", authController.logOut);

router.get("/avatar", authenticate, authController.getAvatar);
router.post("/upload-avatar", authenticate, authController.updateAvatar);
router.delete("/delete-avatar", authenticate, authController.deleteAvatar);

module.exports = router;
