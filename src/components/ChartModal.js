import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ColumnModal from "./ColumnModal";
// import Bar from "../images/bar-chart.png";
// import Line from "../images/line-chart.png";
// import Pie from "../images/pie-chart.png";
// import Doughnut from "../images/doughnut-chart.png";

function ChartModal ({chartModalOpen, setChartModalOpen}) {

    const [columnModalOpen, setColumnModalOpen] = useState(false);
    const [chartSelected, setChartSelected] = useState();

    const handleClose = () => {
        setChartModalOpen(false);
        setChartSelected();
    }

    const handleColumnModal = () => {
        setChartModalOpen(false);
        setColumnModalOpen(true);
    }

    const handleSelectChart = (chart) => {
        setChartSelected(chartTypeList[chart])
        console.log(chart, chartTypeList[chart]);
    }

    const chartTypeList = ['Bar', 'Pie', 'Line', 'Doughnut']

    return(
        <>
            <Dialog onClose={handleClose} open={chartModalOpen} sx={{overflowY: "hidden"}}>
                <DialogTitle sx={{fontWeight: "600"}}>Select type of chart</DialogTitle>
                <DialogContent sx={{marginTop: "16px"}}>
                    <Grid container spacing={2}>
                        {chartTypeList.map((type, index) => (
                            <Grid item xs={3} key={index} id={index} onClick={(e)=>{handleSelectChart(e.currentTarget.id)}}>
                                <div>
                                    <img src={require(`../images/${type}.png`)} alt={`${type} chart`} />
                                    <Typography>{type} Chart</Typography>
                                </div>
                            </Grid>
                        ))}
                    </Grid> 
                </DialogContent>
                {chartSelected && <DialogActions sx={{padding: "12px"}}>
                    <Button onClick={handleColumnModal} sx={{color: '#1c1c1c', fontWeight: '600', letterSpacing: '1px'}}>
                        Next
                        <ArrowForwardIosIcon sx={{fontSize: "0.8em", marginLeft: "5px"}}/>
                    </Button>
                </DialogActions>}
            </Dialog>
            <ColumnModal columnModalOpen={columnModalOpen} setColumnModalOpen={setColumnModalOpen} chartSelected={chartSelected} />
        </>
    )
}

export default ChartModal;