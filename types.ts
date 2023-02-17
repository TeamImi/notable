export interface Birthday {
  day: string;
  month: string;
}

interface Details {
  pageid: number;
  extract: string;
  thumbnail?: any;
  titles?: any;
  content_urls?: any;
  description?: string;
}

export interface NotableRecord {
  describedName: string;
  details: Details;
  birthYear: number;
}
