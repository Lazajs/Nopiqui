import Note from './Note'
import { NoteType } from 'types'

type Props = {
  notes: NoteType[]
} 

export default function NoteList ({notes}: Props) {
	return (
		<>
			{
				notes.map((e: NoteType) =>{
					return <Note title={e.title} content={e?.content} id={e.id} key={e.id} />
				})
			}
		</>
	)
}