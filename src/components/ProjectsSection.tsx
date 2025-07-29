import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Code, Bot, Database, Globe, TrendingUp, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'AI-Powered Portfolio Website',
    description: 'Modern, responsive portfolio built with React and AI integration. Features dynamic content generation and interactive elements.',
    tech: ['React', 'TypeScript', 'AI', 'GSAP'],
    icon: Code,
    gradient: 'from-primary to-primary-glow',
    demoUrl: 'https://jaffar.website',
    githubUrl: '#'
  },
  {
    title: 'Live Chatbot Automation',
    description: 'Intelligent chatbot system built with Python and AI for automated customer support and lead generation.',
    tech: ['Python', 'AI', 'NLP', 'API'],
    icon: Bot,
    gradient: 'from-secondary to-secondary-glow',
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    title: 'Live Chat Support System',
    description: 'Real-time assistance platform for hosting and website troubleshooting. Provides instant technical support and issue resolution.',
    tech: ['Live Chat', 'Support', 'Hosting', 'Troubleshooting'],
    icon: Bot,
    gradient: 'from-accent to-accent-glow',
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    title: 'Advanced WordPress Setup',
    description: 'Custom WordPress solutions with advanced functionality, performance optimization, and security features.',
    tech: ['WordPress', 'PHP', 'MySQL', 'SEO'],
    icon: Globe,
    gradient: 'from-primary to-secondary',
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    title: 'Google Workspace Integration',
    description: 'Seamless integration tools for Google Workspace, automating workflows and enhancing productivity.',
    tech: ['Google API', 'JavaScript', 'Automation', 'Cloud'],
    icon: Server,
    gradient: 'from-secondary to-accent',
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    title: 'Digital Marketing Dashboard',
    description: 'Comprehensive SEO and marketing analytics dashboard with real-time data visualization and reporting.',
    tech: ['Analytics', 'SEO', 'Dashboard', 'API'],
    icon: TrendingUp,
    gradient: 'from-accent to-primary',
    demoUrl: '#',
    githubUrl: '#'
  }
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section fade in
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
            start: 'top 80%'
          }
        }
      );

      // Cards stagger animation
      gsap.fromTo(cardsRef.current?.children || [],
        {
          y: 100,
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 90%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="projects"
      ref={sectionRef}
      className="min-h-screen py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow">
            Featured{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcasing innovative solutions that blend cutting-edge technology with practical applications
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <div 
                key={project.title}
                className="glass-card p-6 hover:scale-105 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
                
                {/* Icon */}
                <div className="relative mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} p-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative space-y-4">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 text-xs rounded-full bg-muted/20 text-muted-foreground border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button 
                      size="sm"
                      className="neon-button flex-1 text-xs"
                      onClick={() => window.open(project.demoUrl, '_blank')}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Demo
                    </Button>
                    <Button 
                      size="sm"
                      variant="outline"
                      className="glass-card border-primary/30 text-foreground hover:bg-primary/10"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                {/* Hover effect orb */}
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-primary opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500" />
              </div>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Interested in working together? Let's create something amazing!
          </p>
          <Button className="neon-button px-8 py-4 text-lg">
            Get In Touch
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;