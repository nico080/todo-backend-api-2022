const mongoose = require('mongoose');
// Setup schema
const taskSchema = mongoose.Schema({
	task: { type: String, required: true },
	done: { type: Boolean, default: false },
}, { timestamps: { createdAt: 'createdAt' } });

module.exports = mongoose.models.task || mongoose.model("task", taskSchema);
