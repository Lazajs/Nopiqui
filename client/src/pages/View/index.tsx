import React,{useState, useEffect} from 'react'
import { NoteType } from 'types'
import { useLocation, useParams } from 'react-router-dom'
import useSingleNote from './hooks/useSingleNote'
import Visible from './Visible'
import Spinner from 'components/Spinner'
import './styles/index.scss'
import NoteOptions from 'components/NoteOptions'
import Back from 'components/Back'

export default function () {
  const [data, setData] = useState<NoteType>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {noteId} = useParams()
  const getNote = useSingleNote() 
  
  useEffect(()=> {
    getNote({noteId}).then((res: NoteType)=> setData(res))
    //HANDLE ERROR
  }, [])

  if (isLoading) return (
    <div className='box spinning'>
      <p>Deleting...</p>
    </div>
  )
  return (
    <main className='wrapper'>
      <div className='tools'>
        <Back to='/home' />
        <NoteOptions loading={setIsLoading} id={noteId as string} />
      </div>
      {data ? <Visible data={data}/> : <Spinner/>}
    </main>
  )
}