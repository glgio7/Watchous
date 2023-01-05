import styled from "styled-components"
import React from "react"
import { RiArrowLeftSLine } from "react-icons/ri"

const HandleButton = styled.button`
display: none;

@media screen and (max-width: 900px){
    cursor: pointer;
    position: absolute;
    pointer-events: all;
    top: 0;
    left: 0;
    bottom: 0;
    border: none;
    display: flex;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 9;
    min-width: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:2rem ;
    color: #fff;
}
`

export function PreviousPage ({ backPage }) {
    return (
        <>
        <HandleButton onClick={backPage}>
        <RiArrowLeftSLine/>
        </HandleButton>
        </>
    )
}