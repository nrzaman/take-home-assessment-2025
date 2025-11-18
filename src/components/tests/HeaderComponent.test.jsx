import React from 'react';
import { render, screen } from '@testing-library/react';
import { useMediaQuery } from '@mui/material';
import '@testing-library/jest-dom';
import HeaderComponent from '../HeaderComponent';

// Mock useMediaQuery from Material-UI
jest.mock('@mui/material', () => {
  const actual = jest.requireActual('@mui/material');
  return {
    ...actual,
    useMediaQuery: jest.fn(),
  };
});

describe('HeaderComponent', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the main title', () => {
    useMediaQuery.mockReturnValue(false); // Desktop view
    render(<HeaderComponent />);
    const title = screen.getByText('U.S. Voter Information');
    expect(title).toBeInTheDocument();
  });

  test('renders general instructions', () => {
    useMediaQuery.mockReturnValue(false); // Desktop view

    render(<HeaderComponent />);
    const generalInstructions = screen.getByText(/The table below includes a list of voter information by state/);
    expect(generalInstructions).toBeInTheDocument();
  });

  test('renders desktop-specific instructions when not on mobile', () => {
    useMediaQuery.mockReturnValue(false); // Desktop view

    render(<HeaderComponent />);
    const desktopInstructions = screen.getByText(/please use the search filters by hovering over the "State" column/);
    expect(desktopInstructions).toBeInTheDocument();
  });

  test('does not render mobile-specific instructions when on desktop', () => {
    useMediaQuery.mockReturnValue(false); // Desktop view

    render(<HeaderComponent />);
    const mobileInstructions = screen.queryByText(/please use the search filters by clicking the 3-dot menu/);
    expect(mobileInstructions).not.toBeInTheDocument();
  });

  test('renders mobile-specific instructions when on mobile', () => {
    useMediaQuery.mockReturnValue(true); // Mobile view

    render(<HeaderComponent />);
    const mobileInstructions = screen.getByText(/please use the search filters by clicking the 3-dot menu/);
    expect(mobileInstructions).toBeInTheDocument();
  });

  test('does not render desktop-specific instructions when on mobile', () => {
    useMediaQuery.mockReturnValue(true); // Mobile view

    render(<HeaderComponent />);
    const desktopInstructions = screen.queryByText(/please use the search filters by hovering over the "State" column/);
    expect(desktopInstructions).not.toBeInTheDocument();
  });

  test('renders closing message', () => {
    useMediaQuery.mockReturnValue(false); // Desktop view

    render(<HeaderComponent />);
    const closingMessage = screen.getByText('Happy voting!');
    expect(closingMessage).toBeInTheDocument();
  });

  test('renders column width adjustment instructions', () => {
    useMediaQuery.mockReturnValue(false); // Desktop view

    render(<HeaderComponent />);
    const widthInstructions = screen.getByText(/Column widths are adjustable to view the full contents/);
    expect(widthInstructions).toBeInTheDocument();
  });

  test('calls useMediaQuery with correct breakpoint', () => {
    useMediaQuery.mockReturnValue(false);

    render(<HeaderComponent />);
    expect(useMediaQuery).toHaveBeenCalledWith('(max-width:600px)');
  });

  test('renders Typography components with correct variants', () => {
    useMediaQuery.mockReturnValue(false);

    const { container } = render(<HeaderComponent />);
    const h2Elements = container.querySelectorAll('h2');
    const subtitles = container.querySelectorAll('[class*="MuiTypography-subtitle1"]');

    // Should have one h2 (for h2 variant) and multiple subtitles
    expect(h2Elements.length).toBeGreaterThan(0);
    expect(subtitles.length).toBeGreaterThan(0);
  });
});
