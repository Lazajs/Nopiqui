import { NoteType } from "types"

type Props = {
  title: string,
  content: string,
  userId: string,
  id: string
}

export default function () {
  const request = async ({title, content, userId, id} : Props): Promise<NoteType> => {
    const OPTIONS = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title, content, userId, id}),
      credentials: 'include'
    } as RequestInit

    const response = await fetch('http://127.0.0.1:3001/notes', OPTIONS)
    const json = await response?.json()


    return json !== undefined ? json : response
  } 

  return request
} 