import React from 'react';

class NotificationForm extends React.Component {
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
          Notify About Bad Posture After:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="5mins">5 minutes</option>
            <option value="10mins">10 minutes</option>
            <option value="20mins">20 minutes</option>
            <option value="30mins">30 minutes</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default NotificationForm;
