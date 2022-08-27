import './styles/Add.scss'
import plus from 'assets/images/add.svg'
import { Link } from 'react-router-dom'

export default function Add () {
  //send to text editor
  return (
    <Link to={'/home/:user/create '}>
      <div className='new box'>
        <img alt='add note' src={plus} />
        <p>Add new...</p>
      </div>
    </Link>
  )
}