import { Router } from 'express'
import notesModel from '../db/models/Note'
import UserModel from '../db/models/User'
import logged from './middlewares/logged'
import {  UserData } from '../types'
import populate from './middlewares/populate'
import archive from './archive'
import {isLogged} from './middlewares/logged'

interface ToSave extends UserData {
  save: () => Promise<void>
}

const router = Router()

router.use('/archive', archive)

router.get('/' , logged, populate, (req, res, next) => {
	const populated = res.locals?.populated
  
	if (populated !== undefined) {
		res.status(200).send(populated).end()
	} else {
		next({type: 'auth'})
	}
})



router.get('/:id',isLogged, async (req,res, next) => {

	if (req.params.id === '') next({type: 'bad'})
	const findIt = await notesModel.findById(req.params.id)
	if (findIt) {
		if (findIt.archived === true && res.locals.logged === true) {
			res.send(findIt)
		} else if (!findIt.archived){
			res.send(findIt)
		} else if (findIt.archived && !res.locals.logged) {
			next({type: 'auth'})
		}
	} else {
		next({type: 'missing'})
	}

})

router.post('/create', logged, async (req,res, next) => {
	const {userId, content, title} = req.body
	const isEqualExistent = await notesModel.findOne({title, content})
	const foundUser = await UserModel.findById(userId)

	if (isEqualExistent !== undefined && isEqualExistent?.content === content && isEqualExistent?.title === title) {
		next({type: 'conflict'})
	} else if (foundUser !== undefined && foundUser?.notes !== undefined) {
		const created = new notesModel({userId: userId, content: content, title: title, archived: false, created: new Date().toLocaleDateString()})
		const {_id} = created as any
		foundUser.notes = foundUser.notes.concat(_id)
		await foundUser.save()
		await created.save()

		res.send(created).status(201)
	} else {
		next({type: 'auth'})
	}
})

router.delete('/:noteId', logged, async (req, res, next) => {
	const {noteId} = req.params
	const isDeleted = await notesModel.findByIdAndDelete(noteId)

	if (isDeleted && isDeleted?.userId !== undefined) {
		const owner = await UserModel.findById(isDeleted.userId) as ToSave

		const newOnes = owner.notes.filter((e: string) => {
			return String(e) !== noteId
		})

		owner.notes = newOnes
		await owner.save()
		res.status(200).end()

	} else {
		next({type: 'missing'})
	}

})

router.put('/', logged, async (req, res, next) => {
	const {body} = req
	const {title, content, id} = body
	const edited = await notesModel.findByIdAndUpdate(id, {title: title, content: content }, {new: true})
	if (edited?.id !== undefined) {
		res.send(edited).status(201).end()
	} else next({type: 'missing'})
})

export default router