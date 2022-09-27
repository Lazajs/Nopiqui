import {Router} from 'express'
import Contact from '../db/models/Contact'
import { UserData } from '../types'

const router = Router()

router.post('/', async (req,res, next) => {
	const {text, email} = req.body

	if (text === undefined||email === undefined) next({type: 'bad'})

	const check = await Contact.find({email}) as UserData[]
	const found = check[0]
	if (found !== undefined && found._id !== undefined) next({type: 'conflict'})
  
	const Message = new Contact({email: email, text: text})
	await Message.save()
	res.status(201).end()

})

export default router