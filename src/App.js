import React from 'react';



class Time extends React.Component {



    render() {
        const START_TIME = 20;
        let timeLeft = START_TIME;
        function formatTimeLeft(time) {
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

        return (
            <div id={"timer-div"}>
                {formatTimeLeft(timeLeft)}
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
                            <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45"/>
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
                <h2 className={"text-center"}>Session/Break</h2>
                <Wheel />
            </div>
        )
    }
}


class Settings extends React.Component {
    render() {
        return (
            <div id={"settings-div"}>

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
                    <div>
                        <Clock />
                        <Settings />
                    </div>
                </div>
            </div>
        );
    }
};

export default AppWrapper;
