const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  rollNo: {
    type: Number,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid 10-digit phone number!`
    },
  },
  addedBy: { type: String, ref: 'teacher' } // Reference to the teacher's email who added the student

}, {
  timestamps: true
});

const Student = mongoose.model('student', studentSchema);
module.exports = Student;
