type Props = {
  noteId?: string
}

export default function () {
    const request = async ({noteId}: Props) =>{
      const result = await fetch(`http://127.0.0.1:3001/notes/${noteId}`)
      const json = await result.json()

      if (json?.error !== undefined) {
        console.log(json.error)
    }
    
    return json

  }
  return request
}