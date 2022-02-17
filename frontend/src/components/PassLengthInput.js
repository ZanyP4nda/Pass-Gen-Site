// Custom number input field for password length field


import React from 'react';

class PassLengthInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isValidInput: true
        }
    }

	// Called when input is updated
    inputChange = (e) => {
		// If input is not between 8 and 20 (inclusive)
        if(e.target.value < 8 || e.target.value > 20) {
			// Input is invalid
            this.setState({ isValidInput : false });
        }
        else {
            if(this.state.isValidInput == false) {
				// Input is valid
                this.setState({ isValidInput : true });
            }
        }
		// Call password length update function passed to props
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
