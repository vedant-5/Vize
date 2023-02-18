import React from 'react';
import Button from '@mui/material/Button';

import styled from "styled-components";

import ChartImage from "../images/ImageGraph.png";
import editIcon from "../images/PencilSimple.svg";
import trash from "../images/Trash.svg";
import { Grid } from '@mui/material';

const WorkCard =  styled.div`
    position : relative;
    width: 280px;
    height: 238px;
    background: rgba(229, 236, 246, 0.5);
    border-radius: 16px;
    display : flex;
`

const GraphImage = styled.img`
    position: absolute;
    width: 280px;
    height: 170px;
    left: 0px;
    top: 0px;
    border-radius: 16px 16px 0 0;
`

const Title = styled.p`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 8px;
    position: absolute;
    width: 158px;
    height: 20px;
    left: 20px;
    top: 165px;
    color: #1C1C1C;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 20px;
`

const Created = styled.p`
    position: absolute;
    width: 130px;
    height: 20px;
    left: 20px;
    top: 196px;
    font-family: 'Inter';
    font-style: italic;
    font-weight: 400;
    font-size: 13px;
    line-height: 22px;
    /* identical to box height, or 143% */
    display: flex;
    align-items: center;
    /* Black/40% */
    color: rgba(0, 0, 0, 0.4);
`

const ActionIcons = styled.div`
    position: absolute;
    width: 46px;
    height: 18px;
    right: 16px;
    top: 184px;
`

const EditImage = styled.img`
    // position: relative;
    // left: 80.32%;
    // right: 13.97%;
    // top: 79.29%;
    // bottom: 14.29%;
`

const TrashImage = styled.img`
    // position: absolute;
    // left: 89.21%;
    // right: 5.08%;
    // top: 79.29%;
    // bottom: 14.29%;
`

const WorkbookCard = ({cardTitle, createdOn}) => {
    return (
        <div>
            <WorkCard>
                <GraphImage src={ChartImage} alt = "dashboard preview"/>
                <Title> 
                    {cardTitle}
                </Title>
                <Created>
                    Created on {createdOn}
                </Created>
                <ActionIcons>
                    <Grid 
                        container
                        columnSpacing={1} 
                        direction="row"
                        justifyContent="left"
                        alignItems="flex-start">
                        <Grid item>
                            <EditImage src={editIcon} alt = "edit icon"/>
                        </Grid>
                        <Grid item>
                            <TrashImage src={trash} alt = "trash"/>
                        </Grid>
                    </Grid>
                </ActionIcons>
            </WorkCard>
        </div>
    );
}

export default WorkbookCard;

