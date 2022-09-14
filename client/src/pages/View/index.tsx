import React,{useState, useEffect} from 'react'
import { NoteType } from 'types'
import { useLocation } from 'react-router-dom'
import useSingleNote from './hooks/useSingleNote'
import Visible from './Visible'
import Spinner from 'components/Spinner'
import './styles/index.scss'
import back from 'assets/images/back.svg'
import { useNavigate } from 'react-router-dom'

export default function () {
  const [data, setData] = useState<NoteType>()
  const location = useLocation()
  const navigate = useNavigate()
  const noteId = location.pathname.split('/').at(-1)
  const getNote = useSingleNote() 
  
  useEffect(()=> {
    getNote({noteId}).then((res: NoteType)=> setData(res))
    //HANDLE ERROR
  }, [])

  return (
    <main className='wrapper'>
      <div className='tools'>
        <img src={back} onClick={()=> navigate(-1)} alt='Go back'/>
      </div>
      {data ? <Visible data={data}/> : <Spinner/>}
    </main>
  )
}