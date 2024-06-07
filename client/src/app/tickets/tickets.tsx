import { Box } from '@welcome-ui/box';
import { Table } from '@welcome-ui/table';
import { Text } from '@welcome-ui/text';

import { Ticket } from '@acme/shared-models';
import { Button } from '@welcome-ui/button';

export interface TicketsProps {
  tickets: Ticket[];
}

export function Tickets(props: TicketsProps) {
  return (
    <Box
      w={1}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        spaceX="md"
      >
        <Text variant="h2" color="primary-700">
          Tickets
        </Text>

        <Button>Add new</Button>
      </Box>
      <Table maxW={960}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Assignee ID</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>

        {props.tickets ? (
          <Table.Tbody>
            {props.tickets.map(({ id, description, assigneeId, completed }) => (
              <Table.Tr key={id}>
                <Table.Td>{id}</Table.Td>
                <Table.Td>{description}</Table.Td>
                <Table.Td>{assigneeId}</Table.Td>
                <Table.Td>{completed ? 'Completed' : 'Incomplete'}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        ) : (
          <Text>...</Text>
        )}
      </Table>
    </Box>
  );
}

export default Tickets;
