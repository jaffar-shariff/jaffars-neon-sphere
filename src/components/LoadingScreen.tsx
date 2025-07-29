import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate logo entrance
    tl.fromTo(logoRef.current, 
      { 
        opacity: 0, 
        scale: 0.5,
        filter: 'blur(20px)'
      },
      { 
        opacity: 1, 
        scale: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'back.out(1.7)'
      }
    );

    // Animate progress bar
    tl.to(progressRef.current, {
      width: '100%',
      duration: 2,
      ease: 'power2.out',
      onComplete: () => {
        // Exit animation
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: 'power2.in',
          onComplete: onComplete
        });
      }
    }, '-=0.5');

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      {/* Background orbs */}
      <div className="absolute inset-0">
        <div className="floating-orb w-64 h-64 top-1/4 left-1/4 bg-gradient-primary opacity-30" />
        <div className="floating-orb w-48 h-48 top-3/4 right-1/4 bg-gradient-glow opacity-20" style={{ animationDelay: '2s' }} />
        <div className="floating-orb w-32 h-32 top-1/2 left-3/4 bg-secondary opacity-25" style={{ animationDelay: '4s' }} />
      </div>

      <div className="text-center z-10">
        {/* Animated logo/name */}
        <div ref={logoRef} className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-glow bg-gradient-primary bg-clip-text text-transparent">
            JAFFAR
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mt-2 font-light tracking-wider">
            WEB & TECH SPECIALIST
          </p>
        </div>

        {/* Progress bar container */}
        <div className="w-80 mx-auto">
          <div className="glass-card p-1 mb-4">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                ref={progressRef}
                className="h-full w-0 bg-gradient-primary rounded-full shadow-glow-primary"
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Loading Portfolio...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;