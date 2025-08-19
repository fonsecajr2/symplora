const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", reqired: true },
    tartDate: { type: Date, required: true, index: true },
  endDate: { type: Date, required: true, index: true },
    reason: { type: String, trim: true },
    days: { type: Number, required: true },
    status: { type: String, enum: ["PENDING", "APPROVED", "REJECTED"], default: "PENDING", index: true }
}, {timestamps: true});

leaveSchema.index({ employeeId: 1, startDate: 1, endDate: 1 })

async function createLeave({ employeeId, startDate, endDate, reason, days }) {
  const leave = new Leave({
    employeeId,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    reason,
    days,
    status: "PENDING"
  });
  return await leave.save();
}

async function getLeaveById(id) {
  return await Leave.findById(id);
}

async function findOverlap(employeeId, start, end) {
  return await Leave.findOne({
    employeeId,
    status: { $in: ["PENDING", "APPROVED"] },
    $or: [
      { startDate: { $lte: end }, endDate: { $gte: start } }
    ]
  });
}Leave = mongoose.model("Leave", leaveSchema);

module.exports = { Leave, createLeave, getLeaveById, findOverlap };