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
  ModalProps
} from '@chakra-ui/react';
import { FC } from 'react';

export const ExoScreenAddSessionsModal: FC<
  Omit<ModalProps, 'children'> & { onClick: () => void }
> = ({ onClick, ...rest }) => {
  return (
    <Modal isCentered {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Initialiser une nouvelle session</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup>
            <Input type="number" placeholder="Ex: 60" />
            <InputRightAddon>Kg</InputRightAddon>
          </InputGroup>
          <ModalFooter>
            <Button colorScheme="pink">Ajouter</Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
