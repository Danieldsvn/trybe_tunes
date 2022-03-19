import React from 'react';
import PropTypes from 'prop-types';

export default class AlbumCard extends React.Component {
  render() {
    const { trackName, previewUrl, trackId, isChecked } = this.props;
    return (
      <div>
        <p>{ trackName }</p>
        <label htmlFor='favoriteSong'>
            Favorita
          <input 
           type="checkbox" 
           data-testid={`checkbox-music-${trackId}`}
           checked={ isChecked }
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

AlbumCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  
};
