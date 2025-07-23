import React from 'react';
import styled from 'styled-components';

const PrivateLessonsContainer = styled.div`
  padding: 2rem 0;
  max-width: 800px;
  margin: 0 auto;
`;

const PrivateLessons = () => {
  return (
    <PrivateLessonsContainer>
      <h1>Private Lessons</h1>
      <p>Private lesson booking coming soon...</p>
    </PrivateLessonsContainer>
  );
};

export default PrivateLessons; 