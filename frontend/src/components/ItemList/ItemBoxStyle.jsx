import styled from "styled-components"

const ItemBox = styled.div`
    border:1px solid ${(props) => (props.theme.colorPalette.lightGray)};
    border-radius: ${(props) => (props.theme.radius.sm)};
    display:grid;
    grid-template-columns: 0.8fr 4.2fr;
    padding:10px;
    cursor:pointer;
 
&:hover {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    transform: scale(1.02);
    box-shadow: 0 0 20px ${(props) => (props.theme.colorPalette.grayShdow)};;
}
`

const ItemBookMark = styled.div`
display:inline-flex;
justify-content:center;
align-items:center;
cursor:pointer;
`

const PeriodBox = styled.div`
  font-size: ${(props) => props.fontsetinfo.size};
  color: ${(props) => props.fontsetinfo.color};
  font-weight: ${(props) => props.fontsetinfo.bold};
`

const TxtBox = styled.div`
font-size: ${(props) => (props.fontsetinfo.size)};
padding:3px 0 3px 0;
`
const TxtManager = styled.div`
font-size: ${(props) => (props.fontsetinfo.size)};
color: ${(props) => (props.fontsetinfo.color)};
font-weight: ${(props) => (props.fontsetinfo.bold)};
;
`

const PhysicalContainer = styled.div`
display: flex;
justify-content: flex-start;
flex-direction: row;
flex-wrap: wrap;

`

const PhysicalChips = styled.div`
border:${(props) => props.info.value !== undefined ? `0.8px solid ${props.theme.colorPalette.darkGray}`: null};
border-radius: 7px;
padding: 3px;
margin:5px;
height:15px;
background-color: ${(props) => props.theme.colorPalette.lightMain};

`

export const ItemBoxStyle = {
    ItemBox,
    ItemBookMark,
    PeriodBox,
    TxtManager,
    TxtBox,
    PhysicalChips,
    PhysicalContainer,
}