import { Route, Routes } from 'react-router-dom';

import { Box } from '@welcome-ui/box';
import { WuiProvider, createTheme } from '@welcome-ui/core';
import { CoverLetterIcon } from '@welcome-ui/icons';
import { Text } from '@welcome-ui/text';

import AddNewTicket from './add-new-ticket/add-new-ticket';
import TicketDetails from './ticket-details/ticket-details';
import Tickets from './tickets/tickets';
import UpdateTicket from './update-ticket/update-ticket';

const theme = createTheme();

const App = () => {
  // const [, setUsers] = useState([] as User[]);

  // useEffect(() => {
  //   async function fetchUsers() {
  //     const data = await fetch('/api/users').then();
  //     setUsers(await data.json());
  //   }

  //   fetchUsers();
  // }, []);

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
          <Route path="/" element={<Tickets />} />
          <Route path="/:id" element={<TicketDetails />} />
          <Route path="/add" element={<AddNewTicket />} />
          <Route path="/update/:id" element={<UpdateTicket />} />
        </Routes>
      </Box>
    </WuiProvider>
  );
};

export default App;
