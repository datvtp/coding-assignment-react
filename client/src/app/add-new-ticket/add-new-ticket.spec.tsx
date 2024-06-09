import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { WuiProvider, createTheme } from '@welcome-ui/core';

import AddNewTicket from './add-new-ticket';

const theme = createTheme();

describe('AddNewTicket', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <WuiProvider theme={theme}>
          <AddNewTicket />
        </WuiProvider>
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });

  it('renders the correct text', () => {
    render(
      <MemoryRouter>
        <WuiProvider theme={theme}>
          <AddNewTicket />
        </WuiProvider>
      </MemoryRouter>
    );
    const headingElement = screen.getByText(/^Add New Ticket$/);
    expect(headingElement).not.toBeNull();
  });

  it('renders the back button with correct text', () => {
    render(
      <MemoryRouter>
        <WuiProvider theme={theme}>
          <AddNewTicket />
        </WuiProvider>
      </MemoryRouter>
    );
    const buttonElement = screen.getByText(/^Back$/);
    expect(buttonElement).not.toBeNull();
  });

  it('renders the submit button with correct text', () => {
    render(
      <MemoryRouter>
        <WuiProvider theme={theme}>
          <AddNewTicket />
        </WuiProvider>
      </MemoryRouter>
    );
    const buttonElement = screen.getByText(/^Submit$/);
    expect(buttonElement).not.toBeNull();
  });
});
