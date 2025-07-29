import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const CursorFollower = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isMoving, setIsMoving] = useState(false);
  const moveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Set moving state
      setIsMoving(true);
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
      }
      moveTimeoutRef.current = setTimeout(() => {
        setIsMoving(false);
      }, 150);

      // Main cursor follows immediately
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.05,
        ease: 'none'
      });

      // Follower with delay for spider effect
      gsap.to(follower, {
        x: mouseX,
        y: mouseY,
        duration: 0.15,
        ease: 'power2.out'
      });

      // Trail effect
      trailRefs.current.forEach((trail, index) => {
        if (trail) {
          gsap.to(trail, {
            x: mouseX,
            y: mouseY,
            duration: 0.3 + (index * 0.1),
            ease: 'power2.out'
          });
        }
      });
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      
      if (target.matches('button, a, .cursor-pointer')) {
        setIsHovering(true);
        
        gsap.to(cursor, {
          scale: 1.5,
          duration: 0.2
        });
        
        gsap.to(follower, {
          scale: 2.5,
          duration: 0.2
        });
      } else if (target.matches('.glass-card')) {
        setIsHovering(true);
        
        gsap.to(follower, {
          scale: 2,
          duration: 0.2
        });
      } else if (target.matches('input, textarea')) {
        setIsHovering(true);
        
        gsap.to(follower, {
          scale: 1.8,
          duration: 0.2
        });
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      
      gsap.to([cursor, follower], {
        scale: 1,
        duration: 0.2
      });
    };

    // Mouse move animation
    const animateMovement = () => {
      if (cursor && follower) {
        // Add slight rotation based on movement speed
        gsap.to(cursor, {
          rotation: mouseX * 0.01,
          duration: 0.5
        });
      }
    };

    // Add event listeners
    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    
    // Animate cursor movement
    const interval = setInterval(animateMovement, 100);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      clearInterval(interval);
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Trail effect - spider legs */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailRefs.current[i] = el;
          }}
          className="fixed top-0 left-0 pointer-events-none z-30"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <div 
            className={`w-2 h-2 bg-primary/30 rounded-full blur-sm`}
            style={{ 
              opacity: 0.8 - (i * 0.1),
              animationDelay: `${i * 100}ms`
            }}
          />
        </div>
      ))}

      {/* Main cursor with dynamic neon glow */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-50"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div 
          className={`w-full h-full rounded-full transition-all duration-200 ${
            isHovering ? 'scale-150' : 'scale-100'
          }`}
          style={{
            background: isHovering 
              ? 'radial-gradient(circle, hsl(var(--primary)) 0%, hsl(var(--primary)/0.8) 50%, hsl(var(--primary)/0.3) 100%)'
              : 'hsl(var(--primary))',
            boxShadow: isMoving 
              ? '0 0 30px hsl(var(--primary)/0.9), 0 0 60px hsl(var(--primary)/0.7), 0 0 90px hsl(var(--primary)/0.5)'
              : isHovering 
                ? '0 0 20px hsl(var(--primary)/0.8), 0 0 40px hsl(var(--primary)/0.6), 0 0 60px hsl(var(--primary)/0.4)'
                : '0 0 10px hsl(var(--primary)/0.5)',
          }}
        />
      </div>

      {/* Follower with enhanced 3D popup text */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 pointer-events-none z-40 transition-all duration-300 ${
          isHovering ? 'opacity-100 scale-110' : 'opacity-70 scale-100'
        }`}
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="relative">
          {/* Enhanced web effect with 3D appearance */}
          <div className={`w-12 h-12 border-2 border-primary/30 rounded-full backdrop-blur-sm transition-all duration-300 ${
            isHovering ? 'animate-pulse scale-125 border-primary/60' : 'animate-pulse'
          }`}>
            <div className="absolute inset-0 border border-primary/20 rounded-full scale-150" />
            <div className="absolute inset-0 border border-primary/10 rounded-full scale-200" />
            {isHovering && (
              <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CursorFollower;