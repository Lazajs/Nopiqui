import { useNavigate } from "react-router-dom";
import back from 'assets/images/back.svg'

export default function () {
  const navigate = useNavigate()
    return <img className='backbtn' src={back} title='Go back' onClick={()=> navigate(-1)} alt='Go back'/>
}