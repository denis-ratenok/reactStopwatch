import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Stopwatch extends React.Component {

	constructor() {
		super();

		this.state = {
			time: 0,
			button: true,
			buttonToggle: 'start',
		};
	}


	onOffStopwatch() {
		this.setState({button: !this.state.button});

		if(this.state.button) {
			this.StopwatchId = setInterval(() => this.setState({time: this.state.time+1}), 100);
			this.setState({ buttonToggle: 'stop' });
			document.querySelector('.reset').style.display = 'block';
		} else {
			clearInterval(this.StopwatchId);
			this.setState({ buttonToggle: 'start' });
		}
	}

	reset() {
		document.querySelector('.reset').style.display = 'none';
		this.setState({time: 0});
		clearInterval(this.StopwatchId);
		this.setState({
			buttonToggle: 'start',
			button: true,
		 });
	}


	renderStopwatch() {
		return <div className='stopwatch'>
			<h1>{this.state.time}</h1>
			<button onClick = {() => this.onOffStopwatch()}>{this.state.buttonToggle}</button>
			<button className='reset' onClick = {() => this.reset()}>reset</button>
		</div>
	}


	render() {
		return(
			this.renderStopwatch()
		);
	}

}


ReactDOM.render(
	<Stopwatch />,
	document.getElementById('root')
);