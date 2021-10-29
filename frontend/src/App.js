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

    passwordClick = (e) => {
        e.preventDefault();
        if(this.state.isShowPassword)
            navigator.clipboard.writeText(this.state.password);
    }

    updateData = (index, newData) => {
        let tempData = this.state.buttonsData;
        tempData[index] = newData;
        this.setState({ buttonsData : tempData }, () => {
            console.log(this.state.buttonsData);
        });
    }

    updatePassLength = (newLength) => {
        this.setState({passLength: newLength});
    }

    generatePass = () => {
        let password = ""
        let possibleChars = LOWERCASE;
        let possibleLength = 26;
        if(this.state.buttonsData[0][2]) {
            possibleChars += UPPERCASE;
            possibleLength += 26;
        }
        if(this.state.buttonsData[1][2]) {
            possibleChars += NUMBERS;
            possibleLength += 10;
        }
        if(this.state.buttonsData[2][2]) {
            possibleChars += SYMBOLS;
            possibleLength += SYMBOLS.length;
        }
        for (let i = 0; i < this.state.passLength; i++) {
            password += possibleChars[Math.floor(Math.random() * possibleLength)]
        }
        this.setState({password : password}, () => {
            if(this.state.buttonsData[3][2]) {
                this.setState({ isShowPassword : true });
            }
            else {
                this.setState({ isShowPassword : false }, () => {
                    navigator.clipboard.writeText(this.state.password);
                });
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.passLength >= 8 || this.state.passLength <= 20) {
            this.generatePass();
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
                        <RadioGroup buttonsData={this.state.buttonsData} updateData={this.updateData.bind(this)} />
                        <button className="submit-btn" onClick={this.handleSubmit}>Generate</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
