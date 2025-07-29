import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section animation
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

      // Form animation
      gsap.fromTo(formRef.current?.children || [],
        {
          x: -50,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 90%'
          }
        }
      );

      // Socials animation
      gsap.fromTo(socialsRef.current?.children || [],
        {
          y: 30,
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
            trigger: socialsRef.current,
            start: 'top 90%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    
    // Add success animation
    gsap.to(formRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out'
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section 
      id="contact"
      ref={sectionRef}
      className="min-h-screen py-20 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow">
            Let's{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your next project to life? I'd love to hear about your ideas and discuss how we can work together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-6 text-foreground">Send a Message</h3>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="glass-card border-primary/30 focus:border-primary focus:ring-primary/20 bg-background/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="glass-card border-primary/30 focus:border-primary focus:ring-primary/20 bg-background/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="glass-card border-primary/30 focus:border-primary focus:ring-primary/20 bg-background/50 resize-none"
                  required
                />
              </div>

              <Button 
                type="submit"
                className="neon-button w-full py-3 text-lg"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-8">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Get In Touch</h3>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  I'm always excited to discuss new opportunities, whether it's freelance work, 
                  consulting projects, or full-time positions in web development and tech support.
                </p>
                <div className="flex items-center gap-3 text-primary">
                  <Mail className="w-5 h-5" />
                  <span className="text-foreground">jaffarshariff0017@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-xl font-bold mb-6 text-foreground">Connect on Social</h3>
              <div ref={socialsRef} className="flex gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="glass-card border-primary/30 hover:bg-primary/10 hover:scale-110 transition-all duration-300"
                  onClick={() => window.open('https://github.com/jaffarshariff', '_blank')}
                >
                  <Github className="w-6 h-6" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="glass-card border-primary/30 hover:bg-primary/10 hover:scale-110 transition-all duration-300"
                  onClick={() => window.open('https://linkedin.com/in/jaffarshariff', '_blank')}
                >
                  <Linkedin className="w-6 h-6" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="glass-card border-primary/30 hover:bg-primary/10 hover:scale-110 transition-all duration-300"
                  onClick={() => window.open('mailto:jaffarshariff0017@gmail.com', '_blank')}
                >
                  <Mail className="w-6 h-6" />
                </Button>
              </div>
            </div>

            <div className="glass-card p-8">
              <h4 className="text-lg font-semibold mb-4 text-primary">Looking for:</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Freelance web development projects</li>
                <li>• AI and automation consulting</li>
                <li>• WordPress customization work</li>
                <li>• Technical support roles</li>
                <li>• Digital marketing partnerships</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;