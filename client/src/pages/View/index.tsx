import { useState, useEffect, useContext } from 'react'
import { NoteType, LogUser } from 'types'
import useSingleNote from './hooks/useSingleNote'
import Visible from './Visible'
import Spinner from 'components/Spinner'
import './styles/index.scss'
import NavView from 'components/NavView'
import { useParams } from 'react-router-dom'
import { UserRecentLoggedCTX } from 'context/UserRecentLogged'
import { Link } from 'react-router-dom'
import whiteboard from 'assets/images/whiteboard.svg'
import Loading from './Loading'
import Share from './Share'

export default function View () {
	const {logged} = useContext(UserRecentLoggedCTX) as LogUser
	const [data, setData] = useState<NoteType>()
	const getNote = useSingleNote() 
	const {noteId} = useParams()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<any>()

	useEffect(()=> {
		getNote({noteId})
			.then((res: NoteType)=> {
				if (res.id) setData(res)
				else setError(res)			
			})
			.catch(console.log)
	}, [])

	
	if (error) return (
		<aside className='error'>
			<h3>Sorry, this note is not available</h3>
			<p>It may have been deleted or archived by the author.</p>
			<img alt='white paper' src={whiteboard}/>
			<Link to='/'><button className='return'>Go Home</button></Link>
		</aside>
	)

	return (
		<>
			{data && data.userId && logged && logged.id === data.userId ? <NavView toggleLoading={setIsLoading} /> : <h2 className='water'>Created with Nopiqui</h2>}
			{	isLoading  ? <Loading /> :
				<main className='wrapper'>
					<Share />
					{data ? <Visible data={data}/> : <Spinner/>}
				</main>
			}
		</>

	)
}