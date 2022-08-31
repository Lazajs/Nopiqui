import { RequestHandler } from "express";
import UserModel from "../../db/models/User";
import '../notes'

const populate: RequestHandler = async (req, res, next) => {
  if (res.locals?.decoded !== undefined) {
    const decoded = res.locals.decoded
    const populated = await UserModel.findOne({decoded}).populate('notes')
    res.locals.populated = populated
    next()
  } else {
    res.status(401).send({error: 'Session expired. Please Log In to continue'})
  }
}

export default populate