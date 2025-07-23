import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
    color: ${props => props.theme.colors.text};
    background-color: ${props => props.theme.colors.background};
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .App {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.5rem;
  }

  p {
    margin-bottom: 1rem;
  }

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${props => props.theme.colors.primaryDark};
    }
  }

  button {
    cursor: pointer;
    border: none;
    border-radius: ${props => props.theme.borderRadius};
    padding: 0.75rem 1.5rem;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.3s ease;
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .btn-primary {
    background: ${props => props.theme.colors.primary};
    color: white;
    
    &:hover:not(:disabled) {
      background: ${props => props.theme.colors.primaryDark};
      transform: translateY(-2px);
    }
  }

  .btn-secondary {
    background: ${props => props.theme.colors.secondary};
    color: white;
    
    &:hover:not(:disabled) {
      background: ${props => props.theme.colors.secondaryDark};
      transform: translateY(-2px);
    }
  }

  .btn-outline {
    background: transparent;
    border: 2px solid ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
    
    &:hover:not(:disabled) {
      background: ${props => props.theme.colors.primary};
      color: white;
      transform: translateY(-2px);
    }
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .section {
    padding: 4rem 0;
  }

  .text-center {
    text-align: center;
  }

  .mb-1 { margin-bottom: 1rem; }
  .mb-2 { margin-bottom: 2rem; }
  .mb-3 { margin-bottom: 3rem; }
  .mb-4 { margin-bottom: 4rem; }

  .mt-1 { margin-top: 1rem; }
  .mt-2 { margin-top: 2rem; }
  .mt-3 { margin-top: 3rem; }
  .mt-4 { margin-top: 4rem; }

  .grid {
    display: grid;
    gap: 2rem;
  }

  .grid-2 {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .grid-3 {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  .grid-4 {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .flex {
    display: flex;
  }

  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .flex-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
  }

  .card {
    background: white;
    border-radius: ${props => props.theme.borderRadius};
    padding: 2rem;
    box-shadow: ${props => props.theme.shadows.medium};
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: ${props => props.theme.shadows.large};
    }
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: ${props => props.theme.colors.textDark};
  }

  .form-input {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid ${props => props.theme.colors.lightGray};
    border-radius: ${props => props.theme.borderRadius};
    font-size: 1rem;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
    }

    &.error {
      border-color: ${props => props.theme.colors.error};
    }
  }

  .form-textarea {
    min-height: 120px;
    resize: vertical;
  }

  .form-error {
    color: ${props => props.theme.colors.error};
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }

  .alert {
    padding: 1rem;
    border-radius: ${props => props.theme.borderRadius};
    margin-bottom: 1rem;
  }

  .alert-success {
    background: ${props => props.theme.colors.successLight};
    color: ${props => props.theme.colors.success};
    border: 1px solid ${props => props.theme.colors.success};
  }

  .alert-error {
    background: ${props => props.theme.colors.errorLight};
    color: ${props => props.theme.colors.error};
    border: 1px solid ${props => props.theme.colors.error};
  }

  .loading {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid ${props => props.theme.colors.primary};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @media (max-width: 768px) {
    .container {
      padding: 0 1rem;
    }

    .section {
      padding: 2rem 0;
    }

    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.5rem;
    }

    .grid {
      gap: 1rem;
    }

    .card {
      padding: 1.5rem;
    }
  }
`;

export default GlobalStyles; 