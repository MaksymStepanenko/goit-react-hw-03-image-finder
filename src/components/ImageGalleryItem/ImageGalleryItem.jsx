import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  onOpenModal,
}) => {
  return (
    <li className={css.item}>
      <img
        className={css.image}
        src={webformatURL}
        alt={webformatURL}
        onClick={() => onOpenModal(largeImageURL)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
