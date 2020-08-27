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



    render() {
        const START_TIME = 10;
        let timeLeft = START_TIME;
        let timerInterval = null;
        let timePassed = 0;

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

        function startTimer() {
            // setInterval is a method that will run code over and over at a certain interval in this case 1000 ms (1s)
            timerInterval = setInterval(() => {

                // The amount of time passed increments by one
                timePassed = timePassed += 1;
                timeLeft = START_TIME - timePassed;

                // The time left label is updated
                document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
                setCircleDasharray();

                if (timeLeft === 0) {
                    clearInterval(timerInterval)
                }
            }, 1000);


        }


        // Divides time left by the defined time limit.
        function calculateTimeFraction() {
            const rawTimeFraction = timeLeft / START_TIME;
            return rawTimeFraction - (1 / START_TIME) * (1 - rawTimeFraction);
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

        return (
            <div id={"timer-div"}>
                {formatTime(timeLeft)}
                {startTimer()}
            </div>
        )
    }
}

class Wheel extends React.Component {



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
                        <Time />
                    </span>
                </div>
            </div>
        )
    }
}

class Clock extends React.Component {
    render() {
        return (
            <div id={"clock-div"}>
                <h2 className={"text-center title"}>Session/Break</h2>
                <Wheel />
            </div>
        )
    }
}


class Settings extends React.Component {
    render() {
        return (
            <div id={"settings-div"} className={"d-flex justify-content-around"}>
                <div id={"break-length-div"} className={"length-div"}>
                    <button id={"break-minus-button"} className={"btn btn-light length-button btn-sm time-buttons"}>-</button>
                    Time
                    <button id={"break-plus-button"} className={"btn btn-light length-button btn-sm time-buttons"}>+</button>
                </div>
                <div id={"session-length-div"} className={"length-div"}>
                    <button id={"session-minus-button"} className={"btn btn-light btn-sm length-button time-buttons"}>-</button>
                    Time
                    <button id={"session-plus-button"} className={"btn btn-light btn-sm length-button time-buttons"}>+</button>
                </div>
            </div>
        )
    }
}

class AppWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            equation: ""
        };
    }

    render() {
        return (
            <div className={"container-fluid"}>
                <div className={"d-flex justify-content-md-center align-items-center vh-100"}>
                    <div className={"app-container-class"} id={"app-container"}>
                        <DarkMode />
                        <Clock />
                        <Settings />
                    </div>
                </div>
            </div>
        );
    }
};

export default AppWrapper;
