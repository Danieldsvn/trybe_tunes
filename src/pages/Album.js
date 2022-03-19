import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import AlbumCard from '../components/AlbumCard';
import Loading from '../components/Loading';
import { addSong } from '../services/favoriteSongsAPI';

export default class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      songsRequested: [],
      artistName: '',
      albumName: '',
      isChecked: false,
    };
  }

  componentDidMount() {
    this.handleGetMusics();
  }

  handleGetMusics = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({
      isLoading: true,
    });
    const songs = await getMusics(id);
    songs.shift(); // removeFirstArrayElement
    this.setState({
      isLoading: false,
      songsRequested: songs,
      artistName: songs[0].artistName,
      albumName: songs[0].collectionName,
    });
  }

  // handleAddSong = async () => {
    
  // }

  handleFavoriteCheck = async () => {
    this.setState({
      isChecked: true,
      isLoading: true,
    });
    const favoriteSong = await addSong()
  }

  render() {
    const { isLoading, songsRequested, artistName, albumName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <hr />
        <h3 data-testid="artist-name">{ artistName }</h3>
        <h4 data-testid="album-name">{ albumName }</h4>
        { isLoading ? <Loading /> : songsRequested.map((song) => (
          <AlbumCard
            key={ song.trackId }
            trackId={ song.trackId }
            isChecked={ true && this.handleFavoriteCheck }
            trackName={ song.trackName }
            previewUrl={ song.previewUrl }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
