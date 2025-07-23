import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiPlay, FiUsers, FiTrendingUp, FiInstagram, FiFacebook, FiYoutube } from 'react-icons/fi';

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
  color: white;
  padding: 6rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/api/placeholder/1200/600') center/cover;
    opacity: 0.2;
    z-index: 0;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const CTAButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const CTAButton = styled(Link)`
  background: ${props => props.primary ? 'white' : 'transparent'};
  color: ${props => props.primary ? props.theme.colors.primary : 'white'};
  border: 2px solid white;
  padding: 1rem 2rem;
  border-radius: ${props => props.theme.borderRadius};
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: white;
    color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const AboutSection = styled.section`
  padding: 6rem 0;
  background: white;
`;

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
  color: ${props => props.theme.colors.text};
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  align-items: center;
`;

const AboutText = styled.div`
  h3 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1rem;
  }
  
  p {
    color: ${props => props.theme.colors.textLight};
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  text-align: center;
`;

const StatItem = styled.div`
  .stat-number {
    font-size: 2.5rem;
    font-weight: 700;
    color: ${props => props.theme.colors.primary};
    display: block;
  }
  
  .stat-label {
    color: ${props => props.theme.colors.textLight};
    font-weight: 500;
  }
`;

const ClassesSection = styled.section`
  padding: 6rem 0;
  background: ${props => props.theme.colors.gray100};
`;

const ClassesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ClassCard = styled(motion.div)`
  background: white;
  border-radius: ${props => props.theme.borderRadius};
  padding: 2rem;
  text-align: center;
  box-shadow: ${props => props.theme.shadows.medium};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

const ClassIcon = styled.div`
  width: 80px;
  height: 80px;
  background: ${props => props.theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2rem;
  color: white;
`;

const ClassTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
`;

const ClassDescription = styled.p`
  color: ${props => props.theme.colors.textLight};
  margin-bottom: 1.5rem;
`;

const ClassSchedule = styled.div`
  background: ${props => props.theme.colors.gray100};
  padding: 1rem;
  border-radius: ${props => props.theme.borderRadius};
  margin-bottom: 1.5rem;
  
  .day {
    font-weight: 600;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 0.5rem;
  }
  
  .time {
    color: ${props => props.theme.colors.textLight};
  }
`;

const SocialSection = styled.section`
  padding: 6rem 0;
  background: white;
  text-align: center;
`;

const SocialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const SocialCard = styled(motion.a)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: ${props => props.theme.colors.gray100};
  border-radius: ${props => props.theme.borderRadius};
  text-decoration: none;
  color: ${props => props.theme.colors.text};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    background: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const SocialIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.primary};
  
  ${SocialCard}:hover & {
    color: white;
  }
`;

const Home = () => {
  return (
    <>
      <HeroSection>
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Discover Your Rhythm at Neustalgic Grooves
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Empowering youth through breaking, funk styles, and the culture of hip-hop dance. 
            Join our community and unleash your inner dancer.
          </HeroSubtitle>
          <CTAButtons
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <CTAButton to="/signup" primary>Start Your Journey</CTAButton>
            <CTAButton to="/schedule">View Schedule</CTAButton>
          </CTAButtons>
        </HeroContent>
      </HeroSection>

      <AboutSection>
        <SectionContent>
          <SectionTitle>About Neustalgic Grooves</SectionTitle>
          <AboutGrid>
            <AboutText>
              <h3>Our Mission</h3>
              <p>
                At Neustalgic Grooves, we believe that dance is more than movement—it's a form of 
                expression, a way to build confidence, and a path to community. We specialize in 
                breaking (breakdancing) and funk styles, teaching both the technical skills and 
                the cultural foundation of hip-hop dance.
              </p>
              <p>
                Our program serves youth of all backgrounds, offering scholarships and sponsorship 
                opportunities to ensure that financial barriers never prevent a young person from 
                discovering their passion for dance.
              </p>
            </AboutText>
            <StatsContainer>
              <StatItem>
                <span className="stat-number">200+</span>
                <span className="stat-label">Students Served</span>
              </StatItem>
              <StatItem>
                <span className="stat-number">3</span>
                <span className="stat-label">Expert Instructors</span>
              </StatItem>
              <StatItem>
                <span className="stat-number">50+</span>
                <span className="stat-label">Scholarships Awarded</span>
              </StatItem>
              <StatItem>
                <span className="stat-number">5</span>
                <span className="stat-label">Years of Impact</span>
              </StatItem>
            </StatsContainer>
          </AboutGrid>
        </SectionContent>
      </AboutSection>

      <ClassesSection>
        <SectionContent>
          <SectionTitle>Our Classes</SectionTitle>
          <ClassesGrid>
            <ClassCard
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <ClassIcon>
                <FiUsers />
              </ClassIcon>
              <ClassTitle>Kids Breaking</ClassTitle>
              <ClassDescription>
                Introduction to breaking fundamentals for youth ages 8-16. Learn toprock, 
                footwork, freezes, and basic power moves in a fun, supportive environment.
              </ClassDescription>
              <ClassSchedule>
                <div className="day">Monday</div>
                <div className="time">5:30 PM - 6:30 PM</div>
              </ClassSchedule>
              <CTAButton to="/signup">Join Class</CTAButton>
            </ClassCard>

            <ClassCard
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <ClassIcon>
                <FiTrendingUp />
              </ClassIcon>
              <ClassTitle>Adult Breaking</ClassTitle>
              <ClassDescription>
                Advanced breaking techniques for adults. Focus on complex power moves, 
                battle strategies, and personal style development.
              </ClassDescription>
              <ClassSchedule>
                <div className="day">Wednesday</div>
                <div className="time">5:30 PM - 6:30 PM</div>
              </ClassSchedule>
              <CTAButton to="/signup">Join Class</CTAButton>
            </ClassCard>

            <ClassCard
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <ClassIcon>
                <FiPlay />
              </ClassIcon>
              <ClassTitle>Funk Styles</ClassTitle>
              <ClassDescription>
                Explore popping, locking, and other funk styles. Perfect for all skill levels 
                looking to add groove and musicality to their movement.
              </ClassDescription>
              <ClassSchedule>
                <div className="day">Monday & Wednesday</div>
                <div className="time">6:30 PM - 7:30 PM</div>
              </ClassSchedule>
              <CTAButton to="/signup">Join Class</CTAButton>
            </ClassCard>
          </ClassesGrid>
        </SectionContent>
      </ClassesSection>

      <SocialSection>
        <SectionContent>
          <SectionTitle>Follow Our Journey</SectionTitle>
          <p>Stay connected with our community and see our dancers in action!</p>
          <SocialGrid>
            <SocialCard
              href="https://instagram.com/neustalgicgrooves"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <SocialIcon>
                <FiInstagram />
              </SocialIcon>
              <h3>Instagram</h3>
              <p>Daily updates, student highlights, and behind-the-scenes content</p>
            </SocialCard>

            <SocialCard
              href="https://facebook.com/neustalgicgrooves"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <SocialIcon>
                <FiFacebook />
              </SocialIcon>
              <h3>Facebook</h3>
              <p>Community discussions, event announcements, and photo albums</p>
            </SocialCard>

            <SocialCard
              href="https://youtube.com/neustalgicgrooves"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <SocialIcon>
                <FiYoutube />
              </SocialIcon>
              <h3>YouTube</h3>
              <p>Video tutorials, performances, and dance battles</p>
            </SocialCard>
          </SocialGrid>
        </SectionContent>
      </SocialSection>
    </>
  );
};

export default Home; 