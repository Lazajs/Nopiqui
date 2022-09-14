import React,{useState, useEffect} from 'react'
import { NoteType } from 'types'
import { useLocation } from 'react-router-dom'
import useSingleNote from './hooks/useSingleNote'
import Visible from './Visible'
import Spinner from 'components/Spinner'
import './styles/index.scss'
import { useNavigate } from 'react-router-dom'
import NoteOptions from 'components/NoteOptions'
import Back from 'components/Back'

export default function () {
  const [data, setData] = useState<NoteType>()
  const location = useLocation()
  const noteId = location.pathname.split('/').at(-1) as string
  const getNote = useSingleNote() 
  
  useEffect(()=> {
    getNote({noteId}).then((res: NoteType)=> setData(res))
    //HANDLE ERROR
  }, [])

  return (
    <main className='wrapper'>
      <div className='tools'>
        <Back />
        <NoteOptions id={noteId} />
      </div>
      {data ? <Visible data={data}/> : <Spinner/>}
    </main>
  )
}