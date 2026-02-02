'use client';

import { useState, useEffect } from 'react';
import BouncingCharacter from '../components/BouncingCharacter';

export default function Playground() {
  const [showHint, setShowHint] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Show hint after 10 seconds
    const timer = setTimeout(() => {
      setShowHint(true);
    }, 10000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className="playground-container">
      {/* All unique bouncing characters - same size, different speeds (hidden on mobile) */}
      {!isMobile && (
        <>
      <BouncingCharacter 
        src="/assets/ui/3d-kernel-characters copy 3.png" 
        size={140} 
        speed={1.5} 
      />
      <BouncingCharacter 
        src="/assets/ui/3d-kernel-characters copy 4.png" 
        size={140} 
        speed={2} 
      />
      <BouncingCharacter 
        src="/assets/ui/3d-kernel-characters copy 5.png" 
        size={140} 
        speed={1.8} 
      />
      <BouncingCharacter 
        src="/assets/ui/3d-kernel-characters copy 6.png" 
        size={140} 
        speed={2.2} 
      />
        </>
      )}

      {/* Center text */}
      <div className="center-text">
        <p>
          These images visualize a method called "Partial Functional Correspondence," a mathematical technique used to map the surface of one 3D character onto another, even if the target character is in a different pose or missing body parts. The rainbow "heatmaps" represent spectral descriptors—complex mathematical functions derived from the geometry itself—rather than simple textures. By aligning these color patterns across the two shapes, the algorithm proves it has successfully solved the correspondence problem, effectively telling the computer that a "red" shoulder on the original mesh is the exact same anatomical part as the "red" shoulder on the distorted or partial mesh, all without needing to know what a "shoulder" actually is.
        </p>
        <p>
          Historically, this work represents the peak of "classical" geometry algorithms, marking the final era of state-of-the-art computer vision before the industry paradigm shifted. Published around 2015, this method relies on elegant, hand-crafted mathematics (specifically spectral geometry and perturbation analysis) to solve problems "from first principles" rather than learning from examples. It stands in stark contrast to the modern "Deep Learning" era that followed shortly after, where researchers switched to throwing massive amounts of data at Neural Networks to solve the same problems. In this sense, these images are a snapshot of the moment just before AI took over, showing the incredible capabilities of pure mathematical modeling.
        </p>
      </div>

      {/* Secret hint that appears after a while */}
      {showHint && (
        <div className="playground-hint">
          you found the playground ✨
        </div>
      )}

      <style jsx>{`
        .playground-container {
          min-height: 100vh;
          background: #ffffff;
          position: relative;
          overflow: hidden;
          cursor: crosshair;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .center-text {
          max-width: 640px;
          padding: 40px;
          text-align: center;
          z-index: 5;
          pointer-events: none;
        }

        .center-text p {
          font-size: 14px;
          line-height: 1.8;
          color: #666;
          margin-bottom: 20px;
        }

        .center-text p:last-child {
          margin-bottom: 0;
        }

        .playground-hint {
          position: fixed;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 14px;
          color: #ccc;
          font-style: italic;
          animation: fadeIn 2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
