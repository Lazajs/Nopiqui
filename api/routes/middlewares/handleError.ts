import { ErrorRequestHandler } from 'express'

type ErrorCase = { type: 'auth' | 'missing' | 'conflict' | 'bad' }

const handleError: ErrorRequestHandler = (error: ErrorCase, req, res, next) => {
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
		res.status(444).send({error: 'No response'})
	}
}

export default handleError