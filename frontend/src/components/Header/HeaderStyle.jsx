import styled from "styled-components";

const HeaderContainer  = styled.div`
margin:2.5rem 2.5rem 1rem 4.5rem;
align-items:center;
display: grid;
grid-template-columns: 2fr 3fr;

@media (max-width: ${(props) => props.theme.windowSize.base}) {
    grid-template-columns: 4fr 1fr;
      }
`
const HeaderWrapper = styled.div`
    img {
        width:100px;
    }

`

const MenuTabContainer = styled.div`
display: flex;
justify-content: space-evenly;
font-size: ${(props) => (props.theme.fontSize.md)};
font-weight: ${(props) => (props.theme.fontBold.mdBold)};
div{
    cursor:pointer;
}
@media (max-width: ${(props) => props.theme.windowSize.base}) {
        flex-direction: column;
        font-size: ${(props) => (props.theme.fontSize.sm)};
        div {
            margin-bottom: 20px;
        }
      }
`
export const HeaderWrapperStyle = {
HeaderWrapper,
HeaderContainer,
MenuTabContainer,
}
