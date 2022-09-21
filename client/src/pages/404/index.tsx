import whiteboard from 'assets/images/whiteboard.svg'
import { Link } from 'react-router-dom'
import './styles/index.scss'

export default function () {
  return (
    <section className='error'>
      <h2>404</h2>
      <p className='text'>just a whiteboard</p>
      <img src={whiteboard} alt="Empty sheet" />
      <p className='text'>There's nothing here :(</p>
      <Link to='/'><button className='return' >Go Back</button></Link>
    </section>
  )
}