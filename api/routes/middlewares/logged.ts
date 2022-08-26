import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()

const logged: RequestHandler = async (req, res, next) => {
  if (!req.cookies && req.cookies === undefined) res.status(401).send({error: 'Session expired, Please Log In to continue'})
  
  const {token} = req.cookies
  if (token) {
    const decoded = jwt.verify(JSON.parse(token), process.env.JWT_SECRET as string)
    res.locals.decoded = decoded 
    next()

  } else {
    res.status(401).send({error: 'Session expired, Please Log In to continue'})
  }
}

export default logged
