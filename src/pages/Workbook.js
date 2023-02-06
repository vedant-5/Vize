import React from 'react';

import Box from '@mui/material/Box';

import TopbarHome from '../components/TopbarHome';


const Top = TopbarHome


const Workbook = () => {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Top/>
            </Box>
        </>
        
    );
}

export default Workbook;

