import { useNavigate } from "react-router-dom";
import back from 'assets/images/back.svg'

type Props = { to: string}

export default function ({to}: Props) {
  const navigate = useNavigate()
    return <img className='backbtn' src={back} title='Go back' onClick={()=> navigate(to)} alt='Go back'/>
}