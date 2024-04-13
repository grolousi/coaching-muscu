export type ExercicesSettingsTypes = {
  id: string;
  obj: number;
  sessions?: Array<{
    date: string;
    max: number | null;
    series: Array<{ weight: number; reps: number }>;
  }>;
}[];
