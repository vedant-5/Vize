import { Box, Grid, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';
import React from "react";
import IndividualChart from "./IndividualChart";

function Dashboard ({chartType}) {
    
    const Item = styled(Paper)(({ theme }) => ({
        // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        // ...theme.typography.body2,
        padding: '10px',
        textAlign: 'center',
        boxShadow: 'none',
        // color: theme.palette.text.secondary,
    }));

    return(
        <Box width="75vw">
            <Grid container spacing={2}>
                {chartType.map((type) => (
                <Grid xs={6}>
                    <Item>
                        <IndividualChart type={type} />
                        <div>{type}</div>
                    </Item>
                </Grid>
                ))}
                
                {/* <Grid xs={6} padding="10px">
                    <IndividualChart />
                </Grid>
                <Grid xs={6} padding="10px">
                    <IndividualChart />
                </Grid>
                <Grid xs={6} padding="10px">
                    <IndividualChart />
                </Grid> */}
            </Grid>
        </Box>
    )
}

export default Dashboard;