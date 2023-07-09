import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { fetchPhoto } from '../services/api';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';

import css from './App.module.css';

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [visibleData, setVisibleData] = useState('');

  const onShowModal = data => {
    setIsOpen(!isOpen);
    setVisibleData(data);
  };

  const onSubmit = value => {
    setValue(value);
    setPage(1);
    setPhotos([]);
    setTotalHits(0);
  };

  useEffect(() => {
    if (value) {
      const handleFetchImages = async () => {
        try {
          // setState({ isLoading: true });
          setIsLoading(true);
          const response = await fetchPhoto(value, page);
          const finalResult = response.hits;
          console.log(value);
          const totalHits = response.totalHits;
          setPhotos([...photos, ...finalResult]);
          setTotalHits(totalHits);
        } catch (error) {
          console.log(error.message);
        } finally {
          setIsLoading(false);
        }
      };

      handleFetchImages();
    }
  }, [value, page]);

  const downloadMorePage = () => {
    setPage(page + 1);
  };

  return (
    <div className={css.App}>
      {isOpen && <Modal onShowModal={onShowModal} visibleData={visibleData} />}
      <Searchbar onSubmit={onSubmit} />
      {isLoading && page === 1 && <Loader />}
      <ImageGallery photos={photos} onShowModal={onShowModal} />
      {isLoading && page > 1 && <Loader />}
      {photos.length < totalHits && (
        <Button downloadMorePage={downloadMorePage} />
      )}
    </div>
  );
};
