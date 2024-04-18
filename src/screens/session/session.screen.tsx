import { FC, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ExoContext } from '../../shared/contexts/exo.context';
import {
  Button,
  Card,
  Flex,
  Heading,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import {
  AddSeriesModalFormType,
  SessionScreenAddSeriesModal
} from './components/session-add-series-modal';
import { ArrowBackIcon } from '@chakra-ui/icons';

export const SessionScreen: FC = () => {
  const { id, sessionId } = useParams() as { id: string; sessionId: string };
  const { exoSettings, setExoSettings } = useContext(ExoContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const currentSession = exoSettings
    .find((s) => s.id === id)
    ?.sessions?.find((session) => session.id === sessionId);

  const setSeries = (data: AddSeriesModalFormType) => {
    setExoSettings((prev) => {
      return prev.map((exo) => {
        if (exo.id === id) {
          const newSessions = exo.sessions.map((session) => {
            if (session.id === sessionId) {
              return {
                ...session,
                max:
                  !session.max || session.max < parseInt(data.weight)
                    ? parseInt(data.weight)
                    : session.max,
                series: [
                  ...session.series,
                  {
                    weight: parseInt(data.weight),
                    previsionRep: parseInt(data.previsionReps),
                    reps: parseInt(data.reps),
                    comment: data.comment
                  }
                ]
              };
            }
            return session;
          });
          return { ...exo, sessions: newSessions };
        }
        return exo;
      });
    });
    onClose();
  };

  console.log(currentSession);
  return (
    <>
      <SessionScreenAddSeriesModal
        isOpen={isOpen}
        onClose={onClose}
        onClick={setSeries}
      />
      <Flex p="1rem" flexDir="column">
        <Flex alignItems="center" py="1rem">
          <ArrowBackIcon
            onClick={() => navigate(-1)}
            boxSize="26px"
            mr="1rem"
          />
          <Heading>
            Session du {dayjs(currentSession?.date).format('DD/MM/YYYY')}{' '}
          </Heading>
        </Flex>

        <Flex flexDir="column">
          <Button onClick={onOpen} colorScheme="pink">
            Ajouter une serie
          </Button>
          {currentSession?.series.length === 0 ? (
            <Text>Pas encore de series</Text>
          ) : (
            currentSession?.series.map((series, index) => (
              <Card
                flexDir="column"
                key={`session-${sessionId}-series-${index}`}
                p="1rem"
              >
                <Text>{`Serie n° ${index + 1}`}</Text>
                <Text>Poids: {series.weight}</Text>
                <Text>Prévision : {series.previsionRep}</Text>
                <Text>Reps :{series.reps}</Text>
                <Text>Commentaire :{series.comment}</Text>
              </Card>
            ))
          )}
        </Flex>
      </Flex>
    </>
  );
};
