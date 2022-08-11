import React, {useState, useEffect} from "react";
import { DataForUser } from "types";

export default function useSession () {
  const [user, setUser] = useState<DataForUser>()

  useEffect(()=>{
    const request = async () => {
      const OPTIONS = {
        method: 'GET',
        credentials: 'include'
      } as RequestInit

    const send = await fetch('http://127.0.0.1:3001/login', OPTIONS)
    const json = await send.json()
    if (json?.error !== undefined) {
      console.log(json.error)
    } else setUser(json)
  }

    request()
      .catch(console.log)

  },[])

  return {user}
}