import { createContext } from 'react';
import { ExercicesSettingsTypes } from '../types/exo.types';

export const ExoContext = createContext<{
  exoSettings: ExercicesSettingsTypes;
  setExoSettings: React.Dispatch<React.SetStateAction<ExercicesSettingsTypes>>;
}>({
  exoSettings: [],
  setExoSettings: () => {}
});
