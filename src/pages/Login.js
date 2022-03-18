import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      isLoading: false,
      isRedirect: false,
    };
  }

  componentDidMount() {

  }

  handleInput = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  handleClick = async () => {
    const { input } = this.state;
    this.setState({
      isLoading: true,
    });
    await createUser({ name: input });
    this.setState({
      isLoading: false,
      isRedirect: true,
    });
  }

  render() {
    const { input, isLoading, isRedirect } = this.state;
    const minInput = 3;
    const inputButton = (
      <form data-testid="page-login">
        <input
          onChange={ this.handleInput }
          value={ input }
          data-testid="login-name-input"
          type="text"
        />
        <button
          onClick={ this.handleClick }
          type="submit"
          disabled={ input.length < minInput }
          data-testid="login-submit-button"
        >
          Entrar
        </button>
      </form>
    );
    return (
      <div>
        { isLoading ? <Loading /> : inputButton }
        { isRedirect && <Redirect to="/search" /> }
      </div>
    );
  }
}
