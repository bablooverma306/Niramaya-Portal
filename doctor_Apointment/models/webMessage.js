import mongoose from "mongoose";

const webmessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'name is required'] },
    contact: { type: String, required: [true, "contect number or email is required"] },
    message: { type: String, required: [true, "message is required"] },
  },
  { timestamps: true }
);

const webMessageModel = mongoose.model('webMessage', webmessageSchema);

export default webMessageModel;