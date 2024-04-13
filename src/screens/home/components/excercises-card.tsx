import { ArrowRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Card,
  CardBody,
  CardProps,
  Flex,
  Heading,
  Stack,
  Tag,
  Text
} from '@chakra-ui/react';
import { FC } from 'react';

export const ExcercisesCard: FC<
  CardProps & { title: string; nbSessions: number; obj?: number }
> = ({ title, nbSessions, obj, ...rest }) => {
  return (
    <Card padding="1rem" my="1rem" cursor="pointer" {...rest}>
      <Stack justifyContent="space-between" direction="row" alignItems="center">
        <CardBody>
          <Heading mb="1rem" size="lg">
            {title}
          </Heading>
          <Box mb="0.5rem">
            {nbSessions > 0 ? (
              <Text>Sessions : {nbSessions} </Text>
            ) : (
              <Text>Pas encore de sessions</Text>
            )}
          </Box>

          {obj ? (
            <Flex flexDir="row">
              <Text mr="0.5rem">Objectif: </Text>
              <Text>{obj} kg</Text>
            </Flex>
          ) : (
            <Tag>NEW</Tag>
          )}
        </CardBody>
        <ArrowRightIcon />
      </Stack>
    </Card>
  );
};
