import {createContext, useState} from "react";
import {UserLogged} from 'types'

type Props = {children: JSX.Element}

const UserRecentLoggedCTX = createContext({})

export default function UserProvider ({children}: Props) {
  const [logged, setLogged] = useState<UserLogged>({username:'', id: '', notes: [], archive:[]})

  return (
    <UserRecentLoggedCTX.Provider value={{logged, setLogged}}>
      {children}
    </UserRecentLoggedCTX.Provider>
  )
}

export {UserRecentLoggedCTX}