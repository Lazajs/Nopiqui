export interface UserLogInData  {
  username: FormDataEntryValue | null,
  password: FormDataEntryValue | null
}
export interface NoteType {
  title: string,
  content?: string,
  created?: string,
  archived?: boolean,
  id: string,
  userId?: string
}

export interface UserLogged {
  username: string,
  notes: NoteType[] | Array,
  archive: NoteType[] | Array,
  id: string,
  error?:string
}

export interface LogUser  {
  logged: UserLogged,
  setLogged: React.Dispatch<React.SetStateAction<UserLogged>>
}
