import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import AlbumCard from '../components/AlbumCard';
import Loading from '../components/Loading';

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
    const songs = await getMusics(id);
    songs.shift(); // removeFirstArrayElement
    this.setState({
      isLoading: false,
      songsRequested: songs,
      artistName: songs[0].artistName,
      albumName: songs[0].collectionName,
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
