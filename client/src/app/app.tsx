import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Box } from '@welcome-ui/box';
import { WuiProvider, createTheme } from '@welcome-ui/core';
import { Text } from '@welcome-ui/text';

import { Ticket, User } from '@acme/shared-models';

import TicketDetails from './ticket-details/ticket-details';
import Tickets from './tickets/tickets';

const theme = createTheme();

const App = () => {
  const [tickets, setTickets] = useState([] as Ticket[]);
  const [, setUsers] = useState([] as User[]);

  useEffect(() => {
    async function fetchTickets() {
      const data = await fetch('/api/tickets').then();
      setTickets(await data.json());
    }

    async function fetchUsers() {
      const data = await fetch('/api/users').then();
      setUsers(await data.json());
    }

    fetchTickets();
    fetchUsers();
  }, []);

  return (
    <WuiProvider theme={theme}>
      <Box p="md">
        <Text variant="h1" color="primary-700">
          Ticketing App
        </Text>
        <Routes>
          <Route path="/" element={<Tickets tickets={tickets} />} />
          <Route path="/:id" element={<TicketDetails />} />
        </Routes>
      </Box>
    </WuiProvider>
  );
};

export default App;
