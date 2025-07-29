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
import pythonIcon from '@/assets/python-icon.png';
import reactIcon from '@/assets/react-icon.png';
import sqlIcon from '@/assets/sql-icon.png';
import webTechIcon from '@/assets/web-tech-icon.png';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { 
    name: 'HTML/CSS/JS', 
    icon: Code, 
    color: 'text-orange-400',
    gradient: 'from-orange-400/20 to-yellow-400/20',
    customImage: webTechIcon
  },
  { 
    name: 'React', 
    icon: Smartphone, 
    color: 'text-blue-400',
    gradient: 'from-blue-400/20 to-cyan-400/20',
    customImage: reactIcon
  },
  { 
    name: 'Python', 
    icon: Bot, 
    color: 'text-green-400',
    gradient: 'from-green-400/20 to-blue-500/20',
    customImage: pythonIcon
  },
  { 
    name: 'SQL', 
    icon: Database, 
    color: 'text-purple-400',
    gradient: 'from-purple-400/20 to-pink-400/20',
    customImage: sqlIcon
  },
  { 
    name: 'WordPress', 
    icon: Globe, 
    color: 'text-blue-500',
    gradient: 'from-blue-500/20 to-indigo-400/20'
  },
  { 
    name: 'AI Chatbots', 
    icon: Bot, 
    color: 'text-emerald-400',
    gradient: 'from-emerald-400/20 to-teal-400/20'
  },
  { 
    name: 'Hosting', 
    icon: Server, 
    color: 'text-red-400',
    gradient: 'from-red-400/20 to-orange-400/20'
  },
  { 
    name: 'SEO/Marketing', 
    icon: TrendingUp, 
    color: 'text-pink-400',
    gradient: 'from-pink-400/20 to-rose-400/20'
  }
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
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-primary p-3 group-hover:rotate-180 transition-transform duration-500">
                  <Shield className="w-full h-full text-primary-foreground" />
                </div>
                <h4 className="text-2xl font-bold text-primary">Key Specializations</h4>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative p-4 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 hover:border-primary/40 transition-all group/item">
                  <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 rounded-full bg-gradient-primary mt-1.5 group-hover/item:scale-125 transition-transform"></div>
                    <div>
                      <h5 className="font-semibold text-foreground mb-1">AI-Powered Development</h5>
                      <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors">Website development and automation solutions</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative p-4 rounded-xl bg-gradient-to-br from-secondary/5 to-accent/5 border border-secondary/20 hover:border-secondary/40 transition-all group/item">
                  <div className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-secondary to-accent mt-1.5 group-hover/item:scale-125 transition-transform"></div>
                    <div>
                      <h5 className="font-semibold text-foreground mb-1">WordPress Mastery</h5>
                      <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors">Customization and optimization expertise</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative p-4 rounded-xl bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/20 hover:border-accent/40 transition-all group/item">
                  <div className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-accent to-primary mt-1.5 group-hover/item:scale-125 transition-transform"></div>
                    <div>
                      <h5 className="font-semibold text-foreground mb-1">Database Architecture</h5>
                      <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors">SQL design and management systems</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative p-4 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 hover:border-primary/40 transition-all group/item">
                  <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent mt-1.5 group-hover/item:scale-125 transition-transform"></div>
                    <div>
                      <h5 className="font-semibold text-foreground mb-1">Cloud Solutions</h5>
                      <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors">Hosting and technical support services</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative p-4 rounded-xl bg-gradient-to-br from-secondary/5 to-primary/5 border border-secondary/20 hover:border-secondary/40 transition-all group/item col-span-full">
                  <div className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-secondary to-primary mt-1.5 group-hover/item:scale-125 transition-transform"></div>
                    <div>
                      <h5 className="font-semibold text-foreground mb-1">Digital Marketing & SEO</h5>
                      <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors">Strategic optimization and growth solutions</span>
                    </div>
                  </div>
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
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${skill.gradient} p-3 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 relative overflow-hidden`}>
                      {/* Technology-specific background patterns */}
                      {skill.name === 'Python' && (
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute top-1 left-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          <div className="absolute bottom-1 left-1/2 w-1 h-1 bg-green-400 rounded-full"></div>
                        </div>
                      )}
                      {skill.name === 'React' && (
                        <div className="absolute inset-0 opacity-30">
                          <div className="absolute inset-2 border border-blue-400/30 rounded-full"></div>
                          <div className="absolute inset-3 border border-cyan-400/30 rounded-full"></div>
                        </div>
                      )}
                      {skill.name === 'SQL' && (
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute top-2 left-2 right-2 h-0.5 bg-purple-400/50"></div>
                          <div className="absolute bottom-2 left-2 right-2 h-0.5 bg-purple-400/50"></div>
                          <div className="absolute top-1/2 left-2 right-2 h-0.5 bg-pink-400/50"></div>
                        </div>
                      )}
                      
                      {/* Custom images for specific technologies */}
                      {skill.customImage ? (
                        <img 
                          src={skill.customImage} 
                          alt={skill.name}
                          className="w-full h-full object-contain group-hover:drop-shadow-glow transition-all transform-gpu relative z-10"
                        />
                      ) : (
                        <Icon className={`w-full h-full ${skill.color} group-hover:drop-shadow-glow transition-all transform-gpu relative z-10`} />
                      )}
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
          <ResumeDialog>
            <Button variant="outline" className="glass-card border-primary/30 text-foreground hover:bg-primary/10 px-8 py-4 text-lg cursor-pointer transform-gpu hover:scale-105 transition-all duration-300">
              View Resume
            </Button>
          </ResumeDialog>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;