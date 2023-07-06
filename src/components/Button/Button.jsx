import css from './Button.module.css'

export const Button = props => {
  return (
    <button type="button" onClick={props.downloadMorePage}
          className={css.button}>
      Load more
    </button>
  );
};
