import React, { Component } from 'react';
import s from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Modal from 'components/Modal/Modal';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
  state = {
    showModal: false,
    bigPic: null,
  };

  componentDidMount() {
    document.addEventListener('click', e => {
      if (e.target.classList.contains('gallery-item__image')) {
        const picture = this.props.images.find(obj => {
          return obj.id === parseInt(e.target.alt);
        });
        this.setState({ bigPic: picture.largeImageURL });
        return;
      }
      this.setState({ showModal: false });
    });
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { showModal, bigPic } = this.state;
    return (
      <>
        <ul className={s.gallery} onClick={this.toggleModal}>
          {this.props.images.map(img => {
            return (
              <ImageGalleryItem
                key={nanoid()}
                smallImgURL={img.webformatURL}
                id={img.id}
              />
            );
          })}
        </ul>
        {showModal && bigPic && (
          <Modal onClose={this.toggleModal} pic={bigPic} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ),
};
