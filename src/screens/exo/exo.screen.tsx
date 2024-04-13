import {
  Button,
  Flex,
  Heading,
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
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { getExo } from '../../shared/constants/exercises';
import { FC, useContext, useEffect, useState } from 'react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { ExoContext } from '../../shared/contexts/exo.context';

export const ExoScreen: FC = () => {
  const { id } = useParams() as { id: string };
  const exo = getExo(id);
  const navigate = useNavigate();
  const { exoSettings, setExoSettings } = useContext(ExoContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!exo) {
      navigate('/');
    }
  }, [exo, navigate]);

  const setOBJ = (obj: string) => {
    const nbObj = parseInt(obj);
    setExoSettings((prev) => {
      if (!prev || prev.length === 0) {
        return [{ id: exo?.id ?? '', obj: nbObj, sessions: [] }];
      }
      return prev.map((s) => {
        if (s.id === exo?.id) {
          return { ...s, obj: nbObj };
        }
        return s;
      });
    });
    onClose();
  };

  const current = exoSettings.find((s) => s.id === exo?.id);

  useEffect(() => {
    if (!current || current.obj === 0) {
      onOpen();
    }
  }, [current, onOpen]);

  console.log(current);

  if (!exo) {
    return null;
  }

  return (
    <>
      <ExoScreenInitModal
        isOpen={isOpen}
        onClose={!current || current.obj === 0 ? () => navigate(-1) : onClose}
        onClick={setOBJ}
      />
      <Flex flexDir="column" h="100%" w="100%" px="1.5em">
        <Flex alignItems="center" py="1rem">
          <ArrowBackIcon
            onClick={() => navigate(-1)}
            boxSize="26px"
            mr="1rem"
          />
          <Heading>{exo?.name}</Heading>
        </Flex>
      </Flex>
    </>
  );
};

const ExoScreenInitModal: FC<
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
        {<ModalCloseButton />}
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
