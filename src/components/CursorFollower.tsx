import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const CursorFollower = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });

      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      
      if (target.matches('button, a, .cursor-pointer')) {
        setIsHovering(true);
        setCursorText('Click');
        
        gsap.to(cursor, {
          scale: 0.5,
          duration: 0.2
        });
        
        gsap.to(follower, {
          scale: 2,
          duration: 0.2
        });
      } else if (target.matches('.glass-card')) {
        setIsHovering(true);
        setCursorText('View');
        
        gsap.to(follower, {
          scale: 1.5,
          duration: 0.2
        });
      } else if (target.matches('input, textarea')) {
        setIsHovering(true);
        setCursorText('Type');
        
        gsap.to(follower, {
          scale: 1.2,
          duration: 0.2
        });
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorText('');
      
      gsap.to([cursor, follower], {
        scale: 1,
        duration: 0.2
      });
    };

    // Add event listeners
    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-50 mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="w-full h-full bg-primary rounded-full shadow-glow-primary" />
      </div>

      {/* Follower with text */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 pointer-events-none z-40 transition-opacity duration-200 ${
          isHovering ? 'opacity-100' : 'opacity-50'
        }`}
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="relative">
          <div className="w-8 h-8 border-2 border-primary/50 rounded-full backdrop-blur-sm" />
          {cursorText && (
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <div className="glass-card px-3 py-1 text-xs text-primary font-medium animate-fade-blur-in">
                {cursorText}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CursorFollower;