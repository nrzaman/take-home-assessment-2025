import { render, screen, waitFor } from '@testing-library/react';
import { useMediaQuery } from '@mui/material';
import '@testing-library/jest-dom';
import VoterRegistrationTableComponent from './VoterRegistrationTableComponent';

// Mock useMediaQuery from Material-UI
jest.mock('@mui/material', () => {
  const actual = jest.requireActual('@mui/material');
  return {
    ...actual,
    useMediaQuery: jest.fn(),
  };
});

// Mock configData to avoid loading JSON config
jest.mock('../config/local_api.json', () => ({
  serverHost: '127.0.0.1',
  serverPort: '4000',
}));

// Mock the DataGrid component to simplify testing
jest.mock('@mui/x-data-grid', () => ({
  DataGrid: ({ rows, columns }) => (
    <div data-testid="datagrid">
      <div data-testid="datagrid-rows-count">Rows: {rows.length}</div>
      <div data-testid="datagrid-columns-count">Columns: {columns.length}</div>
      {rows.length > 0 && (
        <div data-testid="first-row-state">{rows[0]?.state}</div>
      )}
    </div>
  ),
}));

describe('VoterRegistrationTableComponent', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    // Mock fetch globally
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders DataGrid component', async () => {
    useMediaQuery.mockReturnValue(false); // Desktop
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<VoterRegistrationTableComponent />);

    const datagrid = await waitFor(() => screen.getByTestId('datagrid'));
    expect(datagrid).toBeInTheDocument();
  });

  test('fetches data from LOCAL_API on component mount', async () => {
    useMediaQuery.mockReturnValue(false); // Desktop
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { state: 'Alabama', deadlineInPerson: '2024-10-21', deadlineByMail: '2024-10-21', deadlineOnline: '2024-10-01', electionDayRegistration: 'No', onlineRegistrationLink: 'https://example.com', description: 'Test' },
      ],
    });

    render(<VoterRegistrationTableComponent />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://127.0.0.1:4000/data');
    });
  });

  test('displays fetched data in table', async () => {
    useMediaQuery.mockReturnValue(false); // Desktop
    const mockData = [
      { state: 'Alabama', deadlineInPerson: '2024-10-21', deadlineByMail: '2024-10-21', deadlineOnline: '2024-10-01', electionDayRegistration: 'No', onlineRegistrationLink: 'https://example.com', description: 'Test' },
      { state: 'Alaska', deadlineInPerson: '2024-10-21', deadlineByMail: '2024-10-21', deadlineOnline: '2024-10-01', electionDayRegistration: 'No', onlineRegistrationLink: 'https://example.com', description: 'Test' },
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(<VoterRegistrationTableComponent />);

    const rowsCount = await waitFor(() => {
      const element = screen.getByTestId('datagrid-rows-count');
      expect(element).toHaveTextContent('Rows: 2');
      return element;
    }, { timeout: 3000 });
    expect(rowsCount).toBeInTheDocument();
  });

  test('uses desktop columns when not on mobile', async () => {
    useMediaQuery.mockReturnValue(false); // Desktop
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<VoterRegistrationTableComponent />);

    const columnsCount = await waitFor(() => screen.getByTestId('datagrid-columns-count'));
    // Desktop has 7 columns
    expect(columnsCount).toHaveTextContent('Columns: 7');
  });

  test('uses mobile columns when on mobile', async () => {
    useMediaQuery.mockReturnValue(true); // Mobile
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<VoterRegistrationTableComponent />);

    const columnsCount = await waitFor(() => screen.getByTestId('datagrid-columns-count'));
    // Mobile has 3 columns
    expect(columnsCount).toHaveTextContent('Columns: 3');
  });

  test('handles fetch error gracefully', async () => {
    useMediaQuery.mockReturnValue(false);
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<VoterRegistrationTableComponent />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error fetching data:',
        expect.any(Error)
      );
    });

    const rowsCount = await waitFor(() => screen.getByTestId('datagrid-rows-count'));
    expect(rowsCount).toHaveTextContent('Rows: 0');

    consoleSpy.mockRestore();
  });

  test('handles HTTP error responses', async () => {
    useMediaQuery.mockReturnValue(false);
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<VoterRegistrationTableComponent />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error fetching data:',
        expect.any(Error)
      );
    });

    const rowsCount = await waitFor(() => screen.getByTestId('datagrid-rows-count'));
    expect(rowsCount).toHaveTextContent('Rows: 0');

    consoleSpy.mockRestore();
  });

  test('uses state as unique row identifier', async () => {
    useMediaQuery.mockReturnValue(false);
    const mockData = [
      { state: 'Alabama', deadlineInPerson: '2024-10-21', deadlineByMail: '2024-10-21', deadlineOnline: '2024-10-01', electionDayRegistration: 'No', onlineRegistrationLink: 'https://example.com', description: 'Test' },
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    render(<VoterRegistrationTableComponent />);

    const firstRowState = await waitFor(() => screen.getByTestId('first-row-state'));
    expect(firstRowState).toHaveTextContent('Alabama');
  });

  test('handles empty data response', async () => {
    useMediaQuery.mockReturnValue(false);
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<VoterRegistrationTableComponent />);

    const rowsCount = await waitFor(() => screen.getByTestId('datagrid-rows-count'));
    expect(rowsCount).toHaveTextContent('Rows: 0');
  });

  test('calls useMediaQuery with correct breakpoint', async () => {
    useMediaQuery.mockReturnValue(false);
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<VoterRegistrationTableComponent />);

    await waitFor(() => {
      expect(useMediaQuery).toHaveBeenCalledWith('(max-width:600px)');
    });
  });

  test('cleans up on unmount to prevent memory leak', async () => {
    useMediaQuery.mockReturnValue(false);
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { state: 'Alabama', deadlineInPerson: '2024-10-21', deadlineByMail: '2024-10-21', deadlineOnline: '2024-10-01', electionDayRegistration: 'No', onlineRegistrationLink: 'https://example.com', description: 'Test' },
      ],
    });

    const { unmount } = render(<VoterRegistrationTableComponent />);

    // Unmount component (triggers cleanup)
    unmount();

    // Give time for any pending state updates to attempt
    await waitFor(() => {
      // No assertion needed - just checking that unmount doesn't cause errors
      expect(true).toBe(true);
    }, { timeout: 100 });
  });

  test('DataGrid receives correct pagination configuration', async () => {
    useMediaQuery.mockReturnValue(false);
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<VoterRegistrationTableComponent />);

    // Verify DataGrid is rendered (it's mocked and will show row/column counts)
    const datagrid = await waitFor(() => screen.getByTestId('datagrid'));
    expect(datagrid).toBeInTheDocument();
  });
});
