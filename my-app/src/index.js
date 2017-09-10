import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Time(props) {
	return (
		<h1>{props.time}</h1>
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
			isReady: true,
			toggleState: 'start',
		};

		this.reset = this.reset.bind(this);
		this.startTime = this.startTime.bind(this);
		this.stopTime = this.stopTime.bind(this);
	}

	startTime() {
		this.setState({isReady: !this.state.isReady});
		this.StopwatchId = setInterval(() => this.setState({time: this.state.time+1}), 100);
		this.setState({ toggleState: 'stop' });
		document.querySelector('.reset').style.display = 'block';
	}

	stopTime() {
		this.setState({isReady: !this.state.isReady});
		this.setState({ toggleState: 'start' });
		clearInterval(this.StopwatchId);
	}

	reset() {
		document.querySelector('.reset').style.display = 'none';
		clearInterval(this.StopwatchId);
		this.setState({time: 0});
		this.setState({
			toggleState: 'start',
			isReady: true,
		 });
	}


	renderStopwatch() {
		let button = null;

		if(this.state.isReady) {
			button = <button onClick={this.startTime}>{this.state.toggleState}</button>
		} else {
			button = <button onClick={this.stopTime}>{this.state.toggleState}</button>
		}

		return <div className='stopwatch'>
				<Time time={this.state.time} />
				{button}
				<Reset onClick = {this.reset} />
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