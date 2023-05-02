import React from 'react';

import styled from "styled-components";
import plus from "../images/plus.svg"

const NewCard =  styled.div`
    position : relative;
    width: 280px;
    height: 238px;
    background: rgba(229, 236, 246, 0.5);
    border-radius: 16px;
    display: flex ;
    justify-content : center
`

const Title = styled.p`
    position: absolute;
    top: 150px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 20px;
    /* identical to box height, or 91% */
    display: flex;
    align-items: center;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #9A9EAE;
`

const Plus = styled.img`
    position: absolute;
    width: 80px;
    height: 90px;
    left: calc(50% - 40px);
    right: 50%;
    top: 50px;
`


const NewWorkbookCard = () => {
    return (
        <NewCard>
            <Plus src={plus} alt="add new workbook"/>
            <Title>New Workbook</Title>   
        </NewCard>
            
        
    );
}

export default NewWorkbookCard;
