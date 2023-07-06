import css from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = props => {
  return (
    <button
      type="button"
      onClick={props.downloadMorePage}
      className={css.button}
    >
      Load more
    </button>
  );
};

Button.propTypes = {
  downloadMorePage: PropTypes.func.isRequired,
};
