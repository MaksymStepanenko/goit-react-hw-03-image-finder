import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { fetchPhoto } from './services/api';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';

import css from './App.module.css';

export class App extends Component {
  state = {
    modal: { isOpen: false, visibleData: '' },
    isLoading: false,
    error: null,
    value: '',
    photos: [],
    perPage: 12,
  };

  onOpenModal = data => {
    this.setState({
      modal: {
        isOpen: true,
        visibleData: data,
      },
    });
  };

  onCloseModal = () => {
    this.setState({
      modal: {
        isOpen: false,
        visibleData: null,
      },
    });
  };

  onSubmit = value => {
    // console.log('🚀 ~ file: App.jsx:7 ~ App ~ value:', value);
    this.setState({
      value,
      perPage: 12,
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    const value = this.state.value;
    const perPage = this.state.perPage;

    if (prevState.value !== value || prevState.perPage !== perPage) {
      try {
        this.setState({ isLoading: true });
        const response = await fetchPhoto(value, perPage);
        // console.log(response.hits);
        const finalResult = response.hits;
        this.setState({
          photos: [...finalResult],
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  downloadMorePage = () => {
    this.setState(prevState => {
      return { perPage: prevState.perPage + 12 };
    });
  };

  render() {
    return (
      <div className={css.App}>
        {this.state.modal.isOpen && (
          <Modal
            onCloseModal={this.onCloseModal}
            visibleData={this.state.modal.visibleData}
          />
        )}
        <Searchbar onSubmit={this.onSubmit} />
        {this.state.isLoading && this.state.perPage === 12 && <Loader />}
        <ImageGallery
          photos={this.state.photos}
          onOpenModal={this.onOpenModal}
        />
        {this.state.isLoading && this.state.perPage > 12 && <Loader />}
        {this.state.value !== '' && this.state.photos.length > 1 && (
          <Button downloadMorePage={this.downloadMorePage} />
        )}
      </div>
    );
  }
}
