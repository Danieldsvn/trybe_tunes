import React from 'react';
import Header from '../components/Header';

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
    };
  }

  handleInput = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  render() {
    const { input } = this.state;
    const minInput = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            onChange={ this.handleInput }
            value={ input }
            data-testid="search-artist-input"
            type="text"
          />
          <button
            onClick={ this.handleClick }
            type="submit"
            disabled={ input.length < minInput }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
