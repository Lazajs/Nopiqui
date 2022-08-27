import './styles/Add.scss'
import plus from 'assets/images/add.svg'
import { Link } from 'react-router-dom'
import { UserLogged } from 'types'

type Props = {
  info: UserLogged
}

export default function Add ({info}: Props) {
  //send to text editor
  const {username} = info
  return (
    <Link to={`/home/${username}/create`}>
      <div className='new box'>
        <img alt='add note' src={plus} />
        <p>Add new...</p>
      </div>
    </Link>
  )
}