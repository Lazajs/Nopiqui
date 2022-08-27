import { useReducer } from "react"
import {RegisterDT} from 'types'

type ActionType = {type: 'username' | 'password', payload: string}
export default function useForm() {
  function reducer (state: RegisterDT, action: ActionType) {
  const {type, payload} = action

  switch (type) {
    case 'username':
      return {...state, username: payload}
    case 'password':
      return {...state, password: payload}
    default:
      return state
  }
}


  return useReducer(reducer, {username: '', password: ''})
}