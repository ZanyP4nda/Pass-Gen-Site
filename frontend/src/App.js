import React from "react";
import RadioGroup from "./components/RadioGroup";
import PassLengthInput from "./components/PassLengthInput";

const LOWERCASE = "abcdefghijklmnopqrstuvwxyz"
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const NUMBERS = "0123456789"
const SYMBOLS = "!@#$%^&*()-_=+[{]};:,<.>/?"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowPassword: false,
            passLength: 12,
            buttonsData: [
                [0, "Use Capital Letters", true],
                [1, "Use Numbers", true],
                [2, "Use Symbols", true],
                [3, "Show Password", true],
            ],
            password: "PASSWORD"
        }
    }    

	// Calls when password is clicked
    passwordClick = (e) => {
        e.preventDefault();
        if(this.state.isShowPassword)
			// Copy password to clipboard
            navigator.clipboard.writeText(this.state.password);
    }

	// Called when button is clicked
	// Changes button toggle data in state
    updateButtonData = (index, newData) => {
        let tempData = this.state.buttonsData;
        tempData[index] = newData;
        this.setState({ buttonsData : tempData }, () => {
            console.log(this.state.buttonsData);
        });
    }

	// Called when password length input field is updated
    updatePassLength = (newLength) => {
        this.setState({passLength: newLength});
    }

	// Get possible characters for password
	getPossibleCharacters = () => {
		// Start password with lowercase letters
        let possibleChars = LOWERCASE;
		// If selected, add uppercase letters
        if(this.state.buttonsData[0][2]) {
            possibleChars += UPPERCASE;
        }
		// If selected, add numbers
        if(this.state.buttonsData[1][2]) {
            possibleChars += NUMBERS;
        }
		// If selected, add symbols
        if(this.state.buttonsData[2][2]) {
            possibleChars += SYMBOLS;
        }

		return possibleChars;
	}
	// Generate password
    generatePass = () => {
        let password = ""
		// Get possible characters
		let possibleChars = this.getPossibleCharacters();
		// Get length of possible characters
		let possibleLength = possibleChars.length;

		// For no. of characters in password, generate a random character from array of possibleChars
        for (let i = 0; i < this.state.passLength; i++) {
            password += possibleChars[Math.floor(Math.random() * possibleLength)]
        }

		return password;
	}

	// Update password
	updatePassword = () => {
		// Generate password
		let password = this.generatePass();
		// Update state
        this.setState({password : password}, () => {
			// If option selected, show password on screen
            if(this.state.buttonsData[3][2]) {
                this.setState({ isShowPassword : true });
            }
			// If not, copy password to clipboard
            else {
                this.setState({ isShowPassword : false }, () => {
                    navigator.clipboard.writeText(this.state.password);
                });
            }
        });
	}

	// Called on submit btn press
    handleSubmit = (e) => {
        e.preventDefault();
		// If password length specified is inside range
        if(parseInt(this.state.passLength) >= 8 && parseInt(this.state.passLength) <= 20) {
			// Give password
			this.updatePassword();
        }
    }

    render() {
        return(
            <div>
                <div className={this.state.isShowPassword ? "password-container--visible" : "password-container--invisible"} onClick={this.passwordClick}>
                    <div className="password">{this.state.password}</div>
                </div>
                <div className="options-container-container">
                    <div className="options-container">
                        <PassLengthInput label="Password Length" value={this.state.passLength} updatePassLength={this.updatePassLength.bind(this)} />
                        <RadioGroup buttonsData={this.state.buttonsData} updateButtonData={this.updateButtonData.bind(this)} />
                        <button className="submit-btn" onClick={this.handleSubmit}>Generate</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
