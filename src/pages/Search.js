import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import SearchCard from '../components/SearchCard';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      isLoading: false,
      searchResult: undefined,
      artist: '',
      renderCard: false,
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
    const search = await searchAlbumsAPI(input);
    this.setState({
      input: '',
      isLoading: false,
      searchResult: search,
      artist,
      renderCard: true,
    });
  }

  render() {
    const { input, isLoading, searchResult,
      artist, renderCard } = this.state;
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
    const searchTitle = (
      <h3>{`Resultado de álbuns de: ${artist}`}</h3>
    );
    return (
      <div data-testid="page-search">
        <Header />
        <div>
          { isLoading ? <Loading /> : inputButton }
          { renderCard && searchTitle }
          { renderCard && searchResult.map((album) => (
            <SearchCard
              key={ album.collectionId }
              collectionId={ album.collectionId }
              collectionName={ album.collectionName }
              imgUrl={ album.artworkUrl100 }
              artistName={ album.artistName }
            />
          )) }
        </div>
      </div>
    );
  }
}
