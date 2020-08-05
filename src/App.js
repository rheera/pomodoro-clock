import React from 'react';

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
                        Hi
                    </div>
                </div>
            </div>
        );
    }
};

export default AppWrapper;
