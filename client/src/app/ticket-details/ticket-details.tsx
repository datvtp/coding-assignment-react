import { useParams } from 'react-router-dom';

import { x } from '@xstyled/styled-components';

export function TicketDetails() {
  const { id } = useParams();

  return (
    <x.div>
      <x.h1>Welcome to Ticket: {id}</x.h1>
    </x.div>
  );
}

export default TicketDetails;
