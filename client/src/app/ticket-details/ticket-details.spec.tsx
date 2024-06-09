import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { WuiProvider, createTheme } from '@welcome-ui/core';

import TicketDetails from './ticket-details';

const theme = createTheme();

describe('TicketDetails', () => {
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
