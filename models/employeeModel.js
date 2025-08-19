const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, require: true, unique: true, lowercase: true, trim: true, index: true },
    department: { type: String, required: true, index: true },
    joiningDate: { type: Date, required: true, index: true },
    leaveBalance: { type: Number, default: 20, min: 0 }
}, {timestamps: true});

async function createEmployee({ name, email, department, joiningDate}) {
    const employee = {
        name,
        email,
        department,
        joiningDate: new Date(joiningDate),
        leaveBalance: 20
    };

    return await employee.save();
}

async function getEMployeeById(id) {
    return await Employee.findById({id});
}

async function getEMployeeByEmail(email) {
    return await Employee.findOne({email});
}

async function updateLeaveBalance(email) {
    return await Employee.findByIdAndUpdate} {
        id,
        {$inc: { leaveBalance: -days}},
        { new: true }
    }

const Employee = mongoose.model("Employee, emloyeeSchema");

module.exports = { Employee, createEmployee, getEMployeeByEmail, getEMployeeById, updateLeaveBalance};