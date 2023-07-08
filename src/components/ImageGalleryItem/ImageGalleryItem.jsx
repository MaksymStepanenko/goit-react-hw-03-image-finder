import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  onShowModal,
}) => {
  return (
    <li className={css.item}>
      <img
        className={css.image}
        src={webformatURL}
        alt={webformatURL}
        onClick={() => onShowModal(largeImageURL)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onShowModal: PropTypes.func.isRequired,
};
