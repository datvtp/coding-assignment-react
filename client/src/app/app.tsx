import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Box } from '@welcome-ui/box';
import { WuiProvider, createTheme } from '@welcome-ui/core';
import { CoverLetterIcon } from '@welcome-ui/icons';
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
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          spaceX="md"
        >
          <CoverLetterIcon size="xl" color="primary-700" />
          <Text variant="h1" color="primary-700">
            Ticketing App
          </Text>
        </Box>
        <Routes>
          <Route path="/" element={<Tickets tickets={tickets} />} />
          <Route path="/:id" element={<TicketDetails />} />
        </Routes>
      </Box>
    </WuiProvider>
  );
};

export default App;
