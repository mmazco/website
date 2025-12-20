'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface BouncingCharacterProps {
  src: string;
  size?: number;
  speed?: number;
}

export default function BouncingCharacter({ 
  src, 
  size = 120,
  speed = 2 
}: BouncingCharacterProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: speed, y: speed });
  const [isClient, setIsClient] = useState(false);
  const requestRef = useRef<number>();

  useEffect(() => {
    setIsClient(true);
    // Random starting position
    setPosition({
      x: Math.random() * (window.innerWidth - size),
      y: Math.random() * (window.innerHeight - size)
    });
    // Random starting direction
    setVelocity({
      x: (Math.random() > 0.5 ? 1 : -1) * speed,
      y: (Math.random() > 0.5 ? 1 : -1) * speed
    });
  }, [size, speed]);

  useEffect(() => {
    if (!isClient) return;

    const animate = () => {
      setPosition(prev => {
        let newX = prev.x + velocity.x;
        let newY = prev.y + velocity.y;
        let newVelX = velocity.x;
        let newVelY = velocity.y;

        // Bounce off edges
        if (newX <= 0 || newX >= window.innerWidth - size) {
          newVelX = -velocity.x;
          newX = Math.max(0, Math.min(newX, window.innerWidth - size));
        }
        if (newY <= 0 || newY >= window.innerHeight - size) {
          newVelY = -velocity.y;
          newY = Math.max(0, Math.min(newY, window.innerHeight - size));
        }

        if (newVelX !== velocity.x || newVelY !== velocity.y) {
          setVelocity({ x: newVelX, y: newVelY });
        }

        return { x: newX, y: newY };
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isClient, velocity, size]);

  if (!isClient) return null;

  return (
    <div
      className="bouncing-character"
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: size,
        height: size,
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.8,
      }}
    >
      <Image
        src={src}
        alt="Bouncing character"
        width={size}
        height={size}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
    </div>
  );
}

