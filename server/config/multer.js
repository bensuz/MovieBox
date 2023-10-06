const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary"); // Import your Cloudinary config

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: "avatars", // Change this to your desired folder name
    allowedFormats: ["jpg", "jpeg", "png", "gif"],
});

const upload = multer({ storage: storage });

module.exports = upload;
