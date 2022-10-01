import Router from 'express'

const router = Router()

router.get('/', (req,res,next)=> {
	next({type: 'Missing'})
})

export default router