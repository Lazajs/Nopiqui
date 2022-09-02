type Params = {
  id: string
}

export default function useDeleteNote () {
  return async ({id}: Params) =>{
    const OPTIONS = {
      method: 'DELETE',
      credentials: 'include'
    } as RequestInit

    const request = await fetch(`http://127.0.0.1:3001/notes/${id}`, OPTIONS)
    console.log(request)
    return request
  }
}