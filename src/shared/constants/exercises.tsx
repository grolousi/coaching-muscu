export const exercises = [
  {
    id: 'benchPress',
    name: 'Bench Press'
  },
  {
    id: 'squat',
    name: 'Squat'
  },
  {
    id: 'deadlift',
    name: 'Deadlift'
  },
  {
    id: 'overheadPress',
    name: 'Overhead Press'
  },
  {
    id: 'barbellRow',
    name: 'Barbell Row'
  },
  {
    id: 'pullUp',
    name: 'Pull Up'
  },
  {
    id: 'dumbbellCurl',
    name: 'Dumbbell Curl'
  },
  {
    id: 'dumbbellPress',
    name: 'Dumbbell Press'
  },
  {
    id: 'dumbbellRow',
    name: 'Dumbbell Row'
  },
  {
    id: 'dumbbellSquat',
    name: 'Dumbbell Squat'
  },
  {
    id: 'dumbbellDeadlift',
    name: 'Dumbbell Deadlift'
  },
  {
    id: 'dumbbellLunge',
    name: 'Dumbbell Lunge'
  },
  {
    id: 'dumbbellBenchPress',
    name: 'Dumbbell Bench Press'
  },
  {
    id: 'dumbbellFly',
    name: 'Dumbbell Fly'
  }
];

export const getExo = (id: string) => exercises.find((exo) => exo.id === id);
