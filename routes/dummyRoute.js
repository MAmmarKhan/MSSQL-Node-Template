
const express = require('express');
const router = express.Router();
const dummyController = require('../controllers/dummyController.js');

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/', dummyController.createDummy);


module.exports = router;