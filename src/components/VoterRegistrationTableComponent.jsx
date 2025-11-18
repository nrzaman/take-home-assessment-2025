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
  { field: 'onlineRegistrationLink', headerName: 'Online Registration Link', width: 500, flex: 1.5, renderCell: (params) =>  
    // eslint-disable-next-line no-template-curly-in-string 
      <a href='${params.row.onlineRegistrationLink}'>{params.row.onlineRegistrationLink}</a> },
  { field: 'description', headerName: 'Description', width: 400, flex: 1 },
];

// Mobile columns - reduced for better performance
const mobileColumns = [
  { field: 'state', headerName: 'State', width: 100, flex: 0.8 },
  { field: 'deadlineOnline', headerName: 'Registration Deadline Online', width: 200, flex: 1 },
  { field: 'onlineRegistrationLink', headerName: 'Register', width: 130, flex: 1, renderCell: (params) =>  
    // eslint-disable-next-line no-template-curly-in-string
      <a href='${params.row.onlineRegistrationLink}'>{params.row.onlineRegistrationLink}</a> },
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
        let isMounted = true;

        fetch(LOCAL_API)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            if (isMounted) {
                setTableData(data);
            }
        })
        .catch((error) => {
            if (isMounted) {
                console.error('Error fetching data:', error);
                setTableData([]);
            }
        });

        // Cleanup: prevent state update on unmounted component
        return () => {
            isMounted = false;
        };
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