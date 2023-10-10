const ActivitySchema = require("../models/ActivityModels");
const mongoose = require("mongoose");

//AddActivity
exports.addACtivityController = async (req, res) => {
  try {
    const {
      email,
      act_type,
      act_name,
      act_desc,
      duration,
      cal_burn,
      kg_burn,
      cur_weight,
    } = req.body;
    //VALIDATION
    if (!email || !act_type || !duration) {
      return res.status(400).json({
        success: false,
        message: "Please Provide ALl Fields",
      });
    }
    const newAcitivity = new ActivitySchema({
      email,
      act_type,
      act_name,
      act_desc,
      cal_burn,
      kg_burn,
      cur_weight,
    });
    return res.status(200).json({
      success: true,
      message: "Successfully..",
      newAcitivity,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "ERROR to ADD acitivity",
      error,
    });
  }
};
