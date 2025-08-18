const express = require('express');
const router = express.Router();
const { applyLeave, approveLeave, rejectLeave } = require('../controllers/leaveController');

router.post("/apply", applyLeave);
router.post("/:id/approve", approveLeave);
router.post("/:id/reject", rejectLeave);

module.exports = router;