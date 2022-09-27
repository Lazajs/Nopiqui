import './styles/Add.scss'
import plus from 'assets/images/add.svg'

export default function Add () {
	return (
    
		<div className='new box'>
			<img alt='add note' src={plus} />
			<p>Add new...</p>
		</div>
  
	)
}