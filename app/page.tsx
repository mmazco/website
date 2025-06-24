'use client';

import Image from 'next/image';
import { photoData } from '@/lib/photos';
import { usePhotoRotation } from '@/lib/usePhotoRotation';

export default function Home() {
  const { currentPhoto, photoLog, displayPhotoFromLog } = usePhotoRotation(photoData.photos);

  // Sort dates in chronological order
  const sortedDates = Object.keys(photoLog).sort();

  return (
    <div className="container">
      <header className="header">
        <p className="photographer-name">© Maryam Mazraei</p>
        <p className="social-handle">
          <a href="https://x.com/mmazco" target="_blank" rel="noopener noreferrer">
            @mmazco
          </a>
        </p>
        <p className="description">
          From photography archives.<br />
          A photo a day. Photos are on<br />
          a randomised rotating basis.<br />
          Date log tracker resets every 10 days.<br />
          Start date 20062025.
        </p>
        <div className="photo-log">
          {sortedDates.map(dateString => {
            const entry = photoLog[dateString];
            return (
              <div key={dateString} className="photo-log-entry">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    displayPhotoFromLog(entry);
                  }}
                >
                  {dateString}
                </a>
              </div>
            );
          })}
        </div>

        {/* Temporary debug section for Tochal image testing */}
        <div style={{ 
          position: 'fixed', 
          top: '10px', 
          right: '10px', 
          background: 'rgba(0,0,0,0.8)', 
          color: 'white', 
          padding: '10px',
          fontSize: '12px',
          maxWidth: '300px',
          zIndex: 1000
        }}>
          <div>Debug: Tochal Image Test</div>
          <img 
            src="/images/Tochal Ski Resort 2, Tehran, Iran Dec 2016.jpg"
            alt="Tochal Test"
            style={{ width: '100px', height: 'auto', marginTop: '5px' }}
            onLoad={() => console.log('DEBUG: Tochal image loaded successfully')}
            onError={(e) => console.log('DEBUG: Tochal image failed to load:', e)}
          />
          <div style={{ marginTop: '5px', wordBreak: 'break-all' }}>
            Path: /images/Tochal Ski Resort 2, Tehran, Iran Dec 2016.jpg
          </div>
        </div>
      </header>
      
      <main className="main">
        {currentPhoto && (
          <>
            <div className="photo-container">
              <Image
                src={currentPhoto.filename}
                alt={currentPhoto.title}
                width={800}
                height={600}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
                priority
              />
            </div>
            
            <div className="photo-info">
              <p className="photo-title">{currentPhoto.title}</p>
              <p className="photo-details">{currentPhoto.details}</p>
            </div>
          </>
        )}
      </main>
      
      <div className="social-media">
        <a href="https://x.com/mmazco" target="_blank" rel="noopener noreferrer">
          @mmazco
        </a>
      </div>
    </div>
  );
} 