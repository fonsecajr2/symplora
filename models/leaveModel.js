const leaves = [];
const nextLeaveId = 1;

function createLeave({ employeeId, startDate, endDate, reason, days }) {
    const leave = {
        id: nextLeaveId++,
        employeeId,
        startDate,
        endDate,
        reason,
        days,
        status: 'PENDING'
    };
    leaves.push(leave);
    return leave;
}

function getLeaveById(id) {
    return leaves.find(el => el.id === id);
}

function findOverlap(employeeId, start, end) {
    return leaves.find(el => {
        el.employeeId === employeeId && (
            (start >= el.startDate && start <= el.endDate) ||
            (end >= el.startDate && end <= el.endDate)
        )
    })
};

module.exports = { createLeave, getLeaveById, findOverlap };