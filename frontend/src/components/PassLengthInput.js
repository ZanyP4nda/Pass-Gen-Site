import React from 'react';

class PassLengthInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isValidInput: true
        }
    }

    inputChange = (e) => {
        if(e.target.value < 8 || e.target.value > 20) {
            this.setState({ isValidInput : false });
        }
        else {
            if(this.state.isValidInput == false) {
                this.setState({ isValidInput : true });
            }
        }
        this.props.updatePassLength(e.target.value);
    }

     render() {
        return(
            <span className="pass-length-input-container">
                <label>{this.props.label}</label>
                <input className={this.state.isValidInput ? "pass-length-input" : "pass-length-input--error"} type="number" value={this.props.value} onChange={this.inputChange} />
            </span>
        );
    }
}

export default PassLengthInput;