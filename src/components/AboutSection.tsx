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

        <div className="grid lg:grid-cols-1 gap-16 items-center mb-20">
          {/* About Content */}
          <div ref={contentRef} className="space-y-6 text-center">
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
            
            <div className="glass-card p-8 mt-8 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-primary p-3 group-hover:rotate-180 transition-transform duration-500">
                  <Shield className="w-full h-full text-primary-foreground" />
                </div>
                <h4 className="text-2xl font-bold text-primary">Key Specializations</h4>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors group/item">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 group-hover/item:scale-150 transition-transform"></div>
                  <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">AI-powered website development and automation</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/5 transition-colors group/item">
                  <div className="w-2 h-2 rounded-full bg-secondary mt-2 group-hover/item:scale-150 transition-transform"></div>
                  <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">WordPress customization and optimization</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/5 transition-colors group/item">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 group-hover/item:scale-150 transition-transform"></div>
                  <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">Database design and management (SQL)</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors group/item">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 group-hover/item:scale-150 transition-transform"></div>
                  <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">Hosting solutions and technical support</span>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/5 transition-colors group/item col-span-full">
                  <div className="w-2 h-2 rounded-full bg-secondary mt-2 group-hover/item:scale-150 transition-transform"></div>
                  <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">Digital marketing and SEO strategies</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Grid - Enhanced Design */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4 text-glow">Technical Skills</h3>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            My technical expertise spans across modern web technologies and cutting-edge tools
          </p>
          <div 
            ref={skillsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
          >
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <AnimatedCard3D
                  key={skill.name}
                  className="cursor-pointer"
                  intensity={0.8}
                >
                  <div className="glass-card p-8 hover:scale-110 transition-all duration-500 group relative overflow-hidden">
                    {/* Background glow effect */}
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    
                    {/* Floating particles */}
                    <div className="absolute top-2 right-2 w-1 h-1 bg-primary/50 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-2 left-2 w-1 h-1 bg-secondary/50 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    
                    <div className="relative z-10">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-4 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                        <Icon className={`w-full h-full ${skill.color} group-hover:drop-shadow-glow transition-all transform-gpu`} />
                      </div>
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{skill.name}</p>
                      
                      {/* Skill level indicator */}
                      <div className="w-full h-1 bg-muted/20 rounded-full mt-3 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-primary rounded-full transition-all duration-700 group-hover:w-full"
                          style={{ width: `${85 + (index * 2)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </AnimatedCard3D>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="neon-button px-8 py-4 text-lg">
              Get Updates
            </Button>
            <ResumeDialog>
              <Button variant="outline" className="glass-card border-primary/30 text-foreground hover:bg-primary/10 px-8 py-4 text-lg cursor-pointer transform-gpu hover:scale-105 transition-all duration-300">
                View Resume
              </Button>
            </ResumeDialog>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;