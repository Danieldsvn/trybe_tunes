import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    return (
      <div data-testid="header-component">
        <Link data-testid="link-to-search" to="/search">
          <p>Pesquisa</p>
        </Link>
        <Link data-testid="link-to-favorites" to="/favorites">
          <p>Músicas favoritas</p>
        </Link>
        <Link data-testid="link-to-profile" to="/profile">
          <p>Perfil</p>
        </Link>
      </div>
    );
  }
}
