export type ExercicesSettingsTypes = {
  id: string;
  obj: number;
  sessions: ExercicesSettingsSessionType;
}[];

export type ExercicesSettingsSessionType = Array<{
  id: string;
  date: string;
  max: number | null;
  series: Array<{
    weight: number;
    reps: number;
    previsionRep: number;
    comment: string;
  }>;
}>;

export type ExoType = {
  id: string;
  name: string;
};
