import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock the lazy-loaded components to avoid loading issues in tests
jest.mock('./components/HeaderComponent', () => {
  return function MockHeaderComponent() {
    return <div data-testid="header-component">Header Component</div>;
  };
});

jest.mock('./components/VoterRegistrationTableComponent', () => {
  return function MockTableComponent() {
    return <div data-testid="table-component">Table Component</div>;
  };
});

describe('App Component', () => {
  test('renders without crashing', async () => {
    render(<App />);
    // Give Suspense time to resolve
    await waitFor(() => {
      expect(screen.queryByTestId('header-component')).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('renders HeaderComponent within Suspense', async () => {
    render(<App />);
    const header = await waitFor(() => screen.getByTestId('header-component'), { timeout: 3000 });
    expect(header).toBeInTheDocument();
  });

  test('renders VoterRegistrationTableComponent within Suspense', async () => {
    render(<App />);
    const table = await waitFor(() => screen.getByTestId('table-component'), { timeout: 3000 });
    expect(table).toBeInTheDocument();
  });

  test('renders ThemeProvider wrapper', async () => {
    const { container } = render(<App />);
    await waitFor(() => {
      expect(container.firstChild).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('renders main element', async () => {
    const { container } = render(<App />);
    const mainElement = await waitFor(() => container.querySelector('main'), { timeout: 3000 });
    expect(mainElement).toBeInTheDocument();
  });

  test('has both HeaderComponent and TableComponent in the same render', async () => {
    render(<App />);

    const header = await waitFor(() => screen.getByTestId('header-component'), { timeout: 3000 });
    const table = await waitFor(() => screen.getByTestId('table-component'), { timeout: 3000 });

    expect(header).toBeInTheDocument();
    expect(table).toBeInTheDocument();
  });
});
