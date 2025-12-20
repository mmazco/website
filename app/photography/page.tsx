'use client';

import Image from 'next/image';
import Link from 'next/link';
import { photoData } from '@/lib/photos';
import { usePhotoRotation } from '@/lib/usePhotoRotation';

export default function Photography() {
  const { currentPhoto, photoLog, displayPhotoFromLog } = usePhotoRotation(photoData.photos);

  // Sort dates in chronological order by parsing DDMMYYYY format
  const sortedDates = Object.keys(photoLog).sort((a, b) => {
    // Parse DDMMYYYY format
    const parseDate = (dateStr: string) => {
      const day = parseInt(dateStr.substring(0, 2));
      const month = parseInt(dateStr.substring(2, 4)) - 1; // Month is 0-indexed
      const year = parseInt(dateStr.substring(4, 8));
      return new Date(year, month, day);
    };
    
    return parseDate(a).getTime() - parseDate(b).getTime();
  });

  return (
    <div className="photography-container">
      <header className="photography-header">
        <Link href="/" className="back-link">← Back</Link>
        <p className="photographer-name">© Maryam Mazraei</p>
        <p className="social-handle">
          <a href="https://x.com/mmazco" target="_blank" rel="noopener noreferrer">
            @mmazco
          </a>
        </p>
        <p className="social-handle">
          <a href="https://mmazphotography.tumblr.com/" target="_blank" rel="noopener noreferrer">
            Full collection
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
      </header>
      
      <main className="photography-main">
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

