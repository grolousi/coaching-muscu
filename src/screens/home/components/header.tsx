import { AddIcon } from '@chakra-ui/icons';
import { Flex, Heading, IconButton } from '@chakra-ui/react';

export const HomeHeader = () => {
  return (
    <Flex w="100%" py="1rem" justifyContent="space-between">
      <Heading>Exercises</Heading>
      <IconButton
        borderRadius="5px"
        aria-label="Add exercise"
        icon={<AddIcon />}
      />
    </Flex>
  );
};
