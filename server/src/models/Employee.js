const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true }, // ADDED
    class: { type: String, required: true }, // ADDED (e.g., "Grade 10" or "Senior Dev")
    subjects: { type: [String], default: [] },
    attendance: { type: Number, min: 0, max: 100, default: 100 },
    role: {
        type: String,
        enum: ['ADMIN', 'EMPLOYEE', 'MANAGER'],
        default: 'EMPLOYEE'
    },
    // We keep 'department' and 'status' as they are good for the "Extraordinary" design
    department: { type: String, default: 'General' },
    status: { type: String, default: 'Active' },
    avatarUrl: { type: String }
}, {
    timestamps: true
});

// PERFORMANCE: Compound index for frequent search patterns
EmployeeSchema.index({ name: 'text', class: 'text' });
EmployeeSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Employee', EmployeeSchema);