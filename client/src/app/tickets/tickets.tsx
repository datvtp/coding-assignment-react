import { useNavigate } from 'react-router-dom';

import { Box } from '@welcome-ui/box';
import { Button } from '@welcome-ui/button';
import { ArrowRightIcon } from '@welcome-ui/icons';
import { Table } from '@welcome-ui/table';
import { Text } from '@welcome-ui/text';

import { Ticket } from '@acme/shared-models';

export interface TicketsProps {
  tickets: Ticket[];
}

export function Tickets({ tickets }: TicketsProps) {
  const navigate = useNavigate();

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

          <Button onClick={() => console.log('clicked')}>Add new</Button>
        </Box>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Assignee ID</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th textAlign="center">View Details</Table.Th>
            </Table.Tr>
          </Table.Thead>

          {tickets ? (
            <Table.Tbody>
              {tickets.map(({ id, description, assigneeId, completed }) => (
                <Table.Tr key={id}>
                  <Table.Td>{id}</Table.Td>
                  <Table.Td>{description}</Table.Td>
                  <Table.Td>{assigneeId}</Table.Td>
                  <Table.Td>{completed ? 'Completed' : 'Incomplete'}</Table.Td>
                  <Table.Td textAlign="center">
                    <ArrowRightIcon
                      size="md"
                      color={{ hover: 'primary-700' }}
                      cursor="pointer"
                      onClick={() => navigate(`/${id}`)}
                    />
                  </Table.Td>
                </Table.Tr>
              ))}
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
