# Photography Daily - A Photo a Day

A minimalist photography website built with Next.js and TypeScript that displays a different photo each day on a 10-day rotating cycle.

## Features

- **Daily Photo Rotation**: Shows a different photo each day
- **10-Day Cycles**: After 10 days, the cycle resets with a new random selection
- **Date Log**: Displays clickable dates showing which photos were shown on previous days
- **Responsive Design**: Works on both desktop and mobile
- **TypeScript**: Fully typed for better development experience

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page component
├── lib/
│   ├── photos.ts            # Photo data
│   └── usePhotoRotation.ts  # Photo rotation logic
├── types/
│   └── index.ts             # TypeScript interfaces
├── public/
│   └── images/              # Photo assets
└── README.md
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically

### Manual Deployment

```bash
npm run build
npm run start
```

## Adding Photos

1. Add your photos to the `public/images/` directory
2. Update the `lib/photos.ts` file with the new photo information:

```typescript
{
  filename: "/images/your-photo.jpg",
  title: "Photo Title",
  details: "Camera and technical details"
}
```

## Customization

- **Cycle Duration**: Change the 10-day cycle in `lib/usePhotoRotation.ts`
- **Start Date**: Modify the start date in the same file
- **Styling**: Update `app/globals.css` for visual changes

## License

© Maryam Mazraei - All rights reserved
