import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  passwordHash: String,
  created: String,
  // notes: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Note'
  // }]
})


userSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const User = mongoose.model('User', userSchema)

export default User