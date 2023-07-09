import React, { useEffect } from 'react';
import { StyledOverlay, StyledModal } from './slyled';
import PropTypes from 'prop-types';

export const Modal = ({visibleData, onShowModal}) => {
 

  const  handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onShowModal();
    }
  };

  useEffect(() => {
     
    const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onShowModal();
    }
  };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onShowModal]);
  
    return (
      <StyledOverlay onClick={handleOverlayClick}>
        <StyledModal>
          <img src={visibleData} alt={visibleData} />
        </StyledModal>
      </StyledOverlay>
    );
}
Modal.propTypes = {
  visibleData: PropTypes.string.isRequired,
  onShowModal: PropTypes.func.isRequired,
};
