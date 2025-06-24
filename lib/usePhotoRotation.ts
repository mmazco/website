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
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();
  return `${day}${month}${year}`;
}

// Get photos for a 10-day cycle starting from a specific date
function getPhotosForCycle(photos: Photo[], cycleStartDate: Date, isFirstCycle: boolean): Photo[] {
  if (isFirstCycle) {
    // Hardcode the established sequence for the first cycle
    const antiqueShop = photos.find(p => p.title === "Antique Shop, Tehran, Iran March 2015");
    const downtown = photos.find(p => p.title === "Downtown Tehran, Iran Jan 2017");
    const dizi = photos.find(p => p.title === "Dizi restaurant, Tehran, Iran March 2015");
    
    // For day 3 (23062025), assign Tajrish which we know works
    const tajrish = photos.find(p => p.title === "Tajrish, Tehran, Iran Jan 2017");
    
    // For day 4 (24062025), assign another known working photo
    const saboosMarch = photos.find(p => p.title === "Saboos Cafe Bakery, Tehran, Iran March 2015");
    
    // Get other photos excluding only the established ones (Tochal images now included)
    const otherPhotos = photos.filter(p => 
      p.title !== "Antique Shop, Tehran, Iran March 2015" && 
      p.title !== "Downtown Tehran, Iran Jan 2017" && 
      p.title !== "Dizi restaurant, Tehran, Iran March 2015" &&
      p.title !== "Tajrish, Tehran, Iran Jan 2017" &&
      p.title !== "Saboos Cafe Bakery, Tehran, Iran March 2015"
    );
    
    const establishedPhotos = [
      // Day 0 (20062025): Antique Shop
      antiqueShop,
      // Day 1 (21062025): Downtown Tehran
      downtown,
      // Day 2 (22062025): Dizi restaurant
      dizi,
      // Day 3 (23062025): Tajrish (known working image)
      tajrish,
      // Day 4 (24062025): Saboos March (known working image)
      saboosMarch,
      // Fill remaining days with other photos (including Tochal images)
      ...otherPhotos
    ].filter(Boolean) as Photo[];
    
    return establishedPhotos.slice(0, 10);
  } else {
    // Use normal seeded random for subsequent cycles
    const seed = cycleStartDate.getTime() / 1000000;
    const shuffledPhotos = shuffleArray(photos, seed);
    return shuffledPhotos.slice(0, Math.min(10, shuffledPhotos.length));
  }
}

export function usePhotoRotation(photos: Photo[]) {
  const [currentPhoto, setCurrentPhoto] = useState<Photo | null>(null);
  const [photoLog, setPhotoLog] = useState<PhotoLog>({});

  useEffect(() => {
    if (photos.length === 0) return;

    // Use UTC dates to ensure consistency worldwide
    const today = new Date();
    const todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
    const absoluteStartDate = new Date(Date.UTC(2025, 5, 20)); // June 20, 2025 as absolute start
    
    // Calculate total days since the absolute start
    const totalDaysSinceStart = Math.floor((todayUTC.getTime() - absoluteStartDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Calculate which 10-day cycle we're in (0-based)
    const cycleNumber = Math.floor(totalDaysSinceStart / 10);
    
    // Calculate the day within the current cycle (0-9)
    const dayInCycle = totalDaysSinceStart % 10;
    
    // Calculate the start date of the current cycle
    const currentCycleStart = new Date(absoluteStartDate);
    currentCycleStart.setUTCDate(currentCycleStart.getUTCDate() + (cycleNumber * 10));
    
    // Check if this is the first cycle (cycle 0)
    const isFirstCycle = cycleNumber === 0;
    
    // Get the photos for this cycle
    const cyclePhotos = getPhotosForCycle(photos, currentCycleStart, isFirstCycle);
    
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
      logDate.setUTCDate(logDate.getUTCDate() + i);
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