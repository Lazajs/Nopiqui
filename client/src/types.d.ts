export interface RegisterDT {
  username: string,
  password: string,
  confirmed?: string
}

export interface RegisterDTFormData {
  username: FormDataEntryValue | null,
  password: FormDataEntryValue | null
}

export interface LoginDT {
  username: string, 
  password: string
}

export interface DataForUser {
  username: string,
  notes: Array<null>,
  id: string,
  error?: string
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
  id: string
}

export type Error = {error: string, username: any, notes: any, archive: any, id: any}
export type JWT = {jwt: string}