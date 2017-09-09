import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Time(props) {
	return (
		<h1>{props.time}</h1>
	);
}

function Toggle(props) {
	return (
		<button onClick={props.onClick}>{props.toggleState}</button>
	);
}

function Reset(props) {
	return (
		<button onClick={props.onClick} className="reset">reset</button>
	);
}


class Stopwatch extends React.Component {

	constructor() {
		super();

		this.state = {
			time: 0,
			ready: true,
			toggleState: 'start',
		};
	}


	toggleStopwatch() {
		this.setState({ready: !this.state.ready});

		if(this.state.ready) {

			this.StopwatchId = setInterval(() => this.setState({time: this.state.time+1}), 100);
			this.setState({ toggleState: 'stop' });
			document.querySelector('.reset').style.display = 'block';

		} else {

			clearInterval(this.StopwatchId);
			this.setState({ toggleState: 'start' });

		}
	}

	reset() {
		document.querySelector('.reset').style.display = 'none';
		clearInterval(this.StopwatchId);
		this.setState({time: 0});
		this.setState({
			toggleState: 'start',
			ready: true,
		 });
	}


	renderStopwatch() {
		return <div className='stopwatch'>
				<Time time={this.state.time} />
				<Toggle onClick = {() => this.toggleStopwatch()} toggleState={this.state.toggleState} />
				<Reset onClick = {() => this.reset()} />
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