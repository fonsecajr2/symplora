const express = require('express');
const router = express.Router();
const { addEmployee, getBalance } = require('../controllers/employeeController');

router.post("/", addEmployee);
router.post("/:id/balance", getBalance);

module.exports = router;