import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface AnimatedCard3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

const AnimatedCard3D = ({ children, className = '', intensity = 1 }: AnimatedCard3DProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -15 * intensity;
      const rotateY = ((x - centerX) / centerX) * 15 * intensity;

      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: 'power2.out'
      });

      // Add subtle glow effect
      const glowIntensity = Math.min(Math.abs(rotateX) + Math.abs(rotateY), 30) / 30;
      gsap.to(card, {
        boxShadow: `var(--glow-primary), 0 0 ${20 + glowIntensity * 20}px hsl(var(--primary) / ${0.1 + glowIntensity * 0.2})`,
        duration: 0.3
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        boxShadow: 'var(--glass-shadow)',
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    const handleMouseEnter = () => {
      gsap.to(card, {
        z: 50,
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [intensity]);

  return (
    <div
      ref={cardRef}
      className={`transform-gpu ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
};

export default AnimatedCard3D;