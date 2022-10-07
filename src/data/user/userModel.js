const mongoose = require('mongoose');
// Setup schema
const userSchema = mongoose.Schema({
    uname:  { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: { createdAt: 'createdAt' } });

module.exports = mongoose.models.user || mongoose.model("user", userSchema);