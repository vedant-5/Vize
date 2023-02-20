import { Box, Paper } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import React, { useState, useEffect } from "react";
import IndividualChart from "./IndividualChart";
import { useParams } from "react-router-dom";

function Dashboard ({match}) {
    
    const chartType = ['pie', 'bar', 'line', 'scatter'];
    const [dashboard, setDashboard] =  useState([])

    const { id } = useParams();
    console.log(id)

    useEffect(() => {
        fetchDashboards();
      }, [id]);

    const fetchDashboards = async () => {
        const response = await fetch(
          `http://127.0.0.1:8000/dashboard/${id}`
        );
        const data = await response.json();
        setDashboard(data.response[0]);
        console.log(data.response[0].name)
      };
    
    
    // const Item = styled(Paper)(({ theme }) => ({
    //     // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    //     // ...theme.typography.body2,
    //     // padding: '10px',
    //     textAlign: 'center',
    //     boxShadow: 'none',
    //     // color: theme.palette.text.secondary,
    // }));

    return(
        <Box>
            {/* <Grid container spacing={2}> */}
              {/* {chartType.map((type) => ( */}
               {/* <Grid xs={6}> */}
                    {/* <Item> */}
                        {/* <IndividualChart /> */}
                    {/* </Item> */}
                {/* </Grid> */}
               {/* ))} */}
            {/* </Grid> */}
            <h3>{dashboard?.name}</h3>
            <p>{dashboard?.text}</p>
            <p>Some early treatises—such as those of Cicero on the pleasantness of old age or on the art of “divination,” Seneca on anger or clemency, and Plutarch on the passing of oracles—presage to a certain degree the form and tone of the essay, but not until the late 16th century was the flexible and deliberately nonchalant and versatile form of the essay perfected by the French writer Michel de Montaigne. Choosing the name essai to emphasize that his compositions were attempts or endeavours, a groping toward the expression of his personal thoughts and experiences, Montaigne used the essay as a means of self-discovery. His Essais, published in their final form in 1588, are still considered among the finest of their kind. Later writers who most nearly recall the charm of Montaigne include, in England, Robert Burton, though his whimsicality is more erudite, Sir Thomas Browne, and Laurence Sterne, and in France, with more self-consciousness and pose, André Gide and Jean Cocteau.</p>
            <p></p>
        </Box>
    )
}

export default Dashboard;