const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "email is required"],
    },
    act_type: {
      type: String,
      required: [true, "act_type is require"],
    },
    act_name: {
      type: String,
      required: [true, ""],
    },
    act_desc: {
      type: String,
      required: [true, ""],
    },
    duration: {
      type: Number,
      required: [true, ""],
    },
    cal_burn: {
      type: Number,
      required: [true, ""],
    },
    kg_burn: {
      type: Number,
      required: [true, ""],
    },
    cur_weight: {
      type: Number,
      required: [true, ""],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", ActivitySchema);
