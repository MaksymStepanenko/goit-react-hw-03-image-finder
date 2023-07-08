import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { fetchPhoto } from '../services/api';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';

import css from './App.module.css';

export class App extends Component {
  state = {
    // modal: { isOpen: false, visibleData: '' },
    isLoading: false,
    error: null,
    value: '',
    photos: [],
    page: 1,
    totalHits: 0,
    isOpen: false,
    visibleData: '',
  };

  // onOpenModal = data => {
  //   this.setState({
  //     modal: {
  //       isOpen: true,
  //       visibleData: data,
  //     },
  //   });
  // };

  // onCloseModal = () => {
  //   this.setState({
  //     modal: {
  //       isOpen: false,
  //       visibleData: null,
  //     },
  //   });
  // };

  onShowModal = data => {
    this.setState({
      isOpen: !this.state.isOpen,
      visibleData: data,
    });
  };

  onSubmit = value => {
    // console.log('🚀 ~ file: App.jsx:7 ~ App ~ value:', value);
    this.setState({
      value,
      page: 1,
      photos: [],
      totalHits: 0,
    });
  };

  handleFetchImages = async () => {
    const { value, page } = this.state;
    try {
      this.setState({ isLoading: true });
      const response = await fetchPhoto(value, page);
      // console.log(response.hits);
      const finalResult = response.hits;
      const totalHits = response.totalHits;
      this.setState(prevState => ({
        photos: [...prevState.photos, ...finalResult],
        totalHits,
      }));
    } catch (error) {
      console.log(error.message);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  async componentDidUpdate(_, prevState) {
    const { value, page } = this.state;

    if (prevState.value !== value || prevState.page !== page) {
      this.handleFetchImages();
    }
  }

  downloadMorePage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { photos, page, isLoading, totalHits, isOpen, visibleData } =
      this.state;
    return (
      <div className={css.App}>
        {isOpen && (
          <Modal onShowModal={this.onShowModal} visibleData={visibleData} />
        )}
        <Searchbar onSubmit={this.onSubmit} />
        {isLoading && page === 1 && <Loader />}
        <ImageGallery photos={photos} onShowModal={this.onShowModal} />
        {isLoading && page > 1 && <Loader />}
        {photos.length < totalHits && (
          <Button downloadMorePage={this.downloadMorePage} />
        )}
      </div>
    );
  }
}
