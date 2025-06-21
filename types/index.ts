export interface Photo {
  filename: string;
  title: string;
  details: string;
}

export interface PhotoLog {
  [date: string]: {
    filename: string;
    title: string;
    details: string;
  };
}

export interface PhotoData {
  photos: Photo[];
} 