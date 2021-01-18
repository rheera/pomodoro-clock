import React from 'react';
import BootstrapSwitchButton from "bootstrap-switch-button-react";


class DarkMode extends  React.Component {
    render() {
        function myFunction() {
                let element = document.body;
                element.classList.toggle('dark-mode');
                document.getElementById("app-container").classList.toggle('container-dark-mode');
                document.getElementById('break-minus-button').classList.toggle('btn-dark');
                document.getElementById('break-plus-button').classList.toggle('btn-dark');
                document.getElementById('session-minus-button').classList.toggle('btn-dark');
                document.getElementById('session-plus-button').classList.toggle('btn-dark');
        }

        return (
            <div id={"dark-mode-div"}>
                <BootstrapSwitchButton checked={false} onlabel="Light Mode ☀️" offlabel="Dark Mode 🌙" onstyle="dark"
                                       width={150} offstyle="light" style="border" onChange={myFunction}/>
            </div>
        )
    }
}
class Time extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {


        function timeControl(sessionTime, breakTime) {

            const START_TIME = sessionTime;
            const BREAK_TIME = breakTime;
            let breakFlag = false;

            const FULL_DASH_ARRAY = 283;

            function formatTime(time) {
                // The largest round integer less than or equal to the result of time divided being by 60.
                const minutes = Math.floor(time / 60);

                // Seconds are the remainder of the time divided by 60 (modulus operator)
                let seconds = time % 60;

                // If the value of seconds is less than 10, then display seconds with a leading zero
                if (seconds < 10) {
                    seconds = `0${seconds}`;
                }

                // The output in MM:SS format
                return `${minutes}:${seconds}`;
            }

            function startTimer(time) {
                let timePassed = 0;
                let timeLeft = time;
                // setInterval is a method that will run code over and over at a certain interval in this case 1000 ms (1s)
                let timerInterval = function(time) {
                    let timer_Interval = setInterval(() => {
                        // The amount of time passed increments by one
                        timePassed = timePassed += 1;
                        timeLeft = time - timePassed;

                        if (timeLeft === 0 && breakFlag == true) {
                            clearInterval(timer_Interval);
                            breakFlag = !breakFlag;
                            startTimer(START_TIME);
                        }
                        else if (timeLeft === 0 && breakFlag == false) {
                            clearInterval(timer_Interval);
                            breakFlag = !breakFlag;
                            startTimer(BREAK_TIME);
                        }
                        // The time left label is updated
                        document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
                        setCircleDasharray();
                    }, 1000);
                }
                timerInterval(timeLeft);

                // Divides time left by the defined time limit.
                function calculateTimeFraction() {
                    const rawTimeFraction = timeLeft / time;
                    return rawTimeFraction - (1 / time) * (1 - rawTimeFraction);
                }

                // Update the dasharray value as time passes, starting with 283
                function setCircleDasharray() {
                    const circleDasharray = `${(
                        calculateTimeFraction() * FULL_DASH_ARRAY
                    ).toFixed(0)} 283`;
                    document
                        .getElementById("base-timer-path-remaining")
                        .setAttribute("stroke-dasharray", circleDasharray);
                }
            }
            formatTime(START_TIME);
            startTimer(START_TIME);
        }

        return (
            <div id={"timer-div"}>
                {timeControl(this.props.sessionTime, this.props.breakTime)}
            </div>
        )
    }
}

class Wheel extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        return (
            <div id={"wheel-div"}>
                <div className="base-timer">
                    <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <g className="base-timer__circle">
                            // defs allows the path_remaining circle to be a gradient
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#00bc9b" />
                                    <stop offset="100%" stopColor="#5EAEFD" />
                                </linearGradient>
                            </defs>
                            <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45"/>
                            <path
                                id="base-timer-path-remaining"
                                strokeDasharray="283 283"
                                className={"base-timer__path-remaining"}
                                stroke="url(#gradient)"
                                d="
                                M 50, 50
                                m -45, 0
                                a 45,45 0 1,0 90,0
                                a 45,45 0 1,0 -90,0
                                "
                            />
                        </g>
                    </svg>
                    <span id="base-timer-label" className="base-timer__label">
                        <Time sessionTime={this.props.sessionTime} breakTime={this.props.breakTime}/>
                    </span>
                </div>
            </div>
        )
    }
}

class Clock extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id={"clock-div"}>
                <h2 className={"text-center title"}>{this.props.status}</h2>
                <Wheel sessionTime={this.props.sessionTime} breakTime={this.props.breakTime}/>
            </div>
        )
    }
}


class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickSession = this.handleClickSession.bind(this);
        this.handleClickBreak = this.handleClickBreak.bind(this);
    }

    handleClickSession(e) {
        if (e.target.value == "session-") {
            this.props.onClickSession(this.props.sessionTime - 1);
        }
        else if (e.target.value == "session+"){
            this.props.onClickSession(this.props.sessionTime + 1);
        }
    }

    handleClickBreak(e) {
        if (e.target.value == "break-") {
            this.props.onClickBreak(this.props.breakTime - 1);
        }
        else if (e.target.value == "break+"){
            this.props.onClickBreak(this.props.breakTime + 1);
        }
    }


    render() {
        return (
            <div id={"settings-div"} className={"d-flex justify-content-around"}>
                <div id={"break-length-div"} className={"length-div"}>
                    <button id={"break-minus-button"} className={"btn btn-light length-button btn-sm time-buttons"} value={"break-"} onClick={this.handleClickBreak}>-</button>
                    {this.props.breakTime}
                    <button id={"break-plus-button"} className={"btn btn-light length-button btn-sm time-buttons"} value={"break+"} onClick={this.handleClickBreak}>+</button>
                </div>
                <div id={"session-length-div"} className={"length-div"}>
                    <button id={"session-minus-button"} className={"btn btn-light btn-sm length-button time-buttons"} value={"session-"} onClick={this.handleClickSession}>-</button>
                    {this.props.sessionTime}
                    <button id={"session-plus-button"} className={"btn btn-light btn-sm length-button time-buttons"} value={"session+"} onClick={this.handleClickSession}>+</button>
                </div>
            </div>
        )
    }
}

class Controls extends React.Component {
    render() {
        return (
            <div id={"controls-div"} className={"d-flex justify-content-around"}>
                <BootstrapSwitchButton checked={false} onlabel="▶️️" offlabel="l l" onstyle="dark"
                                       width={150} offstyle="dark" style="border"/>
            </div>
        )
    }
}

class AppWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionTime: 5,
            breakTime: 10,
            play: false,
            status: "Session"
        };
        this.handleClickSession = this.handleClickSession.bind(this);
        this.handleClickBreak = this.handleClickBreak.bind(this);
    }

    handleClickSession(sessionInput) {
        this.setState({
            sessionTime: sessionInput
        });
    }


    handleClickBreak(breakInput) {
        this.setState({
            breakTime: breakInput
        });
    }

    render() {
        return (
            <div className={"container-fluid"}>
                <div className={"d-flex justify-content-md-center align-items-center vh-100"}>
                    <div className={"app-container-class"} id={"app-container"}>
                        <DarkMode />
                        <Clock
                            sessionTime={this.state.sessionTime}
                            breakTime={this.state.breakTime}
                            status={this.state.status}/>
                        <Controls play={this.state.play}/>
                        <Settings
                            sessionTime={this.state.sessionTime}
                            breakTime={this.state.breakTime}
                            onClickSession = {this.handleClickSession}
                            onClickBreak = {this.handleClickBreak}
                        />
                    </div>
                </div>
            </div>
        );
    }
};

export default AppWrapper;
