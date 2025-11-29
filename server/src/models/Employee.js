const mongoose = require('mongoose');
const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    class: { type: String, required: true },
    subjects: { type: [String], default: [] },
    attendance: { type: Number, min: 0, max: 100, default: 100 },
    role: {
        type: String,
        enum: ['ADMIN', 'EMPLOYEE', 'MANAGER'],
        default: 'EMPLOYEE'
    },
    department: { type: String, default: 'General' },
    status: { type: String, default: 'Active' },
    avatarUrl: { type: String }
}, {
    timestamps: true
});
EmployeeSchema.index({ name: 'text', class: 'text' });
EmployeeSchema.index({ createdAt: -1 });
module.exports = mongoose.model('Employee', EmployeeSchema);