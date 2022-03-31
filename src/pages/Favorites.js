import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import AlbumCard from '../components/AlbumCard';

export default class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoritesSongs: [],
      isLoadingFavorite: false,
    };
  }

  // componentDidMount() {
  //   handleGetFavorites()
  // }
  render() {
    const { isLoadingFavorite, favoritesSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { isLoadingFavorite ? <Loading /> : favoritesSongs.map((song) => (
          <AlbumCard
            key={ song.trackId }
            trackId={ song.trackId }
            handleFavorite={ handleSaveFavorites() }
            trackName={ song.trackName }
            previewUrl={ song.previewUrl }
          />
        ))}
      </div>
    );
  }
}
