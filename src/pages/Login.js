import React from 'react';
import { createUser } from '../services/userAPI';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      // entryButton: false,
    };
  }

  // componentDidUpdate({ entryButton }) {

  // }

  // handleEntryButton = () => {
  //   this.setState({
  //     entryButton: true,
  //   });
  // }

  handleInput = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  render() {
    const { input } = this.state;
    const minInput = 3;
    return (
      <form data-testid="page-login">
        <input
          onChange={ this.handleInput }
          value={ input }
          data-testid="login-name-input"
          type="text"
        />
        <button
          onClick={ createUser({ name: input }) }
          type="submit"
          disabled={ input.length < minInput }
          data-testid="login-submit-button"
        >
          Entrar
        </button>

      </form>

    );
  }
}
