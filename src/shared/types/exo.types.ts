export type ExercicesSettingsTypes = {
  id: string;
  obj: number;
  sessions?: Array<{
    id: string;
    date: string;
    max: number | null;
    series: Array<{ weight: number; reps: number; previsionRep: number }>;
  }>;
}[];

export type ExoType = {
  id: string;
  name: string;
};
