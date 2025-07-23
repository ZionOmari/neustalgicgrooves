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

  /* 🕺 DANCE ANIMATIONS - Let's make these buttons GROOVE! 💃 */
  
  @keyframes toprock {
    0% { transform: translateX(0) rotate(0deg); }
    25% { transform: translateX(-8px) rotate(-2deg); }
    50% { transform: translateX(8px) rotate(2deg); }
    75% { transform: translateX(-4px) rotate(-1deg); }
    100% { transform: translateX(0) rotate(0deg); }
  }

  @keyframes poplock {
    0% { transform: scale(1) rotate(0deg); }
    20% { transform: scale(1.1) rotate(1deg); }
    40% { transform: scale(0.9) rotate(-1deg); }
    60% { transform: scale(1.05) rotate(0.5deg); }
    80% { transform: scale(0.95) rotate(-0.5deg); }
    100% { transform: scale(1) rotate(0deg); }
  }

  @keyframes breakdance {
    0% { transform: translateY(0) rotate(0deg) scale(1); }
    15% { transform: translateY(-10px) rotate(5deg) scale(1.05); }
    30% { transform: translateY(5px) rotate(-3deg) scale(0.98); }
    45% { transform: translateY(-8px) rotate(2deg) scale(1.02); }
    60% { transform: translateY(3px) rotate(-1deg) scale(0.99); }
    75% { transform: translateY(-5px) rotate(1deg) scale(1.01); }
    100% { transform: translateY(0) rotate(0deg) scale(1); }
  }

  @keyframes windmill {
    0% { transform: rotate(0deg) scale(1); }
    25% { transform: rotate(90deg) scale(1.1); }
    50% { transform: rotate(180deg) scale(1); }
    75% { transform: rotate(270deg) scale(1.1); }
    100% { transform: rotate(360deg) scale(1); }
  }

  @keyframes freeze {
    0% { transform: skew(0deg, 0deg); }
    50% { transform: skew(5deg, 2deg) scale(1.05); }
    100% { transform: skew(0deg, 0deg); }
  }

  @keyframes battle {
    0% { transform: translateX(0) translateY(0); }
    20% { transform: translateX(-15px) translateY(-5px) rotate(2deg); }
    40% { transform: translateX(15px) translateY(5px) rotate(-2deg); }
    60% { transform: translateX(-10px) translateY(-3px) rotate(1deg); }
    80% { transform: translateX(10px) translateY(3px) rotate(-1deg); }
    100% { transform: translateX(0) translateY(0) rotate(0deg); }
  }

  /* Beautiful blue and green gradients */
  .gradient-ocean {
    background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
  }

  .gradient-emerald {
    background: linear-gradient(135deg, ${props => props.theme.colors.accent} 0%, ${props => props.theme.colors.secondary} 100%);
  }

  .gradient-sky {
    background: linear-gradient(135deg, ${props => props.theme.colors.primaryLight} 0%, ${props => props.theme.colors.primary} 100%);
  }

  .gradient-teal {
    background: linear-gradient(135deg, ${props => props.theme.colors.secondaryLight} 0%, ${props => props.theme.colors.secondaryDark} 100%);
  }

  .gradient-rhythm {
    background: linear-gradient(135deg, ${props => props.theme.colors.rhythm} 0%, ${props => props.theme.colors.groove} 100%);
  }

  .text-gradient-ocean {
    background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.secondary} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  }

  .text-gradient-emerald {
    background: linear-gradient(135deg, ${props => props.theme.colors.accent} 0%, ${props => props.theme.colors.accentDark} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  }

  /* 🔥 B-BOY & B-GIRL BUTTONS WITH 8-BIT BATTLE MODE! 🔥 */
  
  .btn-toprock {
    background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, ${props => props.theme.colors.blackAccent} 100%);
    color: white;
    border: 2px solid ${props => props.theme.colors.blackAccent};
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '🕺';
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      font-size: 1.2rem;
      opacity: 0;
      transition: all 0.3s ease;
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      transition: left 0.5s;
    }
    
    &:hover {
      animation: toprock 0.8s ease-in-out;
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
      padding-right: 50px;
      
      &::before {
        opacity: 1;
        animation: toprock 0.8s ease-in-out;
      }
      
      &::after {
        left: 100%;
      }
    }
  }

  .btn-poplock {
    background: ${props => props.theme.colors.blackAccent};
    color: ${props => props.theme.colors.primary};
    border: 3px solid ${props => props.theme.colors.primary};
    padding: 12px 24px;
    border-radius: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
    position: relative;
    
    &::before {
      content: '💃';
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 1.2rem;
      opacity: 0;
      transition: all 0.3s ease;
    }
    
    &:hover {
      animation: poplock 0.6s ease-in-out;
      background: ${props => props.theme.colors.primary};
      color: ${props => props.theme.colors.blackAccent};
      border-color: ${props => props.theme.colors.blackAccent};
      box-shadow: 0 0 20px ${props => props.theme.colors.primary};
      padding-left: 50px;
      
      &::before {
        opacity: 1;
        animation: poplock 0.6s ease-in-out;
      }
    }
  }

  .btn-breakdance {
    background: linear-gradient(45deg, ${props => props.theme.colors.accent} 0%, ${props => props.theme.colors.blackAccent} 50%, ${props => props.theme.colors.secondary} 100%);
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    
    &::after {
      content: '🕺';
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      opacity: 0;
      transition: all 0.3s ease;
    }
    
    &:hover {
      animation: breakdance 1s ease-in-out;
      padding-right: 40px;
      
      &::after {
        opacity: 1;
        right: 15px;
      }
    }
  }

  .btn-windmill {
    background: ${props => props.theme.colors.charcoal};
    color: ${props => props.theme.colors.accent};
    border: 2px solid ${props => props.theme.colors.accent};
    padding: 12px 24px;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      animation: windmill 1.2s ease-in-out;
      background: ${props => props.theme.colors.accent};
      color: ${props => props.theme.colors.blackAccent};
    }
  }

  .btn-freeze {
    background: linear-gradient(135deg, ${props => props.theme.colors.blackAccent} 0%, ${props => props.theme.colors.slate} 100%);
    color: ${props => props.theme.colors.primaryLight};
    border: 2px solid ${props => props.theme.colors.primaryLight};
    padding: 12px 24px;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      animation: freeze 0.4s ease-in-out;
      border-color: ${props => props.theme.colors.accent};
      color: ${props => props.theme.colors.accent};
      box-shadow: inset 0 0 10px rgba(16, 185, 129, 0.3);
    }
  }

  .btn-battle {
    background: ${props => props.theme.colors.shadow};
    color: ${props => props.theme.colors.primary};
    border: 3px solid ${props => props.theme.colors.primary};
    padding: 14px 28px;
    border-radius: 8px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '💃 VS 🕺';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      font-size: 0.9rem;
      transition: all 0.3s ease;
      white-space: nowrap;
    }
    
    &:hover {
      animation: battle 1s ease-in-out;
      background: linear-gradient(45deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
      color: ${props => props.theme.colors.blackAccent};
      border-color: ${props => props.theme.colors.blackAccent};
      
      &::before {
        opacity: 1;
        animation: battle 1s ease-in-out;
      }
    }
    
    &:active {
      transform: scale(0.95);
    }
  }

  /* 🎮 8-BIT BATTLE MODE GAME STYLES 🎮 */
  .battle-game {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(45deg, #000428, #004e92);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Courier New', monospace;
    color: #00ff00;
    text-shadow: 0 0 10px #00ff00;
  }

  .battle-arena {
    width: 80%;
    max-width: 800px;
    height: 400px;
    background: #000;
    border: 4px solid #00ff00;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 20px #00ff00;
  }

  .bboy-left, .bgirl-right {
    position: absolute;
    bottom: 20px;
    font-size: 4rem;
    transition: all 0.3s ease;
  }

  .bboy-left {
    left: 50px;
    color: #00bfff;
    text-shadow: 0 0 10px #00bfff;
  }

  .bgirl-right {
    right: 50px;
    color: #ff69b4;
    text-shadow: 0 0 10px #ff69b4;
  }

  .battle-controls {
    margin-top: 30px;
    text-align: center;
  }

  .control-instructions {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 20px;
    max-width: 600px;
  }

  .control-key {
    background: rgba(0, 255, 0, 0.1);
    border: 2px solid #00ff00;
    padding: 15px;
    border-radius: 10px;
    text-align: center;
    transition: all 0.3s ease;
  }

  .control-key:hover {
    background: rgba(0, 255, 0, 0.3);
    box-shadow: 0 0 15px #00ff00;
  }

  .key-button {
    background: #00ff00;
    color: #000;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    font-weight: bold;
    margin-bottom: 10px;
    display: block;
    margin: 0 auto 10px;
  }

  .move-name {
    font-weight: bold;
    color: #ffff00;
    text-shadow: 0 0 5px #ffff00;
  }

  .close-battle {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(255, 0, 0, 0.8);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
  }

  .battle-score {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.5rem;
    font-weight: bold;
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