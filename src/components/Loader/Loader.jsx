import { RotatingSquare } from 'react-loader-spinner';
import css from './Loader.module.css'

export const Loader = () => {
  return (
    <div className={css.wrapp}>
      <RotatingSquare
        height="100"
        width="100"
        color="#3f51b5"
        ariaLabel="rotating-square-loading"
        strokeWidth="4"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};
