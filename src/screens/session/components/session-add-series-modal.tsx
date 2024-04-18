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
import { FC, useState } from 'react';

export type AddSeriesModalFormType = {
  weight: string;
  previsionReps: string;
  reps: string;
  comment: string;
};

export const SessionScreenAddSeriesModal: FC<
  Omit<ModalProps, 'children'> & {
    onClick: (data: AddSeriesModalFormType) => void;
  }
> = ({ onClick, ...rest }) => {
  const [formData, setFormData] = useState<AddSeriesModalFormType>({
    weight: '',
    previsionReps: '',
    reps: '',
    comment: ''
  });
  return (
    <Modal isCentered {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ajouter une nouvelle série</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup>
            <Input
              value={formData.weight}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  weight: e.target.value
                }))
              }
              type="number"
              placeholder="Ex: 60"
            />
            <InputRightAddon>Kg</InputRightAddon>
          </InputGroup>
          <Input
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                previsionReps: e.target.value
              }))
            }
            type="number"
            placeholder="Ex: 60"
            value={formData.previsionReps}
          />
          <Input
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                reps: e.target.value
              }))
            }
            value={formData.reps}
            type="number"
            placeholder="Ex: 60"
          />
          <Input
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                comment: e.target.value
              }))
            }
            value={formData.comment}
            type="text"
            placeholder=""
          />
          <ModalFooter>
            <Button onClick={() => onClick(formData)} colorScheme="pink">
              Ajouter
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
