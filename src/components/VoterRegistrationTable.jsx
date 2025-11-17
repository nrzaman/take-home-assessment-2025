import { useEffect, useState } from "react"
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

// Local API endpoint to retrieve voter information data
const LOCAL_API = 'http://127.0.0.1:5000/data';

const columns = [
  { field: 'state', headerName: 'State', width: 130 },
  { field: 'deadlineInPerson', headerName: 'Registration Deadline In-Person', width: 200 },
  { field: 'deadlineByMail', headerName: 'Registration Deadline By Mail', width: 200 },
  { field: 'deadlineOnline', headerName: 'Registration Deadline Online', width: 200 },
  { field: 'electionDayRegistration', headerName: 'Election Day Registration', width: 200 },
  { field: 'onlineRegistrationLink', headerName: 'Online Registration Link', width: 500 },
  { field: 'description', headerName: 'Description', width: 400 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function VoterRegistrationTable() {  
    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        setLoading(true)
        fetch(LOCAL_API)
        .then((data) => data.json())
        .then((data) => {
            setTableData(data);
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])

  return (
    <Paper sx={{ height: 600, width: '100%' }}>
      <DataGrid 
        rows={tableData}
        columns={columns}
        getRowId={(row) => row.state}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 25, 51]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}