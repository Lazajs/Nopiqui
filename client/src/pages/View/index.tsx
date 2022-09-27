import { useState, useEffect } from 'react'
import { NoteType } from 'types'
import useSingleNote from './hooks/useSingleNote'
import Visible from './Visible'
import Spinner from 'components/Spinner'
import './styles/index.scss'
import NavView from 'components/NavView'
import { useParams } from 'react-router-dom'

export default function View () {
	const [data, setData] = useState<NoteType>()
	const getNote = useSingleNote() 
	const {noteId} = useParams()
	const [isLoading, setIsLoading] = useState<boolean>(false)

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
		<>
			<NavView toggleLoading={setIsLoading} />
			<main className='wrapper'>
				<div className='tools'></div>
				{data ? <Visible data={data}/> : <Spinner/>}
			</main>
		</>

	)
}