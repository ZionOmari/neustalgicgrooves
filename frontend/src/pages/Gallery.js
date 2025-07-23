import React from 'react';
import styled from 'styled-components';

const GalleryContainer = styled.div`
  padding: 2rem 0;
  max-width: 1200px;
  margin: 0 auto;
`;

const Gallery = () => {
  return (
    <GalleryContainer>
      <h1>Gallery</h1>
      <p>Photo and video gallery coming soon...</p>
    </GalleryContainer>
  );
};

export default Gallery; 