export interface NoteType {
  title: string,
  content?: string,
  archived: boolean,
  created: string,
  userId: string,
}

export interface UserData {
  username: string,
  passwordHash: string,
  creation: string,
  id: string,
  _id?: string
  notes: NoteType[] | Array,
  archive: NoteType[] | Array,
}