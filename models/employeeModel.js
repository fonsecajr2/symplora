let employees = [];
let nextEmployeeId = 1;

function createEmployee({ name, email, department, joininDate }) {
    const employee = {
        id: nextEmployeeId++,
        name,
        email,
        department,
        joininDate: new Date(joininDate),
        leaveBalance: 20
    };
    employees.push(employee);
    return employee;
}

function getEmployeeById(id) {
    return employees.find(el => el.id === id);
}

function getEmployeeByEmail(email) {
    return employees.find(el => el.email === email);
}

function updateLeaveBalance(id, days) {
    const emp = getEmployeeById(id);
    if (emp) emp.leaveBalance -= days;
    return emp;
}

module.exports = { createEmployee, getEmployeeById, getEmployeeByEmail, updateLeaveBalance };