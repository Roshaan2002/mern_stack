const { Schema, model } = require("mongoose");

const serviceSchema = new Schema({
  service: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  videoLink: {
    type: String,
    required: false,
  },
});

const Service = model("Services", serviceSchema);

module.exports = Service;
