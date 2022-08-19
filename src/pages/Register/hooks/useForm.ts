import { useReducer } from "react";
import {RegisterDT} from 'types'

type ActionType = {type: 'username' | 'password' | 'confirmed', payload: string}


export default function useForm () {
  function reducer (state: RegisterDT, action: ActionType) {
    switch (action.type) {
      case 'username':
        return {...state, username: action.payload}
      case 'password':
        return {...state, password: action.payload}
      case 'confirmed': 
        return {...state, confirmed: action.payload}
      default:
        return state
    }
  }

  return useReducer(reducer, {username: '', password: '', confirmed: ''})

}