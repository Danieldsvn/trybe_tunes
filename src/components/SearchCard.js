import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class SearchCard extends React.Component {
  render() {
    const { artistId, artistName, collectionId,
      collectionName, collectionPrice, imgUrl,
      releaseDate, trackCount } = this.props;
    return (
      <Link
        data-testid={ `link-to-album-${collectionId}` }
        to={ () => `/album/${collectionId}` }
      >
        <div>
          <img src={ imgUrl } alt={ collectionName } />
          <h3>{ collectionName }</h3>
          <p>{ artistName}</p>
        </div>
      </Link>
    );
  }
}

SearchCard.propTypes = {
  collectionId: PropTypes.number.isRequired,
  collectionName: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
};
