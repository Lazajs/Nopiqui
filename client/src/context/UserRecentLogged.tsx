import {createContext, useState, useEffect} from "react";
import {UserLogged} from 'types'
import useSession from 'hooks/useSession'

type Props = {children: JSX.Element}

const UserRecentLoggedCTX = createContext({})

export default function UserProvider ({children}: Props) {
  const [logged, setLogged] = useState<UserLogged>({username:'', id: '', notes: [], archive:[]})
  const {user} = useSession()
  
  useEffect(()=> {
    user?.id !== undefined  ? setLogged(user)
                            : setLogged(logged)
  },[user])


  return (
    <UserRecentLoggedCTX.Provider value={{logged, setLogged}}>
      {children}
    </UserRecentLoggedCTX.Provider>
  )
}

export {UserRecentLoggedCTX}