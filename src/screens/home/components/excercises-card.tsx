import { ArrowRightIcon } from '@chakra-ui/icons';
import {
  Card,
  CardBody,
  CardProps,
  Heading,
  Stack,
  Tag,
  Text
} from '@chakra-ui/react';
import { FC } from 'react';

export const ExcercisesCard: FC<
  CardProps & { title: string; nbSessions: number }
> = ({ title, nbSessions, ...rest }) => {
  return (
    <Card padding="1rem" my="1rem" cursor="pointer" {...rest}>
      <Stack justifyContent="space-between" direction="row" alignItems="center">
        <CardBody>
          <Heading mb="1rem" size="lg">
            {title}
          </Heading>
          {nbSessions > 0 ? (
            <Text>Sessions : {nbSessions} </Text>
          ) : (
            <Tag>NEW</Tag>
          )}
        </CardBody>
        <ArrowRightIcon />
      </Stack>
    </Card>
  );
};
