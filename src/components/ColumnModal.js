import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function ColumnModal ({columnModalOpen, setColumnModalOpen, chartSelected}) {

    const handleClose = () => {
        setColumnModalOpen(false);
        setChecked([])
    }

    const {did} = useParams()
    const {wid} = useParams()
    

    const [checked, setChecked] = useState([]);
    const [dashboardID, setDashboardID] = useState(did)
    const [workspaceID, setWorkspaceID] = useState(wid)
    const [columnNames, setColumnNames] = useState([])
    const [workspaceData, setWorkspaceData] = useState({})
    const [dashboardData, setDashboardData] =  useState({})


    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
        newChecked.push(value);
        } else {
        newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };


    const getDashboard = async () => {
        //console.log(id)
        const response = await fetch( 
          `http://127.0.0.1:8000/dashboard/${did}/`
        );
        const data = await response.json()
        setDashboardData(data.response[0])
        //const workspace_id = data.response[0].workspace_name.workspace
        const workspace_data =  data.response[0].workspace_name
        getcolumnNames(workspaceData.database)
        setWorkspaceData(workspace_data)
        //console.log(workspace_data, data.response[0])
        return data.response
      }

      const getcolumnNames = async (id)=>{
        const response = await fetch( 
            `http://127.0.0.1:8000/view-file/${id}`
          );
          const data = await response.json();
          const columns =  Object.keys(data[0])
          setColumnNames(columns)
    }

    const createChartAPI = () => {
        console.log(chartSelected);
        console.log(checked);
        if (chartSelected && checked){
            const data = {
                "title": checked[0] + " and " + checked[1],
                "x_axis": checked[0],
                "y_axis": checked[1],
                "chart_type": chartSelected.toLowerCase(),
                "options": "Legend, title, color",
                "summary": null,
                "workspace_name": workspaceID,
                "dashboard_name": dashboardID,
            }
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            };
            fetch('http://127.0.0.1:8000/chart/', requestOptions)
                .then(function (response) {
                // ...
                return response.json();
                }).then(function (body) {
                // ...
                const dashboard_data =  {...dashboardData, "charts":dashboardData.charts + `,${body.chart_id}`}
                const workspace_data = {...workspaceData, "charts":workspaceData.charts + `,${body.chart_id}`}
                updateDashboard(dashboard_data)
                updateWorkspace(workspace_data)
                console.log(body);
                window.location.reload()
                }).catch(err => {
                    console.log(err)
                })
            }
        }

        const updateDashboard =  async (dashboard_data) => {
            console.log(dashboard_data)
            const data = dashboard_data
            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(dashboard_data),
          };
          fetch(`http://127.0.0.1:8000/dashboard/${dashboardID}/`, requestOptions)
              .then(function (response) {
                // ...
                console.log(response);
                return response.json();
              }).then(function (body) {
                // ...
                console.log(body);
              }).catch(err => {
                  console.log(err)
              })
          }
    
          const updateWorkspace =  async (data) => {
            console.log(data)
            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data),
          };
          fetch(`http://127.0.0.1:8000/workspace/${workspaceID}/`, requestOptions)
              .then(function (response) {
                // ...
                console.log(response);
                return response.json();
              }).then(function (body) {
                // ...
                console.log(body);
              }).catch(err => {
                  console.log(err)
              })
          }

    useEffect(()=>{
        //getcolumnNames()
        getDashboard()
    },[chartSelected])

    useEffect(()=>{
        console.log(checked)
    }, [checked])
    

    return(
        <Dialog onClose={handleClose} open={columnModalOpen} sx={{overflowY: "hidden"}}>
            <DialogTitle sx={{fontWeight: "600"}}>Select 2 columns names</DialogTitle>
            <DialogContent sx={{marginTop: "16px"}}>
                <List sx={{ width: '100%', maxWidth: 360 }}>
                    {columnNames.length >  0 ? columnNames.map((value, index) => {
                        const labelId = `checkbox-list-label-${index}`;
                        return (
                        <ListItem
                            key={index}
                            disablePadding
                        >
                            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                <ListItemIcon sx={{minWidth: "0"}}>
                                    <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={value} />
                            </ListItemButton>
                        </ListItem>
                        );
                    }):<p>Columns Loading....</p>}
                </List>
            </DialogContent>
            {checked.length === 2 && <DialogActions sx={{padding: "12px"}}>
                <Button onClick={createChartAPI} sx={{color: '#1c1c1c', fontWeight: '600', letterSpacing: '1px'}}>
                    Create chart
                    <ArrowForwardIosIcon sx={{fontSize: "0.8em", marginLeft: "5px"}}/>
                </Button>
            </DialogActions>}
        </Dialog>
    )
}

export default ColumnModal;