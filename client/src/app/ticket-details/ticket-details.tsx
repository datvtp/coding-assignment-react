import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box } from '@welcome-ui/box';
import { Text } from '@welcome-ui/text';
import styled from '@xstyled/styled-components';

import { Ticket } from '@acme/shared-models';

const TicketDetailsContainer = styled(Box)`
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

export function TicketDetails() {
  const { id } = useParams();
  const [ticket, setTicket] = useState<Ticket>();

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
    <TicketDetailsContainer>
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
    </TicketDetailsContainer>
  );
}

export default TicketDetails;
