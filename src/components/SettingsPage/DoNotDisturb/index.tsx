import React from 'react';
import './style.css';

class DoNotDisturbForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 'off' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    const { value } = this.state;
    alert(`Currently Set To: ${value}`);
    event.preventDefault();
  }

  render() {
    const { value } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="select">
          Do Not Disturb:
          <select id="select" value={value} onChange={this.handleChange}>
            <option value="off">Off</option>
            <option value="1hr">1 Hour</option>
            <option value="2hr">2 Hour</option>
            <option value="untilOff">Until Turned Off</option>
          </select>
        </label>
        <input type="submit" value="Apply Changes" className="button-class" />
      </form>
    );
  }
}

export default DoNotDisturbForm;
