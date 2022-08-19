type Props = {
  email: string,
  text: string
}

const PORT = 3001

export default function useSendMessage () {
  
  return async ({email,text} : Props) => {
    const OPTIONS = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, text})
  }

    const request = await fetch(`http://127.0.0.1:${PORT}/contact`, OPTIONS)
    return request
  }
}