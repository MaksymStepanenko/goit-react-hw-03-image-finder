import React, { Component } from 'react';
import { StyledOverlay, StyledModal } from './slyled';
import PropTypes from 'prop-types';

export class Modal extends Component {
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onCloseModal();
    }
  };

  render() {
    return (
      <StyledOverlay onClick={this.handleOverlayClick}>
        <StyledModal>
          <img src={this.props.visibleData} width="600px" />
        </StyledModal>
      </StyledOverlay>
    );
  }
}
Modal.propTypes = {
  visibleData: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
