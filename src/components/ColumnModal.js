import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

function ColumnModal ({columnModalOpen, setColumnModalOpen, chartSelected}) {

    const handleClose = () => {
        setColumnModalOpen(false);
        setChecked([])
    }

    const [checked, setChecked] = useState([]);

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

    const columnNames = ['col one', 'col two', 'col three'];

    const createChartAPI = () => {
        //API call to create chart
            // chart type you will get from "chartSelected" state
            // column names you will get as an array from "checked" state 

        console.log(chartSelected);
        console.log(checked);
    }
    

    return(
        <Dialog onClose={handleClose} open={columnModalOpen} sx={{overflowY: "hidden"}}>
            <DialogTitle sx={{fontWeight: "600"}}>Select 2 columns names</DialogTitle>
            <DialogContent sx={{marginTop: "16px"}}>
                <List sx={{ width: '100%', maxWidth: 360 }}>
                    {columnNames.map((value, index) => {
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
                    })}
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