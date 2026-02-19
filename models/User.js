const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Ime je obavezno']
    },
    email: {
        type: String,
        required: [true, 'Email je obavezan'],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Email nije validan']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);