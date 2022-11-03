import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const logged: RequestHandler = async (req, res, next) => {
	if (!req.cookies && req.cookies === undefined) next({type: 'redirect'})
  
	const {token} = req.cookies
	if (token) {
		const decoded = jwt.verify(JSON.parse(token), process.env.JWT_SECRET as string)
		res.locals.decoded = decoded 
		next()
	} else {
		next({type: 'redirect'})
	}
}

const isLogged: RequestHandler = async (req, res, next) => {
	if (req.cookies && req.cookies.token !== undefined) {
		const {token} = req.cookies
		const decoded = jwt.verify(JSON.parse(token), process.env.JWT_SECRET as string)
		res.locals.logged = decoded ? true : false
	}
	next()
}

export {isLogged}
export default logged
