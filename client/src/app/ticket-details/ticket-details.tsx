import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box } from '@welcome-ui/box';
import { Text } from '@welcome-ui/text';

import { Ticket } from '@acme/shared-models';

export function TicketDetails() {
  const [ticket, setTicket] = useState<Ticket>();
  const { id } = useParams();

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
    <Box
      maxW={480}
      display="flex"
      flexDirection="column"
      mx="auto"
      borderStyle="solid"
      borderWidth="md"
      borderColor="primary-500"
      borderRadius="lg"
      p="md"
    >
      <Text variant="h2" color="primary-700" textAlign="center">
        Ticket Details
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
    </Box>
  );
}

export default TicketDetails;
