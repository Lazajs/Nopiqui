import { Router } from "express";
import notesModel from '../db/models/Note'
import UserModel from "../db/models/User";
import logged from "./middlewares/logged";

const router = Router()

router.post('/create', logged, async (req,res) => {
  const {userId, content, title} = req.body
  const isEqualExistent = await notesModel.findOne({content, title})
  const foundUser = await UserModel.findById(userId)

  if (isEqualExistent !== undefined && isEqualExistent?.content === content && isEqualExistent?.title === title) {
    res.send({error: 'Note has not been modified'}).status(304).end()
  } else if (foundUser !== undefined && foundUser?.notes !== undefined) {
    const created = new notesModel({userId: userId, content: content, title: title, archived: false, created: new Date().toLocaleDateString()})
    const {_id}: any = created
    foundUser.notes = foundUser.notes.concat(_id)
    await foundUser.save()
    await created.save()

    res.send(created).status(201)
  } else {
    res.send({error: 'Session expired, please Log In.'}).status(401).end()
  }
})

router.delete('/:noteId', logged, async (req, res) => {
  const {noteId} = req.params
  const isDeleted = await notesModel.findByIdAndDelete(noteId)

  if (isDeleted && isDeleted.userId) {
    const owner: any = await UserModel.findById(isDeleted.userId)

    const newOnes = owner.notes.filter((e: string) => {
       return String(e) !== noteId
      })

      owner.notes = newOnes
      await owner.save()
      res.status(200).end()

   } else {
    res.status(404).end()
   }

})


export default router