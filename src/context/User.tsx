import {createContext} from "react";
import {UserLogged} from 'types'
import useSession from 'hooks/useSession'

type Props = {children: JSX.Element}

const UserCTX = createContext({username:'', id: '',notes:[], archive: []} as UserLogged | undefined)

export default function UserProvider ({children}: Props) {
  const {user} = useSession()

  return (
    <UserCTX.Provider value={user}>
      {children}
    </UserCTX.Provider>
  )
}

export {UserCTX}