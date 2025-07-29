import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Animate elements in sequence
    tl.fromTo(headlineRef.current,
      { 
        opacity: 0, 
        y: 50, 
        filter: 'blur(10px)' 
      },
      { 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power2.out'
      }
    )
    .fromTo(subtitleRef.current,
      { 
        opacity: 0, 
        y: 30 
      },
      { 
        opacity: 1, 
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.6'
    )
    .fromTo(ctaRef.current,
      { 
        opacity: 0, 
        scale: 0.8 
      },
      { 
        opacity: 1, 
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)'
      }, '-=0.4'
    )
    .fromTo(scrollRef.current,
      { 
        opacity: 0, 
        y: 20 
      },
      { 
        opacity: 1, 
        y: 0,
        duration: 0.6
      }, '-=0.2');

    // Floating animation for scroll indicator
    gsap.to(scrollRef.current, {
      y: 10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    // Neon 3D background effect on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const orbs = document.querySelectorAll('.floating-orb');
      
      orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.5;
        const rotation = scrollY * speed * 0.1;
        const scale = 1 + (scrollY * 0.0005);
        
        gsap.to(orb, {
          rotation: rotation,
          scale: Math.min(scale, 1.5),
          duration: 0.1,
          ease: 'none'
        });
      });

      // Enhance background opacity based on scroll
      const backgroundOverlay = heroRef.current?.querySelector('.bg-background\\/80');
      if (backgroundOverlay) {
        const opacity = Math.min(0.8 + (scrollY * 0.0005), 0.95);
        gsap.to(backgroundOverlay, {
          opacity: opacity,
          duration: 0.1,
          ease: 'none'
        });
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      tl.kill();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Fullscreen Spline 3D Model Background */}
      <div className="absolute inset-0 w-full h-full">
        <iframe 
          src='https://my.spline.design/holoblobs-DuiqBgLSF7PKIVAkmdVSANDN/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-background/20 backdrop-blur-[0.5px]" />
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-orb w-96 h-96 -top-20 -left-20 bg-gradient-primary opacity-20" />
        <div className="floating-orb w-64 h-64 top-1/3 right-10 bg-gradient-glow opacity-15" style={{ animationDelay: '2s' }} />
        <div className="floating-orb w-48 h-48 bottom-20 left-1/4 bg-secondary opacity-25" style={{ animationDelay: '4s' }} />
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <h1 
          ref={headlineRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-glow"
        >
          Hi, I'm{' '}
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Jaffar Shariff
          </span>
          <br />
          <span className="text-2xl md:text-4xl lg:text-5xl text-foreground/90">
            Web & Tech Specialist
          </span>
        </h1>

        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 font-light leading-relaxed"
        >
          Building seamless digital experiences with{' '}
          <span className="text-primary font-medium">AI</span>,{' '}
          <span className="text-secondary font-medium">automation</span>, and{' '}
          <span className="text-accent font-medium">modern design</span>
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button className="neon-button text-primary-foreground px-8 py-4 text-lg cursor-pointer transform-gpu hover:scale-110 hover:rotate-1 transition-all duration-300">
            Hire Me
          </Button>
          <Button 
            variant="outline" 
            className="glass-card border-primary/30 text-foreground hover:bg-primary/10 px-8 py-4 text-lg cursor-pointer transform-gpu hover:scale-105 hover:-rotate-1 transition-all duration-300"
          >
            View Projects
          </Button>
          <Button 
            className="bg-gradient-secondary text-secondary-foreground px-8 py-4 text-lg cursor-pointer transform-gpu hover:scale-105 hover:rotate-1 transition-all duration-300 shadow-glow-secondary"
          >
            Get Updates
          </Button>
        </div>

        {/* Glowing mouse scroll indicator */}
        <div 
          ref={scrollRef}
          onClick={scrollToAbout}
          className="cursor-pointer flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
        >
          <div className="relative">
            <div className="w-6 h-10 border-2 border-primary/50 rounded-full group-hover:border-primary transition-colors">
              <div className="w-1 h-2 bg-primary rounded-full mx-auto mt-2 animate-bounce"></div>
            </div>
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse-glow"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;