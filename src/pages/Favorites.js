import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoritesSongs: [],
      isLoadingFavorite: false,
    };
  }

  async componentDidMount() {
    await this.handleGetFavorites();
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

  handleRemoveSong = async (song) => {
    this.setState({
      isLoadingFavorite: true,
    });
    await removeSong(song);
    this.setState({
      isLoadingFavorite: false,
    });
    this.handleGetFavorites();
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
            trackName={ song.trackName }
            previewUrl={ song.previewUrl }
            song={ song }
            removeFavSong={ () => this.handleRemoveSong(song) }
          />
        ))}
      </div>
    );
  }
}
