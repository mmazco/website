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
        <p className="description">
          From my personal photography archives.<br />
          A photo a day. Photos are on<br />
          a randomised rotating basis.<br />
          Date log tracker resets every 10 days.
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
    </div>
  );
} 