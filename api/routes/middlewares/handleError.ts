import { ErrorRequestHandler } from 'express'
import path from 'path'

type ErrorCase = { type: 'auth' | 'missing' | 'conflict' | 'bad' }

const handleError: ErrorRequestHandler = (error: ErrorCase, req, res, _next) => {
	switch (error?.type){
	case 'auth': 
		res.status(401).send({error: 'Action not authorized'})
		break
	case 'missing':
		res.status(404).send({error: 'Requested document not found'})
		break
	case 'conflict':
		res.status(409).send({error: 'Already existent'})
		break
	case 'bad':
		res.status(400).send({error: 'Bad at request'})
		break
	default: 
		res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))                  
	}
}

export default handleError