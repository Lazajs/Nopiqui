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

export type JWT = {jwt: string}