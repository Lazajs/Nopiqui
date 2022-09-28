type Params = {
  id: string
}

export default function useDeleteNote () {
	return async ({id}: Params) =>{
		const OPTIONS = {
			method: 'DELETE',
			credentials: 'include'
		} as RequestInit

		const request = await fetch(`/notes/${id}`, OPTIONS)
		return request
	}
}