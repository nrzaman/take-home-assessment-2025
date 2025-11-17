import { useEffect, useState, useMemo, memo } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useMediaQuery } from '@mui/material';
import configData from '../config/local_api.json';

// Local API endpoint to retrieve voter information data
const LOCAL_API = 'http://' + configData['serverHost'] + ':' + configData['serverPort'] + '/data';

// Desktop columns - all visible
const desktopColumns = [
  { field: 'state', headerName: 'State', width: 130, flex: 0.5 },
  { field: 'deadlineInPerson', headerName: 'Registration Deadline In-Person', width: 200, flex: 1 },
  { field: 'deadlineByMail', headerName: 'Registration Deadline By Mail', width: 200, flex: 1 },
  { field: 'deadlineOnline', headerName: 'Registration Deadline Online', width: 200, flex: 1 },
  { field: 'electionDayRegistration', headerName: 'Election Day Registration', width: 200, flex: 1 },
  { field: 'onlineRegistrationLink', headerName: 'Online Registration Link', width: 500, flex: 1.5 },
  { field: 'description', headerName: 'Description', width: 400, flex: 1 },
];

// Mobile columns - reduced for better performance
const mobileColumns = [
  { field: 'state', headerName: 'State', width: 100, flex: 0.8 },
  { field: 'deadlineOnline', headerName: 'Registration Deadline Online', width: 200, flex: 1 },
  { field: 'onlineRegistrationLink', headerName: 'Register', width: 130, flex: 1 },
];

const paginationModel = { page: 0, pageSize: 5 };

// Custom properties for DataGrid table
const memoizedSx = {
  border: 2,
  '& .MuiDataGrid-cell:hover': {
    color: '#2c74ff',
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 900,
    color: '#262d7d'
  }
};

function VoterRegistrationTableComponent() {
    const [tableData, setTableData] = useState([]);
    const isMobile = useMediaQuery('(max-width:600px)');

    // Memoize columns based on device type
    const columns = useMemo(() => isMobile ? mobileColumns : desktopColumns, [isMobile]);

    useEffect(() => {
        fetch(LOCAL_API)
        .then((data) => data.json())
        .then((data) => {
            setTableData(data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        })
    }, [])

  return (
    <Paper sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        getRowId={(row) => row.state}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        sx={memoizedSx}
        disableSelectionOnClick
        slotProps={{
          baseButton: {
            size: 'small',
          },
        }}
        density="compact"
        hideFooterSelectedRowCount
        disableVirtualization={false}
        rowBuffer={10}
        columnBuffer={2}
      />
    </Paper>
  );
}

// Memoize the component to prevent unnecessary re-renders
const VoterRegistrationTable = memo(VoterRegistrationTableComponent);

export default VoterRegistrationTable;