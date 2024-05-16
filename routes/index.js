const express = require('express');
const router = express.Router();

const index_controller = require("../controllers/indexController");

router.get("/data/:aux/:agg", index_controller.store_data);
router.get("/add-admin", index_controller.add_admin_get);
router.get("/make-angle", index_controller.make_angle);

module.exports = router;
