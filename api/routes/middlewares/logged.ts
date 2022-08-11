import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()

const logged: RequestHandler = async (req, res, next) => {
  if (!req.cookies && req.cookies === undefined) {
    res.locals.error = 'Cookies not found'
    next()
  }
  const {token} = req.cookies
  if (token) {
    const decoded = jwt.verify(JSON.parse(token), process.env.JWT_SECRET as string)
    console.log(decoded)
    res.locals.decoded = decoded 
    next()
  } else {
    res.locals.error = 'Auth token not found'
    next()
  }
}

export default logged
