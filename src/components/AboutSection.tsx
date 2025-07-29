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
          {/* Download Resume Section */}
          <div ref={imageRef} className="flex justify-center lg:justify-end">
            <ResumeDialog>
              <AnimatedCard3D className="cursor-pointer" intensity={0.8}>
                <div className="glass-card p-8 hover:scale-105 transition-all duration-300 group relative overflow-hidden max-w-sm">
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-primary opacity-5 group-hover:opacity-15 transition-opacity" />
                  
                  {/* Resume Icon - Modern Document with Glow */}
                  <div className="relative text-center mb-6">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-primary p-5 group-hover:scale-110 transition-transform transform-gpu shadow-glow-primary">
                      <svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    
                    {/* Floating tech icons around resume */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center animate-float">
                      <Code className="w-3 h-3 text-secondary" />
                    </div>
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                      <Database className="w-3 h-3 text-accent" />
                    </div>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      Resume
                    </h3>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      View or download my complete experience and skills
                    </p>
                    
                    <Button className="neon-button w-full py-3 text-base font-semibold">
                      View / Download
                    </Button>
                  </div>

                  {/* Animated particles */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-primary/30 rounded-full animate-pulse" />
                  <div className="absolute bottom-4 left-4 w-2 h-2 bg-secondary/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                  
                  {/* Hover glow effect */}
                  <div className="absolute -inset-1 bg-gradient-primary opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-2xl -z-10" />
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