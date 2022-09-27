import 'pages/Preview/styles/Pricing.scss'
import React, { useEffect, useState } from 'react'
import useSendMessage from 'pages/Preview/hooks/useSendMessage'

type Invalid = {
  type: 'email' | 'text' | 'success' | 'unsuccess' | undefined,
  message: string
}

export default function Pricing () {
	const [email, setEmail] = useState<string>('')
	const [text, setText] = useState<string>('')
	const [invalid, setInvalid] = useState<Invalid>()
	const [success, setSuccess] = useState<boolean>(false)
	const send = useSendMessage()

	useEffect(() =>{
		if (success) {
			setInvalid({type: undefined, message: ''})
			setText('')
			setEmail('')
		}
	}, [success])

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault()
		if (email.length <= 0 || !email.includes('@') || !email.includes('.')) setInvalid({type: 'email', message: 'Your email is invalid.'})
		else if (text.length <= 0) setInvalid({message: 'Please, enter a message', type:'text'})
		else if (text.length > 0 && email.length > 0 && email.includes('@') && email.includes('.')) {
			send({email,text})
				.then(res => res.ok ? setSuccess(true) : res.json())
				.then(res => setInvalid({type: 'unsuccess', message: res.message}))
				.catch(console.log)
		}
	}

	return (
		<article id='pricing' className="pricing">
			<h2>Pricing</h2>
			<p>Good news for you: <i>Nopiqui</i> is completly <b>free</b>!</p>
			<p>Want to <span>contact us</span> anyway?</p>
			<form onSubmit={handleSubmit} className="contact">
				<input value={email} onChange={({target})=> setEmail(target.value)} type="email" placeholder="your@email.com" />
				{invalid?.type === 'email' ? <p className='invalid'>{invalid.message}</p> : ''}
				<textarea value={text} onChange={({target})=> setText(target.value)} placeholder="Your message"></textarea>
				{invalid?.type === 'text' ? <p className='invalid'>{invalid.message}</p> : ''}
				{!success ? <button>Get in touch</button> : ''}
				{success ? <p className='success'>Success! Your message has been sent</p> : ''}
				{invalid?.type === 'unsuccess' ? <p className='invalid'>{invalid.message}</p> : ''}
			</form>
		</article>
	)
}