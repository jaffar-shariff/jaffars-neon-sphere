import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code, 
  Database, 
  Bot, 
  Server, 
  Smartphone, 
  TrendingUp,
  Globe,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedCard3D from './AnimatedCard3D';
import ResumeDialog from './ResumeDialog';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'HTML/CSS/JS', icon: Code, color: 'text-primary' },
  { name: 'React', icon: Code, color: 'text-primary' },
  { name: 'Python', icon: Code, color: 'text-secondary' },
  { name: 'SQL', icon: Database, color: 'text-accent' },
  { name: 'WordPress', icon: Globe, color: 'text-primary' },
  { name: 'AI Chatbots', icon: Bot, color: 'text-secondary' },
  { name: 'Hosting', icon: Server, color: 'text-accent' },
  { name: 'SEO/Marketing', icon: TrendingUp, color: 'text-primary' }
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main section animation
      gsap.fromTo(sectionRef.current,
        { 
          opacity: 0,
          filter: 'blur(10px)'
        },
        {
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Image animation
      gsap.fromTo(imageRef.current,
        {
          x: -100,
          opacity: 0,
          rotation: -10
        },
        {
          x: 0,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 85%'
          }
        }
      );

      // Content animation
      gsap.fromTo(contentRef.current,
        {
          x: 100,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%'
          }
        }
      );

      // Skills stagger animation
      gsap.fromTo(skillsRef.current?.children || [],
        {
          y: 50,
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 90%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="min-h-screen py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow">
            About{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate about creating innovative digital solutions that make a difference
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Download Resume Button */}
          <div ref={imageRef} className="flex justify-center lg:justify-end">
            <ResumeDialog>
              <AnimatedCard3D className="cursor-pointer" intensity={0.6}>
                <div className="relative group">
                  {/* Circular Resume Button */}
                  <div className="w-32 h-32 rounded-full glass-card p-8 hover:scale-110 transition-all duration-300 group relative overflow-hidden flex items-center justify-center">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-primary opacity-10 group-hover:opacity-30 transition-opacity rounded-full" />
                    
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-glow-primary" />
                    
                    {/* Resume Icon */}
                    <div className="relative text-center">
                      <svg className="w-12 h-12 text-primary group-hover:text-primary-glow transition-colors duration-300 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/>
                        <path d="M8 8a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                        <path d="M8 12a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                      </svg>
                      <p className="text-xs font-bold text-primary group-hover:text-primary-glow transition-colors">
                        Resume
                      </p>
                    </div>

                    {/* Animated ring on hover */}
                    <div className="absolute inset-0 rounded-full border-2 border-primary/30 group-hover:border-primary group-hover:animate-pulse-glow transition-all duration-300" />
                    
                    {/* Outer glow ring */}
                    <div className="absolute -inset-2 rounded-full border border-primary/20 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500" />
                  </div>

                  {/* Tooltip */}
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="glass-card px-3 py-1 text-xs text-primary font-medium whitespace-nowrap">
                      Click for Resume
                    </div>
                  </div>
                </div>
              </AnimatedCard3D>
            </ResumeDialog>
          </div>

          {/* About Content */}
          <div ref={contentRef} className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
              Web & Tech Specialist
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate web developer and tech specialist with expertise in building 
              modern, responsive websites and web applications. I specialize in AI-powered 
              solutions, automation, and creating seamless digital experiences.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              With a strong background in customer success and training, I help businesses 
              leverage technology to streamline their operations and achieve their goals. 
              From WordPress development to Python automation and database management, 
              I bring technical expertise with a user-centered approach.
            </p>
            
            <div className="glass-card p-6 mt-8">
              <h4 className="text-xl font-semibold mb-4 text-primary">Key Specializations</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• AI-powered website development and automation</li>
                <li>• WordPress customization and optimization</li>
                <li>• Database design and management (SQL)</li>
                <li>• Hosting solutions and technical support</li>
                <li>• Digital marketing and SEO strategies</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-8 text-glow">Technical Skills</h3>
          <div 
            ref={skillsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <AnimatedCard3D
                  key={skill.name}
                  className="cursor-pointer"
                  intensity={0.6}
                >
                  <div className="glass-card p-6 hover:scale-105 transition-transform duration-300 group">
                    <Icon className={`w-8 h-8 mx-auto mb-3 ${skill.color} group-hover:scale-110 transition-transform transform-gpu`} />
                    <p className="text-sm font-medium text-foreground">{skill.name}</p>
                  </div>
                </AnimatedCard3D>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;