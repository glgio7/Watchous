import styled from "styled-components"
import React from "react"
import { RiArrowRightSLine } from "react-icons/ri"

const HandleButton = styled.button`
display: none;

@media screen and (max-width: 900px){
    cursor: pointer;
    border: none;
    display: flex;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 9;
    min-width: 42px;
    font-size:2rem ;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    pointer-events: all;
}
`

export function NextPage({ loadMore }) {
    return (
        <>
            <HandleButton onClick={loadMore}>
                <RiArrowRightSLine/>
            </HandleButton>
        </>
    )
}