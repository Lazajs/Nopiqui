import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const CONNECTION_STRING: string = process.env.CONNECTION_STRING as string

export default mongoose.connect(CONNECTION_STRING)
