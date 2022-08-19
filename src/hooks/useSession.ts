import {useState, useEffect} from "react";
import { DataForUser, Error } from "types";

export default function useSession () {
  const [user, setUser] = useState<DataForUser | Error>()

  useEffect(()=>{
    const request = async () => {
      const OPTIONS = {
        method: 'GET',
        credentials: 'include'
      } as RequestInit

    const send = await fetch('http://127.0.0.1:3001/', OPTIONS)
    const json = await send.json()

    if (json?.error !== undefined) {
      setUser({error: json.error, username:undefined, notes: undefined})
    } else setUser(json)
  }

  request()
    .catch(console.log)

  },[])

  return {user}
}