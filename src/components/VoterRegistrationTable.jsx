import { useEffect, useState } from "react"
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import configData from '../config/local_api.json'
import dataColumns from '../config/frontend_columns.json'

// Local API endpoint to retrieve voter information data
const LOCAL_API = 'http://' + configData['serverHost'] + ':' + configData['serverPort'] + '/data';

const columns = [
  { field: dataColumns["State"], headerName: 'State', width: 130 },
  { field: dataColumns["DeadlineInPerson"], headerName: 'Registration Deadline In-Person', width: 200 },
  { field: dataColumns["DeadlineByMail"], headerName: 'Registration Deadline By Mail', width: 200 },
  { field: dataColumns["DeadlineOnline"], headerName: 'Registration Deadline Online', width: 200 },
  { field: dataColumns["DeadlElectionDayRegistrationneInPerson"], headerName: 'Election Day Registration', width: 200 },
  { field: dataColumns["OnlineRegistrationLink"], headerName: 'Online Registration Link', width: 500 },
  { field: dataColumns["Description"], headerName: 'Description', width: 400 },
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
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid 
        rows={tableData}
        columns={columns}
        getRowId={(row) => row.state}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 25, 51]}
        sx={{ border: 1 }}
      />
    </Paper>
  );
}