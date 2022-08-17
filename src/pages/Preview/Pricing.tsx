import 'pages/Preview/styles/Pricing.scss'
import React, { useState } from 'react'

export default function Pricing () {
  const [email, setEmail] = useState<string>('')
  const [text, setText] = useState<string>('')

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    //magic, send the email
  }

  return (
    <article id='pricing' className="pricing">
      <h2>Pricing</h2>
      <p>Good news for you: <i>Nopiqui</i> is completly <b>free</b>!</p>
      <p>Want to <span>contact us</span> anyway?</p>
      <form onSubmit={handleSubmit} className="contact">
        <input value={email} onChange={({target})=> setEmail(target.value)} type="email" placeholder="your@email.com" />
        <textarea value={text} onChange={({target})=> setText(target.value)} placeholder="Your message"></textarea>
        <button>Get in touch</button>
      </form>

    </article>
  )
}