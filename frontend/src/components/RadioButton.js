import React from 'react';

class RadioButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false
        }
    }
    componentDidMount() {
        this.setState({isChecked: this.props.isChecked});
    }

    handleClick = (e) => {
        e.preventDefault();
        this.setState({isChecked : !this.state.isChecked}, () => {
            this.props.updateData(this.props.id, [this.props.id, this.props.label, this.state.isChecked]);
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