import React from 'react';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      disable: true,
      input: '',
    }
  }

  handleInput = (event) => {
    const { event } = this
    this.setState((event) => {

    })
  }
  render() {
    return (
      <div data-testid="page-login">
        <input onChange={this.handleInput(event)} data-testid="login-name-input" type="text" />
        <button type="submit" disabled data-testid="login-submit-button">Entrar</button>

      </div>

    );
  }
}
