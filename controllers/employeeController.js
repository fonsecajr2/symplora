const { createEmployee, getEmployeeById, getEmployeeByEmail } = require('../models/employeeModel');

exports.addEmployee = (req, res) => {
    const { name, email, department, joiningDate} = req.body;

    if (!name || !email || !department || !joiningDate) {
        return res.status(400).json({ error: "Missed Fields Required"});
    }

    if (getEmployeeByEmail(email)) {
        return res.status(400).json({ error: "User with this Email already exists"});
    }

    const employee = createEmployee({ name, email, department, joiningDate});
    return res.status(200).json(employee);
}

exports.getBalance = (req, res) => {
    const employee = getEmployeeById(parseInt(req.params.id));
    if (!employee) return status(400).json({ error: "Employee not Found."});

    res.status(200).json({ employeeId: employee.id, balance: employee.balance});
}