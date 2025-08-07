const mongoose = require("mongoose");

const FixMyTeethSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  selectedProblems: { type: [String], required: true },
  selectedState: { type: String, required: true },
  otherProblemText: { type: String, default: "" },
  photoUrls: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

const teethModel = mongoose.model("FixMyTeeth", FixMyTeethSchema);
module.exports = teethModel;
