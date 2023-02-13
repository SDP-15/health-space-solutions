import React from 'react';

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
    alert(`Currently Set To: ${this.state.value}`);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Do Not Disturb:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="off">Off</option>
            <option value="1hr">1 Hour</option>
            <option value="2hr">2 Hour</option>
            <option value="untilOff">Until Turned Off</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default DoNotDisturbForm;
