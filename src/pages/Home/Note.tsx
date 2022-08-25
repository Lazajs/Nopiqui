
import {NoteType} from 'types'
import './styles/Note.scss'
import { useNavigate } from 'react-router-dom'
import dots from 'assets/images/dots.svg'
import React, { useState } from 'react'

type Elements = HTMLImageElement | HTMLElement
export default function Note ({title, content} : NoteType) {
  const navigate = useNavigate()
  const [options, toggleOptions] = useState<boolean>(false)


  const handleClick = (e: React.SyntheticEvent) =>{
    const target: Elements = e.target as Elements
    if (target.classList.contains('option')) {
      toggleOptions(prev => !prev)
    } else if (target.classList.contains('options-box')) {
      return
    } else if (target.classList.contains('single')) {
      return
    } else {
      navigate('/home/:user/note/:id')
    }
  }

  return (
      <div onClick={handleClick} className='box'>
        <span className='title'>
          <h4>{title}</h4>
        </span>
        <span className='content'>
          {content}
        </span>
        <img src={dots} alt="Options" className='option' />
        {
          options ? 
          <div className='options-box'>
            <p className='single'>Delete</p>
            <p className='single'>Archive</p>
          </div>
                  : ''
        }
      </div>
  )
}