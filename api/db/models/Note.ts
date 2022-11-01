import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema({
	title: {type: String, required: true},
	content: String,
	userId: {type: String, required: true},
	created: {type: String, required: true},
	archived: {type: Boolean, required: true},
	author: {type: String, required: true}
})


noteSchema.set('toJSON', {
	transform: (doc, returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
	}
})

export default mongoose.model('Note', noteSchema) 