import React from 'react';
import styled from 'styled-components';

const ScheduleContainer = styled.div`
  padding: 2rem 0;
  max-width: 800px;
  margin: 0 auto;
`;

const Schedule = () => {
  return (
    <ScheduleContainer>
      <h1>Class Schedule</h1>
      <p>Weekly schedule coming soon...</p>
    </ScheduleContainer>
  );
};

export default Schedule; 