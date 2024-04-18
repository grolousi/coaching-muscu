import { Flex } from '@chakra-ui/react';

import { ExcercisesCard } from './components/excercises-card';
import { exercises } from '../../shared/constants/exercises';
import { FC, useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import { HomeHeader } from './components/header';
import { ExoContext } from '../../shared/contexts/exo.context';

export const HomeScreen: FC = () => {
  const { exoSettings } = useContext(ExoContext);
  const aggregatedExo = exercises.map((exo) => {
    const settings = exoSettings.find((s) => s.id === exo.id);
    return {
      ...exo,
      settings
    };
  });
  const navigate = useNavigate();
  return (
    <Flex flexDir="column" h="100%" w="100%">
      <HomeHeader px="1.5em" />
      <Flex px="1.5em" mt="1rem" w="100%" justifyContent="center">
        <Flex flexDir="column" w="100%">
          {aggregatedExo.map((exo) => {
            const settings = exo.settings;
            return (
              <ExcercisesCard
                obj={settings?.obj ?? 0}
                sessions={settings?.sessions}
                key={`exo-${exo.id}`}
                title={exo.name}
                onClick={() => navigate(`/exo/${exo.id}`)}
              />
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};
