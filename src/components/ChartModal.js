import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ColumnModal from "./ColumnModal";

function ChartModal ({chartModalOpen, setChartModalOpen}) {

    const [columnModalOpen, setColumnModalOpen] = useState(false);

    const handleClose = () => {
        setChartModalOpen(false);
    }

    const handleColumnModal = () => {
        setChartModalOpen(false);
        setColumnModalOpen(true);
    }

    const chartTypeList = ['Bar', 'Pie', 'Line']

    return(
        <>
            <Dialog onClose={handleClose} open={chartModalOpen} sx={{overflowY: "hidden"}}>
                <DialogTitle sx={{fontWeight: "600"}}>Select type of chart</DialogTitle>
                <DialogContent sx={{marginTop: "16px"}}>
                    <Grid container spacing={2}>
                        {chartTypeList.map((type, index) => (
                            <Grid item key={index}>
                                {/* <img /> */}
                                <Typography>{type} Chart</Typography>
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions sx={{padding: "12px"}}>
                    <Button onClick={handleColumnModal} sx={{color: '#1c1c1c', fontWeight: '600', letterSpacing: '1px'}}>
                        Next
                        <ArrowForwardIosIcon sx={{fontSize: "0.8em", marginLeft: "5px"}}/>
                    </Button>
                </DialogActions>
            </Dialog>
            <ColumnModal columnModalOpen={columnModalOpen} setColumnModalOpen={setColumnModalOpen}/>
        </>
    )
}

export default ChartModal;