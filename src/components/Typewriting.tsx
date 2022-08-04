import React, { useEffect, useRef } from 'react'
import 'styles/Typewriting.scss'

type props = {text: string, clase: string, delay: number}

export default function Typewriting ({text, clase, delay}:props) {
  const Container = useRef < any > (null)
  const Check = useRef < any > (null)

  useEffect(() =>{
    setTimeout(() => {
      Check.current.checked = true
      Check.current.setAttribute('readonly', '')
      Container.current.classList.add('checked')
    }, delay)
  })

  return (
    <div className='container'>
      <input ref={Check} disabled type="checkbox" />
      <span>
        <p ref={Container} className={`puno ${clase}`}>{text}</p>
      </span>
    </div>
  )
}
