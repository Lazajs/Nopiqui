import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	username: String,
	passwordHash: String,
	notes: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Note'
	}]
})


userSchema.set('toJSON', {
	transform: (doc, returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.passwordHash
	}
})

const UserModel = mongoose.model('User', userSchema)

export default UserModel