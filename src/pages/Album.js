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
    const songsRequested = await getMusics(id);
    const songs = songsRequested.slice(1); // removeFirstArrayElement
    this.setState({
      isLoading: false,
      songsRequested: songs,
      artistName: songsRequested[0].artistName,
      albumName: songsRequested[0].collectionName,
    });
  }

  // handleAddSong = async () => {

  // }

  handleFavoriteCheck = async (song) => {
    this.setState({
      isLoading: true,
    });
    await addSong(song);
    this.setState({
      isLoading: false,
    });
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
            // isChecked={ true }
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
