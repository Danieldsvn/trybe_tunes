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
      isLoadingFavorite: false,
      songsRequested: [],
      artistName: '',
      albumName: '',
    };
  }

  componentDidMount() {
    this.handleGetMusics();
  }

  // https://backefront.com.br/obter-parametro-url-react/
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

  handleCheckbox = async (event) => {
    if (event.target.checked) {
      this.setState({
        isLoadingFavorite: true,
      });
      const songObject = JSON.parse(event.target.id);
      await addSong(songObject);
      this.setState({
        isLoadingFavorite: false,
      });
    }
  }  

  render() {
    const { isLoading, isLoadingFavorite,
      songsRequested, artistName, albumName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <hr />
        <h3 data-testid="artist-name">{ artistName }</h3>
        <h4 data-testid="album-name">{ albumName }</h4>
        { isLoadingFavorite && <p>Carregando...</p> }
        { isLoading ? <Loading /> : songsRequested.map((song) => (
          <AlbumCard
            key={ song.trackId }
            trackId={ song.trackId }
            handleFavorite={ this.handleCheckbox }
            trackName={ song.trackName }
            previewUrl={ song.previewUrl }
            songObject={ JSON.stringify(song) }
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
