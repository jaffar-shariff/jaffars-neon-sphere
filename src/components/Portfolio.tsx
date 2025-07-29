import { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';
import Footer from './Footer';

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    // Prevent scrolling during loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      <div className={`min-h-screen bg-gradient-bg ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`}>
        <Navigation />
        
        <main>
          <div id="hero">
            <HeroSection />
          </div>
          
          <div id="about">
            <AboutSection />
          </div>
          
          <div id="projects">
            <ProjectsSection />
          </div>
          
          <div id="contact">
            <ContactSection />
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Portfolio;