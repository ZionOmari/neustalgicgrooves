import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiInstagram, FiFacebook, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const FooterContainer = styled.footer`
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.white};
  padding: 3rem 0 1rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.primary};
    font-size: 1.2rem;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  
  span {
    background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const Description = styled.p`
  color: ${props => props.theme.colors.gray300};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${props => props.theme.colors.primary};
  color: white;
  border-radius: 50%;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;

const QuickLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    margin-bottom: 0.5rem;
  }
`;

const FooterLink = styled(Link)`
  color: ${props => props.theme.colors.gray300};
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const ContactInfo = styled.div`
  p {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    color: ${props => props.theme.colors.gray300};
    
    svg {
      color: ${props => props.theme.colors.primary};
      min-width: 20px;
    }
  }
`;

const ScheduleInfo = styled.div`
  .schedule-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid ${props => props.theme.colors.gray600};
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  .day {
    font-weight: 500;
    color: ${props => props.theme.colors.primary};
  }
  
  .classes {
    color: ${props => props.theme.colors.gray300};
    font-size: 0.9rem;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${props => props.theme.colors.gray600};
  margin-top: 2rem;
  padding-top: 1rem;
  text-align: center;
  color: ${props => props.theme.colors.gray400};
  font-size: 0.9rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <Logo>
            <span>Neustalgic Grooves</span>
          </Logo>
          <Description>
            Empowering youth through the art of breaking and funk styles. 
            Join our community and discover the rhythm within you.
          </Description>
          <SocialLinks>
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
        </FooterSection>
        
        <FooterSection>
          <h3>Quick Links</h3>
          <QuickLinks>
            <li><FooterLink to="/">Home</FooterLink></li>
            <li><FooterLink to="/schedule">Class Schedule</FooterLink></li>
            <li><FooterLink to="/instructors">Instructors</FooterLink></li>
            <li><FooterLink to="/gallery">Gallery</FooterLink></li>
            <li><FooterLink to="/signup">Sign Up</FooterLink></li>
            <li><FooterLink to="/scholarship">Scholarship</FooterLink></li>
            <li><FooterLink to="/sponsorship">Sponsorship</FooterLink></li>
            <li><FooterLink to="/private-lessons">Private Lessons</FooterLink></li>
            <li><FooterLink to="/contact">Contact</FooterLink></li>
          </QuickLinks>
        </FooterSection>
        
        <FooterSection>
          <h3>Class Schedule</h3>
          <ScheduleInfo>
            <div className="schedule-item">
              <span className="day">Monday</span>
              <div className="classes">
                <div>Kids Breaking 5:30-6:30 PM</div>
                <div>Funk Styles 6:30-7:30 PM</div>
              </div>
            </div>
            <div className="schedule-item">
              <span className="day">Wednesday</span>
              <div className="classes">
                <div>Adult Breaking 5:30-6:30 PM</div>
                <div>Funk Styles 6:30-7:30 PM</div>
              </div>
            </div>
          </ScheduleInfo>
        </FooterSection>
        
        <FooterSection>
          <h3>Contact Info</h3>
          <ContactInfo>
            <p>
              <FiMail />
              info@neustalgicgrooves.com
            </p>
            <p>
              <FiPhone />
              (555) 123-4567
            </p>
            <p>
              <FiMapPin />
              123 Dance Street, City, State 12345
            </p>
          </ContactInfo>
        </FooterSection>
      </FooterContent>
      
      <FooterBottom>
        <p>&copy; 2024 Neustalgic Grooves. All rights reserved. | Built with ❤️ for the dance community</p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer; 