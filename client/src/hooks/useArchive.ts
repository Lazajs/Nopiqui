export default function useArchive () {
	return async ({id}: {id: string}) =>{
		const OPTIONS = {
			method: 'GET',
			credentials: 'include'
		} as RequestInit

		const request = await fetch(`/notes/archive/${id}`, OPTIONS)
		return request
	}
}