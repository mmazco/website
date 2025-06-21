'use client';

import { useState, useEffect } from 'react';
import { Photo, PhotoLog } from '@/types';

// Seeded random number generator for consistent daily photos
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Get a shuffled array using a seed
function shuffleArray(array: Photo[], seed: number): Photo[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom(seed + i) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Format date as DDMMYYYY
function formatDateDDMMYYYY(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}${month}${year}`;
}

// Get photos for a 10-day cycle starting from a specific date
function getPhotosForCycle(photos: Photo[], cycleStartDate: Date): Photo[] {
  const seed = cycleStartDate.getTime() / 1000000;
  const shuffledPhotos = shuffleArray(photos, seed);
  return shuffledPhotos.slice(0, Math.min(10, shuffledPhotos.length));
}

export function usePhotoRotation(photos: Photo[]) {
  const [currentPhoto, setCurrentPhoto] = useState<Photo | null>(null);
  const [photoLog, setPhotoLog] = useState<PhotoLog>({});

  useEffect(() => {
    if (photos.length === 0) return;

    const today = new Date();
    const startDate = new Date('2025-06-21'); // Day 1 is June 21, 2025
    
    // Calculate days since start
    const daysSinceStart = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Calculate which 10-day cycle we're in (0-based)
    const cycleNumber = Math.floor(daysSinceStart / 10);
    
    // Calculate the day within the current cycle (0-9)
    const dayInCycle = daysSinceStart % 10;
    
    // Calculate the start date of the current cycle
    const currentCycleStart = new Date(startDate);
    currentCycleStart.setDate(currentCycleStart.getDate() + (cycleNumber * 10));
    
    // Get the photos for this cycle
    const cyclePhotos = getPhotosForCycle(photos, currentCycleStart);
    
    // Set today's photo
    if (dayInCycle >= 0 && dayInCycle < cyclePhotos.length) {
      setCurrentPhoto(cyclePhotos[dayInCycle]);
    } else if (cyclePhotos.length > 0) {
      setCurrentPhoto(cyclePhotos[0]);
    }

    // Create photo log entries for visible dates
    const newPhotoLog: PhotoLog = {};
    
    // Add entries for each day from the start of the cycle up to today
    for (let i = 0; i <= dayInCycle && i < 10; i++) {
      const logDate = new Date(currentCycleStart);
      logDate.setDate(logDate.getDate() + i);
      const dateString = formatDateDDMMYYYY(logDate);
      
      // Assign the photo for this day from the cycle
      if (i < cyclePhotos.length) {
        newPhotoLog[dateString] = {
          filename: cyclePhotos[i].filename,
          title: cyclePhotos[i].title,
          details: cyclePhotos[i].details
        };
      }
    }
    
    setPhotoLog(newPhotoLog);
  }, [photos]);

  const displayPhotoFromLog = (photo: { filename: string; title: string; details: string }) => {
    setCurrentPhoto({
      filename: photo.filename,
      title: photo.title,
      details: photo.details
    });
  };

  return {
    currentPhoto,
    photoLog,
    displayPhotoFromLog
  };
} 