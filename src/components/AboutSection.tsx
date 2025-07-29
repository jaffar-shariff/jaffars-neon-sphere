import { useEffect, useRef } from 'react';
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
import profileImg from '@/assets/profile.jpg';

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
          {/* Profile Image */}
          <div ref={imageRef} className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-20 blur-xl scale-110" />
              <img
                src={profileImg}
                alt="Jaffar Shariff"
                className="relative w-80 h-80 rounded-full object-cover profile-glow transition-transform duration-500 hover:scale-105 hover:rotate-3"
              />
              {/* Floating icons around profile */}
              <div className="absolute -top-4 -right-4 floating-orb w-8 h-8 bg-primary/30 rounded-full flex items-center justify-center">
                <Code className="w-4 h-4 text-primary" />
              </div>
              <div className="absolute -bottom-4 -left-4 floating-orb w-8 h-8 bg-secondary/30 rounded-full flex items-center justify-center" style={{ animationDelay: '2s' }}>
                <Bot className="w-4 h-4 text-secondary" />
              </div>
            </div>
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
                <div 
                  key={skill.name}
                  className="glass-card p-6 hover:scale-105 transition-transform duration-300 group cursor-pointer"
                >
                  <Icon className={`w-8 h-8 mx-auto mb-3 ${skill.color} group-hover:scale-110 transition-transform`} />
                  <p className="text-sm font-medium text-foreground">{skill.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;