import { ArrowRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Card,
  CardBody,
  CardProps,
  Flex,
  Heading,
  Progress,
  Stack,
  Tag,
  theme
} from '@chakra-ui/react';
import { FC } from 'react';
import { ExercicesSettingsSessionType } from '../../../shared/types/exo.types';

const getProgress = (obj: number, sessions?: ExercicesSettingsSessionType) => {
  const max = sessions?.reduce((acc, cur) => {
    if (!cur.max) return acc;
    return cur.max > acc ? cur.max : acc;
  }, 0) as number;
  return Math.round((max / obj) * 100);
};

export const ExcercisesCard: FC<
  CardProps & {
    title: string;
    sessions?: ExercicesSettingsSessionType;
    obj: number;
  }
> = ({ title, sessions, obj, ...rest }) => {
  const nbSessions = sessions?.length || 0;

  return (
    <Card
      borderRadius="30px"
      padding="1rem"
      my="1rem"
      cursor="pointer"
      shadow="none"
      borderColor={theme.colors.blue[500]}
      borderWidth="3px"
      {...rest}
    >
      <Stack justifyContent="space-between" direction="row" alignItems="center">
        <CardBody>
          <Heading mb="1rem">{title}</Heading>
          <Box mb="0.5rem">
            {nbSessions > 0 ? (
              <Heading size="sm">Sessions : {nbSessions} </Heading>
            ) : (
              <Heading size="sm">Pas encore de sessions</Heading>
            )}
          </Box>

          {obj ? (
            <>
              <Flex flexDir="row" mb="0.5rem">
                <Heading mb="0.5rem" mr="0.25rem" size="sm">
                  Objectif:
                </Heading>
                <Heading size="sm">{obj} kg</Heading>
              </Flex>
              <Box>
                <Heading size="sm" mb="0.4rem">
                  Progression:
                </Heading>
                {sessions && (
                  <Progress
                    value={getProgress(obj, sessions)}
                    colorScheme={
                      getProgress(obj, sessions) >= 100 ? 'pink' : 'blue'
                    }
                  />
                )}
              </Box>
            </>
          ) : (
            <Tag>NEW</Tag>
          )}
        </CardBody>
        <ArrowRightIcon />
      </Stack>
    </Card>
  );
};
