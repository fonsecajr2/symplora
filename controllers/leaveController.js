const { getEmployeeById, updateLeaveBalance } = require("../models/employeeModel");
const { createLeave, getLeaveById, findOverlap } = require('../models/leaveModel');

exports.applyLeave = (req, res) => {
    const { employeeId, startDate, endDate, reason} = req.body;

    const employee = getEmployeeById(employeeId);
    if (!employee) return res.status(400).json({ error: "Employee not Found"});

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end)) return res.status(400).json({error: "Invalid Dates"});
    if (end < start) return res.status(400).json({ error: "End Date before Start Date"});
    if (start < employee.joiningDate) return res.status(400).json({ error: "Leave before joining Data"});

    const daysRequested = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    if (daysRequested > employee.leaveBalance) {
        return res.status(400).json({ error: "Overlapping leave request"});
    }

    const leave = createLeave({employeeId, startDate: start, endDate: end, reason, days: daysRequested});
    res.status(201).json(leave);
}

exports.approveLeave = (req, res) => {
    const leave = getLeaveById(parseInt(req.params.id));
    if (!leave) return res.status(400).json({ error: "Leave not found" });
    if (leave.status !== "PENDING") return res.status(400).json({ error: "Leave already processed"});

    leave.status = "APPROVED";
    updateLeaveBalance(leave.employeeId, leave.days);
    res.json(leave);
}

exports.rejectLeave = (req, res) => {
    const leave = getLeaveById(parseInt(req.params.id));
    if (!leave) return res.status(400).json({ error: "Leave not found" });
    if (leave.status !== "PENDING") return res.status(400).json({ error: "Leave already processed"});

    leave.status = "REJECTED";
    updateLeaveBalance(leave.employeeId, leave.days);
    res.json(leave);
}