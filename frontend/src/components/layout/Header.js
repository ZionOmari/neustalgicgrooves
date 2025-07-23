import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiInstagram, FiFacebook, FiYoutube } from 'react-icons/fi';

const HeaderContainer = styled.header`
  background: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.shadows.small};
  position: sticky;
  top: 0;
  z-index: ${props => props.theme.zIndices.sticky};
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: ${props => props.theme.colors.primaryDark};
  }
`;

const LogoText = styled.span`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${props => props.theme.colors.white};
    flex-direction: column;
    padding: 2rem;
    box-shadow: ${props => props.theme.shadows.large};
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
  
  &.active {
    color: ${props => props.theme.colors.primary};
    
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      right: 0;
      height: 2px;
      background: ${props => props.theme.colors.primary};
      border-radius: 1px;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
  }
`;

const SocialLink = styled.a`
  color: ${props => props.theme.colors.textLight};
  font-size: 1.2rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">
          <LogoText>Neustalgic Grooves</LogoText>
        </Logo>
        
        <NavLinks isOpen={isMenuOpen}>
          <li>
            <NavLink 
              to="/" 
              className={isActive('/') ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/schedule" 
              className={isActive('/schedule') ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              Schedule
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/instructors" 
              className={isActive('/instructors') ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              Instructors
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/gallery" 
              className={isActive('/gallery') ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/signup" 
              className={isActive('/signup') ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/scholarship" 
              className={isActive('/scholarship') ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              Scholarship
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/sponsorship" 
              className={isActive('/sponsorship') ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              Sponsorship
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/private-lessons" 
              className={isActive('/private-lessons') ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              Private Lessons
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/contact" 
              className={isActive('/contact') ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </NavLink>
          </li>
          
          <SocialLinks isOpen={isMenuOpen}>
            <SocialLink 
              href="https://instagram.com/neustalgicgrooves" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
            >
              <FiInstagram />
            </SocialLink>
            <SocialLink 
              href="https://facebook.com/neustalgicgrooves" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Follow us on Facebook"
            >
              <FiFacebook />
            </SocialLink>
            <SocialLink 
              href="https://youtube.com/neustalgicgrooves" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Subscribe to our YouTube channel"
            >
              <FiYoutube />
            </SocialLink>
          </SocialLinks>
        </NavLinks>
        
        <MobileMenuButton onClick={toggleMenu}>
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </MobileMenuButton>
      </Nav>
    </HeaderContainer>
  );
};

export default Header; 