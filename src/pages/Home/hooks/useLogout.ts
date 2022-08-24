export default function useLogout () {
    
  const request = async () =>{
      const OPTIONS = {
        method:'GET',
        credentials: 'include'
      } as RequestInit

      const send = await fetch('http://127.0.0.1:3001/logout', OPTIONS)
      return send
  }

  return request

}