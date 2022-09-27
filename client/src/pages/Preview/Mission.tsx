import woman from 'assets/images/standing-woman.png'
import 'pages/Preview/styles/Mission.scss'

export default function Mission () {
	return (
		<article id='mission' className="mission">
			<h2>Our mission</h2>
			<p className="intro">There are a few things that science says about taking notes.</p>
       
			<div className='data'>
				<img className='woman' alt='woman reading' src={woman} />
				<ul>
					<li>Writing things down helps reduce stress and makes you feel more relaxed.</li>
					<li>You get a feeling of being in control of your life and actions.</li>
					<li>Also, crossing items off your to-do list gives you a sense of accomplishment and progress.</li>
					<p className="conclussion">Accomplishing these items helps you motivate yourself and keep going <span>when things get though.</span></p>
					<p className='bold'><b>And that is OUR goal.</b></p>
				</ul>
			</div>

			<p className="conclussion">Accomplishing these items helps you motivate yourself and keep going <span>when things get though.</span></p>
			<p className='bold'><b>And that is OUR goal.</b></p>
		</article>
	)
}