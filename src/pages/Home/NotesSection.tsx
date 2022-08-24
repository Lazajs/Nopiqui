import { NoteType } from "types"
import Note from "./Note"
import Add from "./Add"
import './styles/NotesSection.scss' 

export default function NotesSection () {
  const tempNotes: NoteType[] = [
    {
      title: 'Primera Nota',
      content: 'LAKLSDJ AJJAF iwqeur adfh asdf aklsdkf j al j'
    },
    {
      title: 'Segunda nota',
      content: 'LAKLSDJ AJJAF iwqeur adfh asdf aklsdkf j al j'
    },
    {
      title: 'Tercera nota',
      content: 'alshdf;lasdhf'
    }
  ]

  return (
    <main className="main">
      {
        tempNotes.map((e, i) =>{
          return <Note title={e.title} content={e?.content} key={i} />
        })
      }
      <Add />
    </main>
  )
}