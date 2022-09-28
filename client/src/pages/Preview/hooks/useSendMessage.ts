type Props = {
  email: string,
  text: string
}

export default function useSendMessage () {
  
	return async ({email,text} : Props) => {
		const OPTIONS = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({email, text})
		}

		const request = await fetch('/contact', OPTIONS)
		return request
	}
}