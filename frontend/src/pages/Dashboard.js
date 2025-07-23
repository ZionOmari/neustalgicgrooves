import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  padding: 2rem 0;
  max-width: 1200px;
  margin: 0 auto;
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <h1>Admin Dashboard</h1>
      <p>Dashboard analytics coming soon...</p>
    </DashboardContainer>
  );
};

export default Dashboard; 