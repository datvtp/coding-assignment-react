import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box } from '@welcome-ui/box';
import { Button } from '@welcome-ui/button';
import { InformationOutlineIcon } from '@welcome-ui/icons';
import { OptionValue, Select } from '@welcome-ui/select';
import { Table } from '@welcome-ui/table';
import { Text } from '@welcome-ui/text';

import { Ticket } from '@acme/shared-models';

export function Tickets() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([] as Ticket[]);
  const [filteredTickets, setFilteredTickets] = useState([] as Ticket[]);
  const [filter, setFilter] = useState<OptionValue | OptionValue[]>();

  const onSelectFilter = (value: OptionValue | OptionValue[]) => {
    setFilter(value);
  };

  const onAddNewTicket = () => {
    navigate('/add');
  };

  useEffect(() => {
    async function fetchTickets() {
      const data = await fetch('/api/tickets').then();
      setTickets(await data.json());
    }

    fetchTickets();
  }, []);

  useEffect(() => {
    if (tickets) {
      setFilteredTickets(tickets);
    }
  }, [tickets]);

  useEffect(() => {
    if (filter) {
      const filteredTickets = (function () {
        if (filter === 'completed') {
          return tickets.filter((t) => t.completed === true);
        }

        return tickets.filter((t) => t.completed === false);
      })();

      setFilteredTickets(filteredTickets);
    } else {
      setFilteredTickets(tickets);
    }
  }, [filter, tickets]);

  return (
    <Box w={1} display="flex" alignItems="center" justifyContent="center">
      <Box
        flex={1}
        maxW={960}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          w={1}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text variant="h2" color="primary-700">
            Tickets
          </Text>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            spaceX="md"
          >
            <Box display="flex" alignItems="center" spaceX="md">
              <Text>Filter by status:</Text>
              <Select
                options={[
                  { label: 'Completed', value: 'completed' },
                  { label: 'Incomplete', value: 'incomplete' },
                ]}
                name="filter_by_status"
                value={filter}
                onChange={onSelectFilter}
                placeholder="Select"
                isClearable
              />
            </Box>

            <Button onClick={onAddNewTicket}>Add new</Button>
          </Box>
        </Box>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Assignee ID</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th textAlign="center">Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>

          {filteredTickets ? (
            <Table.Tbody>
              {filteredTickets.map(
                ({ id, description, assigneeId, completed }) => (
                  <Table.Tr key={id}>
                    <Table.Td>{id}</Table.Td>
                    <Table.Td>{description}</Table.Td>
                    <Table.Td>{assigneeId}</Table.Td>
                    <Table.Td>
                      {completed ? 'Completed' : 'Incomplete'}
                    </Table.Td>
                    <Table.Td textAlign="center">
                      <InformationOutlineIcon
                        size="md"
                        color={{ hover: 'primary-700' }}
                        cursor="pointer"
                        onClick={() => navigate(`/${id}`)}
                      />
                    </Table.Td>
                  </Table.Tr>
                )
              )}
            </Table.Tbody>
          ) : (
            <Text>...</Text>
          )}
        </Table>
      </Box>
    </Box>
  );
}

export default Tickets;
