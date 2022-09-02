import {useState, useEffect} from "react";
import { UserLogged } from "types";

export default function useSession () {
  const [user, setUser] = useState<UserLogged>()

  useEffect(()=>{
    const request = async () => {
      const OPTIONS = {
        method: 'GET',
        credentials: 'include'
      } as RequestInit

    const send = await fetch('http://127.0.0.1:3001/', OPTIONS)
    const json = await send.json()
    if (json?.error !== undefined) {
      setUser({id: '', error: json.error, username: '', notes: [], archive:[]})
    } else {
      const {...data}: UserLogged = json
      setUser(data)
    }
  }

  request()
    .catch(console.log)

  },[])

  return {user}
}