import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      isLoading: false,
      searchResult: undefined,
      artist: '',
    };
  }

  handleInput = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  handleClick = async () => {
    const { input } = this.state;
    const artist = input;
    this.setState({
      isLoading: true,
    });
    const searchResult = await searchAlbumsAPI(input);
    this.setState({
      input: '',
      isLoading: false,
      searchResult,
      artist,
    });
  }

  render() {
    const { input, isLoading, searchResult, artist } = this.state;
    const minInput = 2;
    const inputButton = (
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
    );
    const search = (
      <h3>{`Resultado de álbuns de: ${artist}`}</h3>
    );
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          { isLoading ? <Loading /> : inputButton}
          {/* { !isLoading && searchResult ? : } */}
        </div>
      </div>
    );
  }
}
