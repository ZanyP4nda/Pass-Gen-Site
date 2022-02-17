// Custom Radio Button to organise all related radio buttons' data into a single 2D array
// Note: Parent class is RadioGroup

import React from 'react';

class RadioButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false
        }
    }
	// Set isChecked to default value passed to props 
    componentDidMount() {
        this.setState({isChecked: this.props.isChecked});
    }

	// Called when button is clicked
    handleClick = (e) => {
        e.preventDefault();
		// Toggle isChecked
        this.setState({isChecked : !this.state.isChecked}, () => {
			// Call update function passed to props
            this.props.updateButtonData(this.props.id, [this.props.id, this.props.label, this.state.isChecked]);
        });
    }

    render() {
        return(
            <div className="radio-button-container">
                <label>{this.props.label}</label>
                <button className={this.state.isChecked ? "radio-button--checked" : "radio-button"} 
                onClick={this.handleClick}
                />
            </div>
            );
        }
    }

    export default RadioButton;
