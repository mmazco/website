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
function getPhotosForCycle(photos: Photo[], cycleStartDate: Date, cycleNumber: number): Photo[] {
  if (cycleNumber === 0) {
    // Hardcode the established sequence for the first cycle
    const antiqueShop = photos.find(p => p.title === "Antique Shop, Tehran, Iran March 2015");
    const downtown = photos.find(p => p.title === "Downtown Tehran, Iran Jan 2017");
    const dizi = photos.find(p => p.title === "Dizi restaurant, Tehran, Iran March 2015");
    const tajrish = photos.find(p => p.title === "Tajrish, Tehran, Iran Jan 2017");
    const saboosMarch = photos.find(p => p.title === "Saboos Cafe Bakery, Tehran, Iran March 2015");
    
    // Get other photos excluding the established ones
    const otherPhotos = photos.filter(p => 
      p.title !== "Antique Shop, Tehran, Iran March 2015" && 
      p.title !== "Downtown Tehran, Iran Jan 2017" && 
      p.title !== "Dizi restaurant, Tehran, Iran March 2015" &&
      p.title !== "Tajrish, Tehran, Iran Jan 2017" &&
      p.title !== "Saboos Cafe Bakery, Tehran, Iran March 2015"
    );
    
    const establishedPhotos = [
      antiqueShop, downtown, dizi, tajrish, saboosMarch,
      ...otherPhotos
    ].filter(Boolean) as Photo[];
    
    return establishedPhotos.slice(0, 10);
  } else if (cycleNumber === 1) {
    // Comprehensive list of ALL 10 photos used in cycle 0 (to exclude completely)
    const cycle0UsedPhotos = [
      "Antique Shop, Tehran, Iran March 2015",
      "Dizi restaurant, Tehran, Iran March 2015", 
      "Tajrish, Tehran, Iran Jan 2017",
      "Saboos Cafe Bakery, Tehran, Iran March 2015",
      "Downtown Tehran (1), Iran Jan 2017",
      "Tochal Ski Resort, Tehran, Iran Dec 2016", // First Tochal
      "Untitled March 2015"
    ];
    
    // Get ONLY photos that were NOT used in cycle 0
    const availableForCycle1 = photos.filter(p => {
      // Exclude exact title matches
      if (cycle0UsedPhotos.includes(p.title)) return false;
      
      // Special cases for partial matches
      if (p.title === "Tehran, Iran Jan 2017" && p.details === "Canon T50, Lomography Colour Negative film, ISO 400") return false; // Position 8 in cycle 0
      if (p.title === "Tehran, Iran Jan 2017" && p.details === "Canon T50, Lomography Colour Negative film, ISO 400 35mm") return false; // Position 9 in cycle 0
      if (p.title.includes("Tochal Ski Resort") && p.details === "Taken on iPhone") return false; // Both Tochals used
      
      return true;
    });
    
    // Select photos from the truly unused ones only
    const downtownTehran1 = photos.find(p => p.title === "Downtown Tehran (1), Iran Jan 2017"); // Keep for 30062025
    const niavaranTehran = photos.find(p => p.title === "Niavaran, Tehran, Iran May 2017"); // New for 01072025
    const meydoonAzadi = availableForCycle1.find(p => p.title === "Meydoon Azadi, Freedom Square, Tehran, Iran April 2015"); // Keep for 02072025
    const parisDec2017 = photos.find(p => p.title === "Paris Dec 2017"); // New for 03072025
    
    const establishedPhotos = [
      downtownTehran1, niavaranTehran, meydoonAzadi, parisDec2017,
      ...availableForCycle1.filter(p => 
        p.title !== "Downtown Tehran (2), Iran Jan 2017" &&
        p.title !== "Meydoon Azadi, Freedom Square, Tehran, Iran April 2015" &&
        p.title !== "Niavaran, Tehran, Iran May 2017" &&
        p.title !== "Paris Dec 2017"
      )
    ].filter(Boolean) as Photo[];
    
    return establishedPhotos.slice(0, 10);
  } else {
    // For subsequent cycles, exclude photos used in previous cycles
    // Calculate how many photos have been used in all previous cycles
    const photosUsedInPreviousCycles = Math.min(cycleNumber * 10, photos.length);
    
    // Create a deterministic but different ordering for each cycle
    const seed = cycleNumber * 1000 + cycleStartDate.getTime() / 1000000;
    const shuffledPhotos = shuffleArray(photos, seed);
    
    // Take photos starting from where the previous cycle left off
    const availablePhotos = [];
    for (let i = 0; i < 10 && availablePhotos.length < 10; i++) {
      const photoIndex = (photosUsedInPreviousCycles + i) % photos.length;
      availablePhotos.push(shuffledPhotos[photoIndex]);
    }
    
    return availablePhotos;
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
    
    // Get the photos for this cycle
    const cyclePhotos = getPhotosForCycle(photos, currentCycleStart, cycleNumber);
    
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