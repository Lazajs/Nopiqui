import { RegisterDTFormData } from "types";

const PORT = 3001

export default function useLoginUser () {
  return async (data: RegisterDTFormData) => {
  const OPTIONS = {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    } as RequestInit
    const request =  fetch(`http://127.0.0.1:${PORT}/login`, OPTIONS)
    return request
  }
}