import {
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text
} from '@chakra-ui/react';
import { FC, useState } from 'react';

export const ExoScreenInitModal: FC<
  Omit<ModalProps, 'children'> & {
    onClick: (obj: string) => void;
  }
> = ({ onClick, ...rest }) => {
  const [obj, setObj] = useState<string>('');
  console.log(obj);
  return (
    <Modal closeOnOverlayClick={false} isCentered {...rest}>
      <ModalOverlay />
      <ModalContent p="1rem">
        <ModalHeader>Définition de l'objectif</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb="1rem">
            Avant de commencer votre première session, définissez votre objectif
          </Text>
          <InputGroup>
            <Input
              value={obj}
              onChange={(e) => setObj(e.target.value)}
              type="number"
              placeholder="Ex: 60"
            />
            <InputRightAddon>Kg</InputRightAddon>
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            isDisabled={!obj}
            onClick={() => onClick(obj)}
            colorScheme="pink"
          >
            Commencer
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
