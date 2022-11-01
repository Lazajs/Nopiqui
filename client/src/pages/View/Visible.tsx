import {NoteType} from 'types'
import draftToHTML from 'draftjs-to-html'
import Helmet from 'react-helmet'

type Props = {
  data?: NoteType
}

export default function Visible ({data}: Props) {
	const {title, content, created, author} = data as any

	const parsedTitle = JSON.parse(title).blocks[0].text
	const parsedContent =JSON.parse(content).blocks[0].text
	const titleMarkup = draftToHTML(JSON.parse(title))
	const contentMarkup = draftToHTML(JSON.parse(content))
	return (
		<section className='visualize'>

			<Helmet> 
				<title>Nopiqui | {parsedTitle}</title> 
				<meta name="description" content={parsedContent ? parsedContent : 'Note created with Nopiqui.'} />
			</Helmet>
			<footer className='information'>
				<small>{created}</small>
				<b>By {author}</b>
			</footer>

			<h1 className='title' dangerouslySetInnerHTML={{__html: titleMarkup}}></h1> 
			<div className='content' dangerouslySetInnerHTML={{__html: contentMarkup}}></div>

		</section>
	)
}