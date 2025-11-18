import { Typography, Box, useMediaQuery } from '@mui/material';
import { memo } from 'react';

// Filtering and sorting display differently on Desktop vs. Mobile
// Relevant instructions will be displayed based on the device viewport
function HeaderComponent() {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h2" gutterBottom>
        U.S. Voter Information
      </Typography>
      <Typography variant="subtitle1">
        The table below includes a list of voter information by state. Column widths are adjustable to view the full contents in a given row. If you do adjust the column sizes, please use the horizontal scrollbar (if needed) on the table to view all columns.<br></br><br></br>
      </Typography>
      {!isMobile && (
        <Typography variant="subtitle1">
          In order to find your state, please use the search filters by hovering over the "State" column, clicking the 3-dot menu, clicking "Filter", and typing in your state. All other columns are similarly sortable and searchable.<br></br><br></br>
        </Typography>
      )}
      {isMobile && (
        <Typography variant="subtitle1">
          In order to find your state, please use the search filters by clicking the 3-dot menu in the "State" column, clicking "Filter", and typing in your state. All other columns are similarly sortable and searchable.<br></br><br></br>
        </Typography>
      )}
      <Typography variant="subtitle1">
        Happy voting!
      </Typography>
    </Box>
  );
}

// Memoize to prevent unnecessary re-renders
const Header = memo(HeaderComponent);

export default Header;