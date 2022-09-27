import {Router} from 'express'
import dayjs from 'dayjs'

const router = Router()

router.get('/', (req, res) => {
	res.cookie('token', '', {
		httpOnly: true,
		expires: dayjs().millisecond(1).toDate(),
		sameSite: 'none',
		secure: true
	}).header('Access-Control-Allow-Credentials', 'true').status(200).end()
})

export default router