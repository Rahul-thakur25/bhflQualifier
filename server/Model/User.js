const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    email: { type: String, required: true },
    roll_number: { type: String, required: true },
    numbers: { type: [String], default: [] },
    alphabets: { type: [String], default: [] },
    highest_alphabet: { type: [String], default: [] },
    is_success: { type: Boolean, default: true }
});

module.exports = mongoose.model("User", userSchema);
