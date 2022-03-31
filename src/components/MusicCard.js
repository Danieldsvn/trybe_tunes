import React from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     checked: false,
  //   };
  // }

  componentDidMount() {
    //  this.handleIschecked();
  }

  componentDidUpdate() {

  }

  // handleIschecked = () => {
  //   const { favoritesSongs, song } = this.props;
  //   console.log(favoritesSongs);
  //   console.log(song);
  //   const checkboxBool = favoritesSongs.some((favSong) => {
  //     JSON.stringify(favSong) === JSON.stringify(song);
  //   });
  //   if (checkboxBool) {
  //     this.setState({
  //       checked: true,
  //     });
  //   }
  // }

  render() {
    const { trackName, previewUrl, trackId,
      handleFavorite, songObject } = this.props;
    // const { checked } = this.state;

    return (
      <div>
        <p>{ trackName }</p>
        <label htmlFor="favoriteSong">
          Favorita
          <input
            name={ songObject }
            id="favoriteSong"
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ handleFavorite }
            // checked= { checked }
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
  handleFavorite: PropTypes.func.isRequired,
  songObject: PropTypes.string.isRequired,
  // isChecked: PropTypes.bool.isRequired,
};
