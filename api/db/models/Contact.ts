import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  email: String,
  text: String
})

const Contact = mongoose.model('contact', ContactSchema)

export default Contact