import './styles/share.scss'
import { useEffect, useState } from 'react'

export default function Share () {
	const [copied, setCopied] = useState(false)

	const handleClick = () => {
		navigator.clipboard.writeText('Hey! check out this interesting note that I found ' + window.location.href)
			.then(res => setCopied(true))
			.catch(console.log)
	}

	useEffect(()=> {
		if (copied) {
			setTimeout(()=> {
				setCopied(false)
			}, 1200)
		}
	},[copied])

	return (
		<>
			<button onClick={handleClick}>Share this note &#8599;</button>
			{copied ? <div className='popup'><p>Link copied to clipboard</p></div> : ''}
		</>
	)
}