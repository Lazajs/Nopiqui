import 'pages/Preview/styles/preview.scss'
import Header from 'components/Header'
import Main from 'pages/Preview/Main'
import Mission from 'pages/Preview/Mission'
import sit from 'assets/images/sit-person.jpg'
import Pricing from 'pages/Preview/Pricing'
import Nav from 'components/Nav'
import NavList from 'pages/Preview/NavList'

export default function Preview () {
	return (
		<>
			<Header>
				<Nav>
					<NavList />
				</Nav>
			</Header>
			<Main />
			<Mission />
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