import React, {
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import img1 from '../assets/images/banners/2020-09-21-04-04-08-6781.jpg';
import img2 from '../assets/images/banners/2020-11-10-10-30-52-4182.jpg';
import img3 from '../assets/images/banners/2022-10-20-03-09-05-2873.jpg';
import img4 from '../assets/images/banners/2022-11-02-11-11-36-1209.jpg';
import img5 from '../assets/images/banners/2022-11-04-12-18-08-3093.jpg';
import img6 from '../assets/images/banners/2022-12-19-10-47-42-8775.jpg';
import img7 from '../assets/images/banners/2023-12-06-10-02-28-2030.jpg';
import img8 from '../assets/images/banners/2024-04-11-04-27-43-2330.jpg';
import img9 from '../assets/images/banners/2024-06-03-11-43-49-83.jpg';
import img10 from '../assets/images/banners/2024-06-13-07-40-14-3865.jpg';
import img11 from '../assets/images/banners/2024-06-28-11-47-30-3905.jpg';
import img12 from '../assets/images/banners/stance-black-night-sights-9mm-bullets.jpg';
const Landing = () => {
  const images = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
  ];
  const [image, setImage] = useState(images[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentIndex = images.indexOf(image);
      const nextIndex =
        (currentIndex + 1) % images.length;
      setImage(images[nextIndex]);
    }, 5000);
    return () => clearInterval(timer);
  }, [image]);

  return (
    <Wrapper image={image}>
      <div className="content">
        <h1>Welcome to G-Arms</h1>
        <button>See them all</button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  height: 100vh;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-image: url(${props => props.image});
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
  }
  .content {
    position: relative;
    text-align: center;
    color: white;
    z-index: 1;

    h1 {
      font-size: 3rem;
      margin-bottom: 20px;
      text-transform: uppercase;
      margin-bottom: 2rem;
      font-weight: bold;
    }

    button {
      padding: 10px 20px;
      letter-spacing: 1px;
      background-color: #cd0000;
      text-transform: uppercase;
      color: white;
      border: none;
      cursor: pointer;
      border-radius: 5px;

      &:hover {
        background-color: #ad0101;
      }
    }
  }
`;
export default Landing;
