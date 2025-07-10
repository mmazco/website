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
    // Correct list of photos actually used in cycle 0 (to exclude completely)
    const cycle0UsedPhotos = [
      "Antique Shop, Tehran, Iran March 2015",
      "Downtown Tehran, Iran Jan 2017", // This was position 2 in cycle 0 (NOT the (1) or (2) versions)
      "Dizi restaurant, Tehran, Iran March 2015", 
      "Tajrish, Tehran, Iran Jan 2017",
      "Saboos Cafe Bakery, Tehran, Iran March 2015",
      "Tochal Ski Resort, Tehran, Iran Dec 2016", // First Tochal was used
      "Untitled March 2015",
      "Saboos Cafe Bakery, Tehran, Iran May 2015",
      "Meydoon Azadi, Freedom Square, Tehran, Iran April 2015",
      "Downtown Tehran (2), Iran Jan 2017" // This was also used in cycle 0
    ];
    
    // Get ONLY photos that were NOT used in cycle 0
    const availableForCycle1 = photos.filter(p => {
      // Exclude exact title matches
      if (cycle0UsedPhotos.includes(p.title)) return false;
      
      // Special cases for partial matches that were used in cycle 0
      if (p.title === "Tehran, Iran Jan 2017" && p.details === "Canon T50, Lomography Colour Negative film, ISO 400") return false;
      if (p.title === "Tehran, Iran Jan 2017" && p.details === "Canon T50, Lomography Colour Negative film, ISO 400 35mm") return false;
      if (p.title.includes("Tochal Ski Resort") && p.details === "Taken on iPhone") return false; // Both Tochals used
      
      return true;
    });
    
    // Hardcoded sequence for Cycle 1 - using photos that were NOT in cycle 0
    const downtownTehran1 = photos.find(p => p.title === "Downtown Tehran (1), Iran Jan 2017");
    const niavaranTehran = photos.find(p => p.title === "Niavaran, Tehran, Iran May 2017");
    const tehranApril2017 = photos.find(p => p.title === "Tehran, Iran April 2017");
    const parisDec2017 = photos.find(p => p.title === "Paris Dec 2017");
    const sardinia1 = photos.find(p => p.title === "Sardinia June 2016" && p.filename.includes("98290009"));
    
    // Get remaining photos for positions 6-10
    const remainingPhotos = availableForCycle1.filter(p => 
      p.title !== "Downtown Tehran (1), Iran Jan 2017" &&
      p.title !== "Niavaran, Tehran, Iran May 2017" &&
      p.title !== "Tehran, Iran April 2017" &&
      p.title !== "Paris Dec 2017" &&
      !(p.title === "Sardinia June 2016" && p.filename.includes("98290009"))
    );
    
    const establishedPhotos = [
      downtownTehran1, niavaranTehran, tehranApril2017, parisDec2017, sardinia1,
      ...remainingPhotos
    ].filter(Boolean) as Photo[];
    
    // If we don't have enough photos, fill with shuffled photos from available ones
    if (establishedPhotos.length < 10) {
      const seed = cycleNumber * 1000 + cycleStartDate.getTime() / 1000000;
      const shuffledAvailablePhotos = shuffleArray(availableForCycle1, seed);
      
      // Add photos until we reach 10, avoiding immediate duplicates within the same cycle
      const usedTitlesInCycle = new Set(establishedPhotos.map(p => p.title));
      
      for (const photo of shuffledAvailablePhotos) {
        if (establishedPhotos.length >= 10) break;
        if (!usedTitlesInCycle.has(photo.title)) {
          establishedPhotos.push(photo);
          usedTitlesInCycle.add(photo.title);
        }
      }
    }
    
    return establishedPhotos.slice(0, 10);
  } else {
    // For subsequent cycles, use all photos in a shuffled order
    // This ensures continuous rotation even with limited photo sets
    const seed = cycleNumber * 1000 + cycleStartDate.getTime() / 1000000;
    const shuffledPhotos = shuffleArray(photos, seed);
    
    // Create a deterministic but varied 10-photo cycle
    // Ensure no duplicate titles within the same cycle
    const cyclePhotos = [];
    const usedTitles = new Set<string>();
    let attempts = 0;
    const maxAttempts = photos.length * 2; // Prevent infinite loops
    
    for (let i = 0; i < 10 && attempts < maxAttempts; i++) {
      const photoIndex = (cycleNumber * 7 + i + attempts) % photos.length;
      const candidatePhoto = shuffledPhotos[photoIndex];
      
      if (!usedTitles.has(candidatePhoto.title)) {
        cyclePhotos.push(candidatePhoto);
        usedTitles.add(candidatePhoto.title);
      } else {
        // If we hit a duplicate title, try the next photo
        i--; // Don't increment i, try again
        attempts++;
      }
    }
    
    // If we still don't have enough photos, fill with remaining unique titles
    if (cyclePhotos.length < 10) {
      for (const photo of shuffledPhotos) {
        if (cyclePhotos.length >= 10) break;
        if (!usedTitles.has(photo.title)) {
          cyclePhotos.push(photo);
          usedTitles.add(photo.title);
        }
      }
    }
    
    return cyclePhotos;
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