
export interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  rating: number;
  year: number;
  genre: string[];
  type: 'movie' | 'series';
  duration?: string;
  seasons?: number;
}

export enum SubscriptionPlan {
  BASIC = '1080p',
  ULTRA = '4K'
}

export type VideoQuality = '720p' | '1080p' | '4K';

export interface User {
  id: string;
  email: string;
  isSubscribed: boolean;
  plan?: SubscriptionPlan;
}

export type AuthMode = 'login' | 'signup' | 'pricing';
