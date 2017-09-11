import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Time(props) {
	return (
		<h1>{timeFormat(props.time)}</h1>
	);
}


function Reset(props) {
	return (
		<button onClick={props.onClick} className='reset'>reset</button>
	);
}

function ListTime(props) {
	const times = props.history;
	const listTimes = times.map((time) =>
		<li key={time.id}>
			{timeFormat(time.time)}
		</li>
	);
	return (
			<ul>{listTimes}</ul>
	);
}

function timeFormat(ms) {
function num(val) {
    val = Math.floor(val);
    return val < 10 ? '0' + val : val;
};

	const	minutes = ms / 6000  % 60;
  const seconds = ms / 100 % 60;
  ms = ms % 100;

return num(minutes) + ":" + num(seconds) + ":" + num(ms);
};

class Stopwatch extends React.Component {

	constructor() {
		super();

		this.state = {
			id: 0,
			time: 0,
			isReady: true,
			toggleState: 'start',
			history: [],
		};

		this.reset = this.reset.bind(this);
		this.startTime = this.startTime.bind(this);
		this.stopTime = this.stopTime.bind(this);
	}

	startTime() {
		this.setState({
			isReady: !this.state.isReady,
			toggleState: 'stop',
		});
		this.StopwatchId = setInterval(() => this.setState({time: this.state.time+1}), 10);
		document.querySelector('.reset').style.display = 'block';
	}

	stopTime() {
		const times = this.state.history.slice();
		times[times.length] = {id: this.state.id, time:this.state.time};
		this.setState({
			isReady: !this.state.isReady,
			toggleState: 'start',
			history: times,
			id: this.state.id+1,
		});
		clearInterval(this.StopwatchId);
	}

	reset() {
		document.querySelector('.reset').style.display = 'none';
		clearInterval(this.StopwatchId);
		this.setState({
			toggleState: 'start',
			isReady: true,
			time: 0,
			history: [],
		 });
	}


	renderStopwatch() {
		let button = null;

		if(this.state.isReady) {
			button = <button onClick={this.startTime}>{this.state.toggleState}</button>
		} else {
			button = <button onClick={this.stopTime}>{this.state.toggleState}</button>
		}

		return (
			<div className='stopwatch'>
				<Time time={this.state.time} />
				{button}
				<Reset onClick = {this.reset} />
				<ListTime history={this.state.history} />
			</div>
		);
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