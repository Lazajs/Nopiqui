import handwriting from 'assets/images/handwriting.jpg'
import 'pages/Preview/styles/Main.scss'
import { Link } from 'react-router-dom'

export default function Main () {
  return (
    <main className='container'>
      <img alt='hand drawing' className='image' src={handwriting}/>
      
    <span className='action'>
        <h3>Get yourself organized in the simplest form</h3>
        <b>&darr;</b>
        <Link to='/register'><button>Sign up - It's free</button></Link>
      </span>
    </main>
  )
}