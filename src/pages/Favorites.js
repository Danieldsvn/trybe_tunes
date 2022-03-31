import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoritesSongs: [],
      isLoadingFavorite: false,
    };
  }

  componentDidMount() {
    this.handleGetFavorites();
  }

  handleGetFavorites = async () => {
    this.setState({
      isLoadingFavorite: true,
    });
    const favSongsObj = await getFavoriteSongs();
    this.setState({
      favoritesSongs: favSongsObj,
    });
    this.setState({
      isLoadingFavorite: false,
    });
  }

  handleSavedFavorites = async (event) => {
    this.setState({
      isLoadingFavorite: true,
    });
    const songObject = JSON.parse(event.target.name);
    await removeSong(songObject);
    this.setState({
      isLoadingFavorite: false,
    });
    this.setState({
      isLoadingFavorite: true,
    });
    const favSongsObj = await getFavoriteSongs();
    this.setState({
      favoritesSongs: favSongsObj,
    });
    this.setState({
      isLoadingFavorite: false,
    });
  }

  render() {
    const { isLoadingFavorite, favoritesSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { isLoadingFavorite ? <Loading /> : favoritesSongs.map((song) => (
          <MusicCard
            key={ song.trackId }
            trackId={ song.trackId }
            handleFavorite={ this.handleSavedFavorites }
            trackName={ song.trackName }
            previewUrl={ song.previewUrl }
            songObject={ JSON.stringify(song) }
          />
        ))}
      </div>
    );
  }
}
