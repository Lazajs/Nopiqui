export interface NoteType {
  title: string,
  content?: string
}

export interface UserData {
  username: string,
  passwordHash: string,
  creation: string,
  id: string,
  notes: NoteType[] | Array,
  archive: NoteType[] | Array
}