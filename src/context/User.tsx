import {createContext} from "react";
import {DataForUser} from 'types'
import useSession from 'hooks/useSession'

type Props = {children: JSX.Element}

const UserCTX = createContext({username:'', notes:[]} as DataForUser | undefined )

export default function UserProvider ({children}: Props) {
  const {user} = useSession()
  // const [info, setInfo] = useState<DataForUser | undefined>()

  return (
    <UserCTX.Provider value={user}>
      {children}
    </UserCTX.Provider>
  )
}

export {UserCTX}