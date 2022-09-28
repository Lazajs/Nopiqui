import { Router } from 'express'
import logged from './middlewares/logged'
import NotesModel from '../db/models/Note'

const router = Router()

router.get('/:id', logged, async (req,res, next) => {
	const {id} = req.params
	if (id === undefined) next({type: 'bad'})
	const self = await NotesModel.findById(id)
	if (!self) next({type: 'missing'})
	else {
		self.archived = self.archived === true ? false : true
		await self.save()
		res.status(201).end()
	}
})

export default router