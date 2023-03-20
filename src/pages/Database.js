import React from "react";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataContacts } from "../data/mockData";
// import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

function Database() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  console.log(location.pathname.split("/"))
  const currentID = location.pathname.split("/")[4];

  const [chartData, setChartData] =  useState([])
  const [columnNames, setColumnNames] = useState([]);

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const getChart = async () => {
    const response = await fetch( 
      `http://127.0.0.1:8000/view-file/${currentID}`
    );
    const data = await response.json();
    setChartData(data)
    const key_names = [];
    data.forEach((dictionary) => {
      // Loop over each key in the dictionary
      Object.keys(dictionary).forEach((key) => {
        // Add the key to the array if it's not already present
        if (!key_names.includes(key)) {
          key_names.push(key);
        }
      });
    })
    setColumnNames(key_names);
    return data
  };

  useEffect(() => {
    getChart()
  }, []);


  useEffect(()=>{
    console.log(columnNames)
  },[columnNames])


  const columns = columnNames.map((item) => {
    return { field: item, headerName: capitalizeFirstLetter(item),  flex: 1 };
  });

  console.log(columns)


  const columns2 = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
      flex: 1,
    },
  ];

  return (
    <Box>
      {chartData.length !== 0 ?
      
      
      <Box
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          // "& .name-column--cell": {
          //   color: colors.greenAccent[300],
          // },
          "& .css-1jbbcbn-MuiDataGrid-columnHeaderTitle": {
            fontWeight: "600",
            // color: colors.sidebardark,
          },
          // "& .MuiDataGrid-virtualScroller": {
          //   backgroundColor: colors.sidebarlight,
          // },
          // "& .MuiDataGrid-footerContainer": {
          //   borderTop: "none",
          //   backgroundColor: colors.sidebardark,
          // },
          // "& .MuiCheckbox-root": {
          //   color: `${colors.greenAccent[200]} !important`,
          // },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.greytext} !important`,
          },
        }}
      >
        <DataGrid
          rows={chartData}
          columns={columns}
          components={{ Toolbar: GridToolbar }} 
        /> 
      </Box>
      : <CircularProgress color="inherit" /> }
    </Box>
  );
};

export default Database;