export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export interface HealthMetric {
  time: string;
  value: number;
}

export enum AppSection {
  HOME = 'HOME',
  DASHBOARD = 'DASHBOARD',
  AI_CHAT = 'AI_CHAT',
}

export interface UserVitals {
  heartRate: number;
  steps: number;
  sleepHours: number;
  calories: number;
}