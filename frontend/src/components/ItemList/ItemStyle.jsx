import styled from "styled-components"

const ItemListContainer = styled.div`
    max-width: ${(props) => props.theme.windowSize.large};
    margin: 1rem auto 1rem auto;
    width: 95%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    height: 100%;
    gap: 1rem;
    
    position: relative;
    .muibtn {
        position: absolute;
        bottom: -90px;
        width: 100%;
        background-color:  ${(props) => props.theme.colorPalette.mainColor};
    }
    @media (max-width: ${(props) => props.theme.windowSize.base}) {
        grid-template-columns: repeat(1, 1fr);
      }
`



export const ItemStyle = {
    ItemListContainer,
}