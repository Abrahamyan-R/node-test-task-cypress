const express = require('express');

const { serviceStatusController } = require('../controllers');


const router = express.Router();

router.get('/ping', serviceStatusController.ping);

module.exports = router;
