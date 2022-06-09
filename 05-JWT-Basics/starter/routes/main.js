const express = require("express");
const { login, dashboard } = require("../controllers/main");
const authorize = require("../middleware/auth");

const router = express.Router();

router.route("/dashboard").get(authorize, dashboard);
router.route("/login").post(login);

module.exports = router;
