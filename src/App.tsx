import { HomeScreen } from './screens/home/home.screen';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import { ExoScreen } from './screens/exo/exo.screen';
import { useEffect, useState } from 'react';
import { ExercicesSettingsTypes } from './shared/types/exo.types';
import { ExoContext } from './shared/contexts/exo.context';

const getStorage = () => {
  const storage = localStorage.getItem('exoSettings');
  if (storage) {
    return JSON.parse(storage);
  }
  return [];
};

const App = () => {
  const [exoSettings, setExoSettings] =
    useState<ExercicesSettingsTypes>(getStorage());

  useEffect(() => {
    const intervalId = setInterval(() => {
      localStorage.setItem('exoSettings', JSON.stringify(exoSettings));
    }, 1000);
    return () => clearInterval(intervalId);
  });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element={<HomeScreen />} />
        <Route path="/exo/:id" element={<ExoScreen />} />
      </>
    ),
    {
      future: {
        // Normalize `useNavigation()`/`useFetcher()` `formMethod` to uppercase
        v7_normalizeFormMethod: true
      }
    }
  );
  return (
    <ExoContext.Provider value={{ setExoSettings, exoSettings }}>
      <RouterProvider router={router} />
    </ExoContext.Provider>
  );
};

export default App;
