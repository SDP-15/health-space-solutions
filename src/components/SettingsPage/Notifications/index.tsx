import React from 'react';
import './style.css';

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
    const { value } = this.state;
    alert(`Currently Set To: ${value}`);
    event.preventDefault();
  }

  render() {
    const { value } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="select">
          Notify About Bad Posture After:
          <select id="select" value={value} onChange={this.handleChange}>
            <option value="5mins">5 minutes</option>
            <option value="10mins">10 minutes</option>
            <option value="20mins">20 minutes</option>
            <option value="30mins">30 minutes</option>
          </select>
        </label>
        <input type="submit" value="Apply Changes" className="button-class" />
      </form>
    );
  }
}

export default NotificationForm;
