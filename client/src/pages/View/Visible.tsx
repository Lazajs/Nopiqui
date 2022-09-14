import {NoteType} from 'types'
import draftToHTML from 'draftjs-to-html'

type Props = {
  data?: NoteType
}

export default function ({data}: Props) {
  const {title, content} = data as any

  const titleMarkup = draftToHTML(JSON.parse(title))
  const contentMarkup = draftToHTML(JSON.parse(content))

  return (
    <section className='visualize'>
      <h1 className='title' dangerouslySetInnerHTML={{__html: titleMarkup}}></h1>
      <div className='content' dangerouslySetInnerHTML={{__html: contentMarkup}}></div>
    </section>
  )
}