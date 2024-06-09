import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { WuiProvider, createTheme } from '@welcome-ui/core';
import fetchMock from 'jest-fetch-mock';

import Tickets from './tickets';

const theme = createTheme();

describe('Tickets', () => {
  fetchMock.mockResponseOnce(
    JSON.stringify([
      {
        id: 1,
        description: 'Install a monitor arm',
        assigneeId: 1,
        completed: false,
      },
      {
        id: 2,
        description: 'Move the desk to the new location',
        assigneeId: 1,
        completed: false,
      },
    ])
  );

  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <WuiProvider theme={theme}>
          <Tickets />
        </WuiProvider>
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });

  fetchMock.mockResponseOnce(
    JSON.stringify([
      {
        id: 1,
        description: 'Install a monitor arm',
        assigneeId: 1,
        completed: false,
      },
      {
        id: 2,
        description: 'Move the desk to the new location',
        assigneeId: 1,
        completed: false,
      },
    ])
  );

  it('renders the correct text', () => {
    render(
      <MemoryRouter>
        <WuiProvider theme={theme}>
          <Tickets />
        </WuiProvider>
      </MemoryRouter>
    );
    const headingElement = screen.getByText(/^Tickets$/);
    expect(headingElement).not.toBeNull();
  });
});
