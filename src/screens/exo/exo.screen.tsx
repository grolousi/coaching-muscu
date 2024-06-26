import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { getExo } from '../../shared/constants/exercises';
import { FC, useContext, useEffect } from 'react';
import { ArrowBackIcon, CloseIcon } from '@chakra-ui/icons';
import { ExoContext } from '../../shared/contexts/exo.context';
import { ExoScreenInitModal } from './components/exo-init-modal';
import { ExercicesSettingsTypes, ExoType } from '../../shared/types/exo.types';
import dayjs from 'dayjs';

const getSetObj =
  ({
    setExoSettings,
    exo,
    onClose
  }: {
    setExoSettings: React.Dispatch<
      React.SetStateAction<ExercicesSettingsTypes>
    >;
    exo: ExoType | undefined;
    onClose: () => void;
  }) =>
  (obj: string) => {
    const nbObj = parseInt(obj);
    setExoSettings((prev) => {
      if (!prev || prev.length === 0) {
        return [{ id: exo?.id ?? '', obj: nbObj, sessions: [] }];
      }

      if (!prev.find((s) => s.id === exo?.id)) {
        return [...prev, { id: exo?.id ?? '', obj: nbObj, sessions: [] }];
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

  const setOBJ = getSetObj({ setExoSettings, exo, onClose });

  const current = exoSettings.find((s) => s.id === exo?.id);

  const addSession = () => {
    setExoSettings((prev) => {
      return prev.map((s) => {
        if (s.id === exo?.id) {
          return {
            ...s,
            sessions: [
              ...(s?.sessions ?? []),
              {
                id: new Date().getTime().toString(),
                date: new Date().toISOString(),
                max: null,
                series: []
              }
            ]
          };
        }
        return s;
      });
    });
  };

  const deleteSession = (id: string) => {
    setExoSettings((prev) => {
      return prev.map((s) => {
        if (s.id === exo?.id) {
          return {
            ...s,
            sessions: s.sessions?.filter((ss) => ss.id !== id)
          };
        }
        return s;
      });
    });
  };

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
        <Flex flexDir="column" h="100%" w="100%">
          {current && (
            <Flex flexDir="column">
              <Text>Objectif: {current?.obj} Kg</Text>
              <Button onClick={addSession} colorScheme="pink">
                Ajouter une session
              </Button>
              {!current.sessions || current.sessions.length === 0 ? (
                <Text>Pas encore de session</Text>
              ) : (
                <Flex w="100%" flexDir="column">
                  {current.sessions.map((s) => (
                    <Card
                      onClick={() => navigate(`session/${s.id}`)}
                      cursor="pointer"
                      key={`session-${s.date}`}
                    >
                      <Stack>
                        <CardBody>
                          <Flex
                            alignItems="center"
                            justifyContent={'space-between'}
                          >
                            <Text>{dayjs(s.date).format('DD/MM/YYYY')}</Text>
                            <Text>{`Max: ${s.max} kg`}</Text>
                            <IconButton
                              onClick={() => deleteSession(s.id)}
                              aria-label="Supprimer session"
                              w="30px"
                              icon={<CloseIcon boxSize="20px" />}
                            />
                          </Flex>
                        </CardBody>
                      </Stack>
                    </Card>
                  ))}
                </Flex>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  );
};
