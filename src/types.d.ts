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
  notes: Array<null>
}

export type JWT = {jwt: string}