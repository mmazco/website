'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function PlasticLabs() {
  return (
    <div className="plastic-labs-container">
      <header className="photography-header">
        <Link href="/" className="back-link">← Back</Link>
        <p className="photographer-name">Plastic Labs</p>
        <p className="social-handle">
          <a href="https://x.com/mmazco" target="_blank" rel="noopener noreferrer">
            @mmazco
          </a>
        </p>
        <p className="description">
          Personal scrapbook of 3D printing prototypes and experimenting with image generation models to create variations of my photography and creative work.
        </p>
      </header>
      
      <main className="plastic-labs-main">
        {/* Zaha Hadid x Issey Miyake */}
        <div className="plastic-labs-grid-2x2">
          <div className="plastic-labs-grid-item">
            <Image
              src="/assets/home-demos/zaha-issey-4.jpg"
              alt="zaha issey 4"
              width={600}
              height={450}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
          </div>
          <div className="plastic-labs-grid-item">
            <Image
              src="/assets/home-demos/zaha-issey-5.jpg"
              alt="zaha issey 5"
              width={600}
              height={450}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
          </div>
          <div className="plastic-labs-grid-item">
            <Image
              src="/assets/home-demos/zaha-issey-6.jpg"
              alt="zaha issey 6"
              width={600}
              height={450}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
          </div>
          <div className="plastic-labs-grid-item">
            <Image
              src="/assets/home-demos/zaha-issey-7.jpg"
              alt="zaha issey 7"
              width={600}
              height={450}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
          </div>
        </div>
        <p className="plastic-labs-caption" style={{ marginTop: '-50px', width: '75%', alignSelf: 'center' }}>zaha hadid x issey miyake concept</p>

        <div className="plastic-labs-grid-2x2" style={{ gridTemplateColumns: '1fr' }}>
          <Image
            src="/assets/home-demos/zaha-issey-3.3.JPG"
            alt="zaha issey"
            width={800}
            height={600}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
        </div>

        <div className="plastic-labs-grid-2x2" style={{ gridTemplateColumns: '1fr' }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="plastic-labs-video"
          >
            <source src="/assets/home-demos/zaha-issey-1.mp4" type="video/mp4" />
          </video>
        </div>

        {/* 3D Printing Prototypes */}
        <div className="plastic-labs-row">
          <div className="plastic-labs-row-item">
            <Image
              src="/assets/home-demos/liquid-3d-1.JPG"
              alt="prototype"
              width={400}
              height={300}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
            <p className="plastic-labs-caption">physical 3d printed prototype</p>
          </div>
          <div className="plastic-labs-row-item">
            <Image
              src="/assets/home-demos/liquid-3d-2.png"
              alt="prototype modification pink"
              width={400}
              height={300}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
            <p className="plastic-labs-caption">prototype modification<br />pink</p>
          </div>
          <div className="plastic-labs-row-item">
            <Image
              src="/assets/home-demos/liquid-3d-3.png"
              alt="prototype modification transparent"
              width={400}
              height={300}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
            <p className="plastic-labs-caption">prototype modification<br />transparent</p>
          </div>
        </div>

        <div className="plastic-labs-video-item" style={{ width: '35%', alignSelf: 'center', marginRight: 'auto', marginLeft: '12.5%' }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="plastic-labs-video"
          >
            <source src="/assets/home-demos/liquid-3d-vid.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="plastic-labs-row">
          <div className="plastic-labs-row-item">
            <Image
              src="/assets/home-demos/liquid-wave-3d-1.JPG"
              alt="physical 3d printed prototype"
              width={400}
              height={300}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
            <p className="plastic-labs-caption">physical 3d printed prototype</p>
          </div>
          <div className="plastic-labs-row-item">
            <Image
              src="/assets/home-demos/liquid-wave-3d-2.png"
              alt="prototype modification transparent"
              width={400}
              height={300}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
            <p className="plastic-labs-caption">prototype modification<br />transparent</p>
          </div>
          <div className="plastic-labs-row-item">
            <Image
              src="/assets/home-demos/liquid-wave-3d-3.png"
              alt="prototype modification shimmer"
              width={400}
              height={300}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
            <p className="plastic-labs-caption">prototype modification<br />shimmer</p>
          </div>
        </div>

        <div className="plastic-labs-video-item" style={{ width: '35%', alignSelf: 'center', marginLeft: 'auto', marginRight: '12.5%' }}>
          <Image
            src="/assets/home-demos/maz.JPG"
            alt="Maz"
            width={800}
            height={600}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
        </div>
      </main>
    </div>
  );
}
