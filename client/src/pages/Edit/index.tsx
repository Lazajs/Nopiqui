import Nav from "components/Nav"
import NavHome from "components/NavHome"
import Back from "components/Back"
import RichEditor from "components/RichEditor"

export default function () {
  
  return (
     <div className='page'>
      <Nav>
        <NavHome />
      </Nav>

      <Back />
      {/* <RichEditor /> */}
     
    </div>
  )
}