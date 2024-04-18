import { AddIcon } from '@chakra-ui/icons';
import { Flex, FlexProps, Heading, IconButton } from '@chakra-ui/react';
import { FC } from 'react';

export const HomeHeader: FC<FlexProps> = ({ ...rest }) => {
  return (
    <Flex w="100%" py="1rem" justifyContent="space-between" {...rest}>
      <Heading>Exercises</Heading>
      <IconButton
        borderRadius="5px"
        aria-label="Add exercise"
        icon={<AddIcon />}
      />
    </Flex>
  );
};
