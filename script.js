// Seeded random number generator for consistent daily photos
function seededRandom(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

// Get a shuffled array using a seed
function shuffleArray(array, seed) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(seededRandom(seed + i) * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Calculate which photo to show for a specific date
function getPhotoForDate(photos, date) {
    const startDate = new Date('2024-01-01'); // Start date for the rotation
    const daysSinceStart = Math.floor((date - startDate) / (1000 * 60 * 60 * 24));
    
    // Create a cycle seed that changes every time we go through all photos
    const cycleNumber = Math.floor(daysSinceStart / photos.length);
    const cycleSeed = cycleNumber * 12345; // Arbitrary multiplier for variation
    
    // Shuffle photos for this cycle
    const shuffledPhotos = shuffleArray(photos, cycleSeed);
    
    // Get the photo for this date from the shuffled array
    const photoIndex = daysSinceStart % photos.length;
    return shuffledPhotos[photoIndex];
}

// Calculate which photo to show today
function getDailyPhoto(photos) {
    const today = new Date();
    return getPhotoForDate(photos, today);
}

// Load and display the daily photo
async function loadDailyPhoto() {
    try {
        const response = await fetch('photos.json');
        const data = await response.json();
        const photos = data.photos;
        
        if (photos.length === 0) {
            console.error('No photos found in photos.json');
            return;
        }
        
        const todaysPhoto = getDailyPhoto(photos);
        
        // Update the DOM
        const photoElement = document.getElementById('daily-photo');
        const titleElement = document.getElementById('photo-title');
        const detailsElement = document.getElementById('photo-details');
        const filenameElement = document.getElementById('photo-filename');
        
        // Encode the filename to handle special characters
        photoElement.src = encodeURIComponent(todaysPhoto.filename);
        photoElement.alt = todaysPhoto.title;
        
        // Display both title and details
        titleElement.textContent = todaysPhoto.title;
        detailsElement.textContent = todaysPhoto.details;
        filenameElement.style.display = 'none'; // Hide the filename element
        
        // Handle image loading errors
        photoElement.onerror = function() {
            console.error('Failed to load image:', todaysPhoto.filename);
            this.alt = 'Image could not be loaded';
        };
        
        // Update the photo log with historical data
        updatePhotoLogWithHistory(photos);
        
    } catch (error) {
        console.error('Error loading photos:', error);
    }
}

// Get photos for a 10-day cycle starting from a specific date
function getPhotosForCycle(photos, cycleStartDate) {
    // Create a seed based on the cycle start date
    const seed = cycleStartDate.getTime() / 1000000;
    
    // Shuffle photos for this cycle
    const shuffledPhotos = shuffleArray(photos, seed);
    
    // Return the first 10 photos (or all if less than 10)
    return shuffledPhotos.slice(0, Math.min(10, shuffledPhotos.length));
}

// Update the photo log with today's and recent photos
function updatePhotoLogWithHistory(photos) {
    const today = new Date();
    const startDate = new Date('2025-06-21'); // Day 1 is June 21, 2025
    
    // Calculate days since start
    const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    
    // Calculate which 10-day cycle we're in (0-based)
    const cycleNumber = Math.floor(daysSinceStart / 10);
    
    // Calculate the day within the current cycle (0-9)
    const dayInCycle = daysSinceStart % 10;
    
    // Calculate the start date of the current cycle
    const currentCycleStart = new Date(startDate);
    currentCycleStart.setDate(currentCycleStart.getDate() + (cycleNumber * 10));
    
    // Get the photos for this cycle
    const cyclePhotos = getPhotosForCycle(photos, currentCycleStart);
    
    // Create photo log entries for visible dates
    let photoLog = {};
    
    // Add entries for each day from the start of the cycle up to today
    for (let i = 0; i <= dayInCycle && i < 10; i++) {
        const logDate = new Date(currentCycleStart);
        logDate.setDate(logDate.getDate() + i);
        const dateString = formatDateDDMMYYYY(logDate);
        
        // Assign the photo for this day from the cycle
        if (i < cyclePhotos.length) {
            photoLog[dateString] = {
                filename: cyclePhotos[i].filename,
                title: cyclePhotos[i].title,
                details: cyclePhotos[i].details
            };
        }
    }
    
    localStorage.setItem('photoLog', JSON.stringify(photoLog));
    
    // Display the log
    displayPhotoLog(photoLog);
}

// Format date as DDMMYYYY
function formatDateDDMMYYYY(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}${month}${year}`;
}

// Display the photo log in the DOM
function displayPhotoLog(photoLog) {
    const logContainer = document.getElementById('photo-log');
    logContainer.innerHTML = '';
    
    // Sort dates in chronological order
    const sortedDates = Object.keys(photoLog).sort();
    
    sortedDates.forEach(dateString => {
        if (photoLog[dateString]) {
            const entry = photoLog[dateString];
            const linkElement = document.createElement('div');
            linkElement.className = 'photo-log-entry';
            
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = dateString;
            link.onclick = function(e) {
                e.preventDefault();
                displayPhotoFromLog(entry.filename, entry.title, entry.details);
            };
            
            linkElement.appendChild(link);
            logContainer.appendChild(linkElement);
        }
    });
}

// Display a specific photo when clicking on a date
function displayPhotoFromLog(filename, title, details) {
    const photoElement = document.getElementById('daily-photo');
    const titleElement = document.getElementById('photo-title');
    const detailsElement = document.getElementById('photo-details');
    
    console.log('Displaying photo:', title); // Debug line
    
    // Encode the filename to handle special characters
    const encodedFilename = encodeURIComponent(filename);
    photoElement.src = encodedFilename;
    titleElement.textContent = title;
    detailsElement.textContent = details;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', loadDailyPhoto);

// Optional: Reload at midnight to show new photo
function scheduleNextPhoto() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const msUntilMidnight = tomorrow - now;
    
    setTimeout(() => {
        loadDailyPhoto();
        scheduleNextPhoto(); // Schedule the next reload
    }, msUntilMidnight);
}

// Start the midnight reload schedule
scheduleNextPhoto(); /* Cache cleared Fri Jun 20 17:11:41 PDT 2025 */
 