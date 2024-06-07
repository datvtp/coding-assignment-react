import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Box } from '@welcome-ui/box';
import { Button } from '@welcome-ui/button';
import { CheckIcon } from '@welcome-ui/icons';
import { Text } from '@welcome-ui/text';
import styled from '@xstyled/styled-components';

import { Ticket } from '@acme/shared-models';

const UpdateTicketContainer = styled(Box)`
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

export function UpdateTicket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<Ticket>();

  const onCompleteTicket = () => {
    async function addNewTickets() {
      await fetch(`/api/tickets/${id}/complete`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then();
    }

    addNewTickets();
  };

  const onGoBack = () => {
    navigate('/');
  };

  useEffect(() => {
    if (!id) return;

    async function fetchTickets() {
      const data = await fetch(`/api/tickets/${id}`).then();
      setTicket(await data.json());
    }

    fetchTickets();
  }, [id]);

  if (!ticket) {
    return null;
  }

  return (
    <UpdateTicketContainer>
      <Text variant="h2" color="primary-700" textAlign="center">
        Update Ticket
      </Text>

      <Text>
        <b>ID:</b> {id}
      </Text>
      <Text>
        <b>Description:</b> {ticket.description}
      </Text>
      <Text>
        <b>Assignee ID:</b> {ticket.assigneeId}
      </Text>

      <Text>
        <b>Status:</b> {ticket.completed ? 'Completed' : 'Incomplete'}
      </Text>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mt="md"
      >
        <Button
          w={ticket.completed ? 1 : 1 / 3}
          variant="tertiary"
          onClick={onGoBack}
        >
          Back
        </Button>

        {ticket.completed ? null : (
          <Button onClick={onCompleteTicket}>
            Complete it
            <CheckIcon ml="md" />
          </Button>
        )}
      </Box>
    </UpdateTicketContainer>
  );
}

export default UpdateTicket;
