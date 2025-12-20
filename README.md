# Maryam Mazraei - Personal Portfolio

A minimal personal portfolio website built with Next.js and TypeScript, featuring project showcases, publications, talks, and a photography archive.

## Live Site

🌐 [mmaz.co](https://mmaz.co)

## Features

### Homepage
- **Split Layout**: Fixed text panel on the left, scrollable project videos on the right
- **Project Spotlight**: Showcasing Aleph, Media Reaction Finder, World Vote, and Crowdmuse with demo videos
- **Dark Mode**: Toggle between light and dark themes with persistent preference
- **Open Memos**: Open proposals and concepts for review, hack, or grant funding
- **Publications**: Links to Crowdmuse Mirror and Autopsy publications
- **Selected Talks**: Conference talks from 2019-2024
- **Bouncing 3D Characters**: Playful animated characters floating across the page
- **Responsive Design**: Optimized layouts for desktop and mobile

### Photography Page (`/photography`)
- **Daily Photo Rotation**: Shows a different photo each day
- **10-Day Cycles**: After 10 days, the cycle resets with a new random selection
- **Date Log**: Displays clickable dates showing which photos were shown on previous days
- **Full Collection**: Link to complete Tumblr archive

### Playground Page (`/playground`)
- **Easter Egg**: Hidden page with bouncing 3D characters
- **Partial Functional Correspondence**: Explanatory text about the mathematical visualization method

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: CSS (no frameworks)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mmazco/website.git
cd website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── components/
│   │   └── BouncingCharacter.tsx   # Animated bouncing character component
│   ├── globals.css                  # Global styles (light/dark mode, layouts)
│   ├── layout.tsx                   # Root layout with dark mode script
│   ├── page.tsx                     # Homepage with split layout
│   ├── photography/
│   │   └── page.tsx                 # Photography archive page
│   └── playground/
│       └── page.tsx                 # Hidden playground page
├── lib/
│   ├── photos.ts                    # Photo data for photography page
│   └── usePhotoRotation.ts          # Photo rotation logic
├── types/
│   └── index.ts                     # TypeScript interfaces
├── public/
│   └── images/                      # Photos, videos, and assets
└── README.md
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically on every push

### Manual Deployment

```bash
npm run build
npm run start
```

## Adding Content

### Adding Photos

1. Add your photos to the `public/images/` directory
2. Update the `lib/photos.ts` file with the new photo information:

```typescript
{
  filename: "/images/your-photo.jpg",
  title: "Photo Title",
  details: "Camera and technical details"
}
```

### Adding Project Videos

1. Add video files to `public/images/`
2. Update `app/page.tsx` to include new video in the right panel

## Customization

- **Photo Cycle Duration**: Change the 10-day cycle in `lib/usePhotoRotation.ts`
- **Styling**: Update `app/globals.css` for visual changes
- **Dark Mode Colors**: Modify `.dark-mode` classes in CSS

## Fork This Site

Feel free to fork this repository and customize it for your own portfolio! The footer includes a "Fork website" link.

## License

© Maryam Mazraei - All rights reserved
