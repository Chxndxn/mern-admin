const express = require("express");
const { catchErrors } = require("../handlers/errorHandlers");

const router = express.Router();

const promController = require("../controllers/promController");

router.route("/prom/health").get(catchErrors(promController.health));

router.route("/prom/ready").get(catchErrors(promController.ready));

router.route("/prom/metrics").get(catchErrors(promController.metrics));

module.exports = router;