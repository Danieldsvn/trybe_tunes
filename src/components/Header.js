import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      userName: '',
    };
  }

  componentDidMount() {
    this.handleGetUser();
  }

  handleGetUser = async () => {
    this.setState({
      isLoading: true,
    });
    const userName = await getUser();
    this.setState({
      isLoading: false,
      userName: userName.name,
    });
  }

  render() {
    const { isLoading, userName } = this.state;
    const links = (
      <header>
        <h2 data-testid="header-user-name">{ userName }</h2>
        <Link data-testid="link-to-search" to="/search">
          <p>Pesquisa</p>
        </Link>
        <Link data-testid="link-to-favorites" to="/favorites">
          <p>Músicas favoritas</p>
        </Link>
        <Link data-testid="link-to-profile" to="/profile">
          <p>Perfil</p>
        </Link>
      </header>);
    return (
      <div data-testid="header-component">
        { isLoading ? <Loading /> : links }
      </div>
    );
  }
}
