import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Box } from '@welcome-ui/box';
import { Button } from '@welcome-ui/button';
import { Field } from '@welcome-ui/field';
import { InputText } from '@welcome-ui/input-text';
import { Text } from '@welcome-ui/text';
import styled from '@xstyled/styled-components';

interface Inputs {
  description: string;
}

const AddNewTicketContainer = styled(Box)`
  max-width: 480;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  border-style: solid;
  border-width: md;
  border-color: primary-500;
  border-radius: lg;
  padding: md;
`;

const StyledForm = styled.formBox`
  display: flex;
  flex-direction: column;
`;

export function AddNewTicket() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = ({ description }) => {
    if (!description) return;

    async function addNewTickets() {
      await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      }).then(() => {
        reset();
      });
    }

    addNewTickets();
  };

  const onGoBack = () => {
    navigate('/');
  };

  return (
    <AddNewTicketContainer>
      <Text variant="h2" color="primary-700" textAlign="center">
        Add New Ticket
      </Text>

      <StyledForm onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Field label="Description">
          <InputText {...register('description')} />
        </Field>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mt="md"
        >
          <Button w={1 / 3} variant="tertiary" onClick={onGoBack}>
            Back
          </Button>
          <Button w={1 / 3} type="submit">
            Submit
          </Button>
        </Box>
      </StyledForm>
    </AddNewTicketContainer>
  );
}

export default AddNewTicket;
