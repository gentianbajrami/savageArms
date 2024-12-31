import React, {
  useState,
  useEffect,
} from 'react';
import styled from 'styled-components';
import img1 from '../assets/images/arms/deagle.jpg';
import img2 from '../assets/images/arms/model870.jpg';
import img3 from '../assets/images/arms/pistol.jpg';
import img4 from '../assets/images/arms/shotgun.webp';

const images = [img1, img2, img3, img4];

const FeatureArmsCarousel = () => {
  const [currentIndex, setCurrentIndex] =
    useState(0);
  const [imagesToShow, setImagesToShow] =
    useState(3); // Default to 3 images

  // Adjust imagesToShow based on screen size
  useEffect(() => {
    const updateImagesToShow = () => {
      setImagesToShow(
        window.innerWidth > 992 ? 3 : 2
      );
    };

    // Initial check
    updateImagesToShow();

    // Update on resize
    window.addEventListener(
      'resize',
      updateImagesToShow
    );

    return () => {
      window.removeEventListener(
        'resize',
        updateImagesToShow
      );
    };
  }, []);

  const prevSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0
        ? images.length - 1
        : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex(
      prevIndex => (prevIndex + 1) % images.length
    );
  };

  // Dynamically slice images based on the current index and imagesToShow
  const displayedImages = Array(imagesToShow)
    .fill()
    .map(
      (_, idx) =>
        images[
          (currentIndex + idx) % images.length
        ] // Ensures circular navigation
    );

  return (
    <Wrapper>
      <h2>Feature Arms</h2>
      <div className="carousel">
        <button
          className="prev"
          onClick={prevSlide}
        >
          &#10094;
        </button>
        <div className="image-container">
          {displayedImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Slide ${index}`}
            />
          ))}
        </div>
        <button
          className="next"
          onClick={nextSlide}
        >
          &#10095;
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 5rem auto;
  h2 {
    text-align: center;
    letter-spacing: var(--letter-spacing);
    margin-bottom: 2.5rem;
  }
  .carousel {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    max-width: var(--max-width);
    margin: 0 auto;
    width: 80%;
    padding: 0 1rem;
  }
  .image-container {
    display: flex;
    overflow: hidden;
    max-width: 1200px;
    gap: 1rem;
    justify-content: center;
    transition: transform 0.5s ease-in-out;
    img {
      max-width: 400px;
      height: 200px;
      object-fit: contain;
    }
  }
  @media (max-width: 992px) {
    .image-container {
      max-width: 400px;
    }
    .image-container img {
      max-width: 200px;
    }
  }
  @media (max-width: 630px) {
    .image-container img {
      max-width: 100px;
    }
  }
  .prev,
  .next {
    background: transparent;
    color: #d50505;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.5rem;
  }
  .prev {
    left: 0;
  }
  .next {
    right: 0;
  }
`;

export default FeatureArmsCarousel;
