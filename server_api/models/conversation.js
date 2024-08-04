const mongoose = require("mongoose");
const validator = require("validator");

const conversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Conversation = new mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;
