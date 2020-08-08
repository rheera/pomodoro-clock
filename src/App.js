import React from 'react';



class Time extends React.Component {
    render() {
        return (
            <div id={"timer-div"}>

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
                    <span>
    <!-- Remaining time label -->
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
                <h2>Session/Break</h2>
                <Wheel />
                <Time />
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
