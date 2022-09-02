import { UserLogInData } from "types";

const PORT = 3001

export default function useRegisterUser () {
  return async (data: UserLogInData) => {
    const OPTIONS = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const request = await fetch(`http://127.0.0.1:${PORT}/register`, OPTIONS)
    return request 
  }
}