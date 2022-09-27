import { RequestHandler } from 'express'
import UserModel from '../../db/models/User'
import '../notes'

const populate: RequestHandler = async (req, res, next) => {
	if (res.locals?.decoded !== undefined) {
		const decoded = res.locals.decoded
		const populated = await UserModel.findById(decoded.id).populate('notes')
		res.locals.populated = populated
		next()
	} else {
		next({type: 'auth'})
	}
}

export default populate