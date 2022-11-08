import 'pages/Preview/styles/preview.scss'
import Header from 'components/Header'
import Main from 'pages/Preview/Main'
import Mission from 'pages/Preview/Mission'
import sit from 'assets/images/sit-person.jpg'
import Pricing from 'pages/Preview/Pricing'
import Nav from 'components/Nav'
import NavList from 'pages/Preview/NavList'
import Helmet from 'react-helmet'
import Easy from './Easy'

export default function Preview () {
  return (
		<>
			<Helmet>
				<title>Nopiqui | Get Started</title>
				<meta name="description" content="Create, read, update and delete your notes or to-do list. All-in-one app with a minimalist UI."></meta>
			</Helmet>
			<Header>
				<Nav>
					<NavList />
				</Nav>
			</Header>
			<Main />
		<Mission />
		<Easy />
		<img className='sat' src={sit} alt="Sat person" />
			<Pricing />
			<footer className='foot'>
				<p>Thanks for visiting</p>
				<p>Take a look at my other projects at <a target='_blank' href='https://github.com/Lazajs' rel="noreferrer">Github</a></p>
				<p>&#10084;</p>
			</footer>
		</>
  )
}
