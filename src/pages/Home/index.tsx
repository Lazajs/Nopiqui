import './styles/index.scss'
import Nav from "components/Nav"
import NavHome from "./NavHome"
import NotesSection from "./NotesSection"

export default function Home () {
  // should get Note[] from context

  return (
    <div className='home'>
      <Nav>
       <NavHome />
      </Nav>
      <NotesSection />
    </div>
  )
}