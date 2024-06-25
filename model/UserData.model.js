const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema(
  {
    student_name: {
      type: String,
      required: true,
      trim: true,
    },
    student_enrollment_no: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
    },
    student_class: {
      type: String,
      required: true,
    },
    student_Mobile_number: {
      type: Number,
      required: true,
      trim: true,
    },
    student_fee_allotted: {
      type: Number,
      required: true,
    },
    student_1_installment: {
      type: Number,
      // required: true,
    },
    student_2_installment: {
      type: Number,
      // required: true,
    },
    student_3_installment: {
      type: Number,
      // required: true,
    },
    student_4_installment: {
      type: Number,
      // required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userData",userDataSchema);
