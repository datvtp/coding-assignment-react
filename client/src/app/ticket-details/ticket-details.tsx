import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Box } from '@welcome-ui/box';
import { Button } from '@welcome-ui/button';
import { Field } from '@welcome-ui/field';
import { CheckIcon } from '@welcome-ui/icons';
import { OptionValue, Select } from '@welcome-ui/select';
import { Text } from '@welcome-ui/text';
import styled from '@xstyled/styled-components';

import { Ticket, User } from '@acme/shared-models';

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
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<Ticket>();
  const [users, setUsers] = useState([] as User[]);
  const [assigneeId, setAssigneeId] = useState<OptionValue | OptionValue[]>();

  const onGoBack = () => {
    navigate('/');
  };

  const onSelectAssignee = (value: OptionValue | OptionValue[]) => {
    async function unassignUserToTicket() {
      await fetch(`/api/tickets/${id}/unassign`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then();
    }

    async function assignUserToTicket() {
      await fetch(`/api/tickets/${id}/assign/${value}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then();
    }

    if (value) {
      assignUserToTicket();
    } else {
      unassignUserToTicket();
    }

    setAssigneeId(value);
  };

  const onCompleteTicket = () => {
    async function addNewTickets() {
      await fetch(`/api/tickets/${id}/complete`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(() => {
        onGoBack();
      });
    }

    addNewTickets();
  };

  useEffect(() => {
    if (!id) return;

    async function fetchTicketDetails() {
      const data = await fetch(`/api/tickets/${id}`).then();
      setTicket(await data.json());
    }

    async function fetchUsers() {
      const data = await fetch('/api/users').then();
      setUsers(await data.json());
    }

    fetchTicketDetails();
    fetchUsers();
  }, [id]);

  useEffect(() => {
    if (ticket && ticket.assigneeId && users) {
      setAssigneeId(ticket.assigneeId);
    }
  }, [ticket, users]);

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
      <Field
        label={
          <Text>
            <b>Assignee:</b>
          </Text>
        }
      >
        <Select
          options={users.map(({ id, name }) => {
            return {
              label: name,
              value: id,
            };
          })}
          name="assignee"
          value={assigneeId}
          onChange={onSelectAssignee}
          placeholder="Select"
          isClearable
        />
      </Field>
      <Text>
        <b>Status:</b> {ticket.completed ? 'Completed' : 'Incomplete'}
      </Text>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mt="md"
        spaceX="md"
      >
        <Button
          w={ticket.completed ? 1 : '50%'}
          variant="tertiary"
          onClick={onGoBack}
        >
          Back
        </Button>

        {ticket.completed ? null : (
          <Button w="50%" onClick={onCompleteTicket}>
            Complete it
            <CheckIcon ml="md" />
          </Button>
        )}
      </Box>
    </TicketDetailsContainer>
  );
}

export default TicketDetails;
