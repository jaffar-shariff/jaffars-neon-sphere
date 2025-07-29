import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer fade in
      gsap.fromTo(footerRef.current,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%'
          }
        }
      );

      // Floating particles animation
      const particles = particlesRef.current?.children;
      if (particles) {
        Array.from(particles).forEach((particle, index) => {
          gsap.set(particle, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * 200,
            opacity: Math.random() * 0.5 + 0.2
          });

          gsap.to(particle, {
            y: '-=50',
            duration: 3 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: index * 0.5
          });

          gsap.to(particle, {
            x: '+=30',
            duration: 4 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: index * 0.3
          });
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { icon: Github, label: 'GitHub', url: 'https://github.com/jaffarshariff' },
    { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com/in/jaffarshariff' },
    { icon: Mail, label: 'Email', url: 'mailto:hello@jaffar.website' }
  ];

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <footer ref={footerRef} className="relative bg-background/50 border-t border-primary/20 backdrop-blur-sm">
      {/* Floating Particles Background */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full blur-sm"
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Jaffar Shariff
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Web & Tech Specialist crafting innovative digital solutions with AI, 
              automation, and modern design principles.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 glass-card border-primary/30 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
            <nav className="space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Services</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Web Development</li>
              <li>AI Integration</li>
              <li>WordPress Solutions</li>
              <li>Database Management</li>
              <li>Digital Marketing</li>
              <li>Technical Support</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-primary/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500 animate-pulse" /> by Jaffar Shariff
          </p>
          <p className="text-muted-foreground text-sm">
            © 2024 All rights reserved.
          </p>
        </div>
      </div>

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
    </footer>
  );
};

export default Footer;