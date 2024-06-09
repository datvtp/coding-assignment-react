import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { WuiProvider, createTheme } from '@welcome-ui/core';
import fetchMock from 'jest-fetch-mock';

import TicketDetails from './ticket-details';

const theme = createTheme();

describe('TicketDetails', () => {
  fetchMock.mockResponseOnce(
    JSON.stringify({
      id: 1,
      description: 'Install a monitor arm',
      assigneeId: 1,
      completed: false,
    })
  );

  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <WuiProvider theme={theme}>
          <TicketDetails />
        </WuiProvider>
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
