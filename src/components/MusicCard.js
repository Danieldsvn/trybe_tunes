import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      favorited: false,
    };
  }

  async componentDidMount() {
    await this.handleIschecked();
  }

handleChange = async (song) => {
  const { favorited } = this.state;
  if (favorited) {
    this.setState({
      isLoading: true,
      favorited: false,
    });
    await removeSong(song);
    this.setState({ isLoading: false });
  } else {
    this.setState({
      isLoading: true,
      favorited: true,
    });
    await addSong(song);
    this.setState({ isLoading: false });
  }
}

handleIschecked = async () => {
  const { song } = this.props;
  const favoriteSongs = await getFavoriteSongs();
  if (favoriteSongs) {
    const isFavorite = favoriteSongs.some((fav) => fav.trackId === song.trackId);
    this.setState({
      favorited: isFavorite,
    });
  }
}

render() {
  const { trackName, previewUrl, trackId,
    song } = this.props;
  const { favorited, isLoading } = this.state;

  return (
    <div>
      { isLoading && <Loading /> }
      <p>{ trackName }</p>
      <label htmlFor="favoriteSong">
        Favorita
        <input
          id="favoriteSong"
          type="checkbox"
          data-testid={ `checkbox-music-${trackId}` }
          onChange={ () => this.handleChange(song) }
          checked={ favorited }
        />
      </label>
      <audio
        data-testid="audio-component"
        src={ previewUrl }
        controls
      >
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
        .
      </audio>
    </div>
  );
}
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  song: PropTypes.string.isRequired,
};
