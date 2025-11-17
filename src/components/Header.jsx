import { Typography, Box } from '@mui/material';
import { BrowserView, MobileView } from 'react-device-detect';

// Filtering and sorting display differently in Desktop vs. Mobile
// Relevant instructions will be displayed based on the device that the user is accessing this app.
function Header() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h2" gutterBottom>
        U.S. Voter Information
      </Typography>
      <Typography variant="subtitle1">
        The table below includes a list of voter information by state. <br></br><br></br>
      </Typography>
      <BrowserView>
      <Typography variant="subtitle1">
        In order to find your state, please feel free to use the search filters by hovering over the "State" column, clicking the 3-dot menu, clicking "Filter", and typing in your state.<br></br><br></br>
      </Typography>
      </BrowserView>
      <MobileView>
      <Typography variant="subtitle1">
        In order to find your state, please feel free to use the search filters by clicking the 3-dot menu in the "State" column, clicking "Filter", and typing in your state.<br></br><br></br>
      </Typography>
      </MobileView>
      <Typography variant="subtitle1">
        All other columns are similarly sortable and searchable.<br></br><br></br>
      </Typography>
      <Typography variant="subtitle1">
        Happy voting!
      </Typography>
    </Box>
  );
}

export default Header;