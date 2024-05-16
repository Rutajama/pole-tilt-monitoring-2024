const express = require('express');
const router = express.Router();

const admin_controller = require("../controllers/adminController");

router.get("/login", admin_controller.login_get);
router.get("/data", admin_controller.show_data);
router.get("/settings", admin_controller.settings_get);

module.exports = router;
