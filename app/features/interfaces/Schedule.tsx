export interface Schedule {
  id: number;
  type: string;
  date: string | undefined;
  day: string | undefined;
  time: string;
  place: string;
  durationMin: string;
  activity: string;
}
