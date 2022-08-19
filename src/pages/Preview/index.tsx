import 'pages/Preview/styles/preview.scss'
import Header from 'components/Header'
import Main from 'pages/Preview/Main'
import Mission from 'pages/Preview/Mission'
import sit from 'assets/images/sit-person.jpg'
import Pricing from 'pages/Preview/Pricing'
import Nav from 'components/Nav'

export default function Preview () {
  return (
    <>
      <Header>
        <Nav/>
      </Header>
      <Main />
      <Mission />
      <img className='sat' src={sit} alt="Sat person" />
      <Pricing />
      <footer className='foot'>
        <p>Thanks for visiting</p>
        <p>Checkout my other projects at <a target='_blank' href='https://github.com/Lazajs'>Github</a></p>
        <p>&#10084;</p>
      </footer>
    </>
  )
}