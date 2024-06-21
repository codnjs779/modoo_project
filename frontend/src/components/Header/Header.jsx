import React, {useContext} from 'react';
import logo from "../../images/logo.png";
import {HeaderWrapperStyle} from './HeaderStyle'
import { ThemeContext } from 'styled-components';
import { isActiveBookMarkState, sizeUpTextState } from '../../recoil/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import Tooltip from '@mui/material/Tooltip';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const theme = useContext(ThemeContext);
    const [isActiveBookMark, setIsActiveBookMark] = useRecoilState(isActiveBookMarkState)
    // const [sizeUpText, setSizeUpText] = useRecoilState(sizeUpTextState)
    const nav = useNavigate()
    const filterBookedItem = () => {
        setIsActiveBookMark(!isActiveBookMark)
        nav('/bookmark')
      }

    const headerMenuTab = [{link:"/", name:'홈'}, {link:"contact",name:'문의하기'}]
    const headerMenuSet = () => {
        const link = headerMenuTab.map((i) => {
            return (
                <Link to={i.link} key={i.name}>
                <div>{i.name}</div>
                </Link>
            )

        })

        return link
    }

//    const scaleUptxt = () => {
//         setSizeUpText(!sizeUpText)
//    } 

    return (
        <HeaderWrapperStyle.HeaderContainer>
            <HeaderWrapperStyle.HeaderWrapper theme={theme}>
                <Link to={'/'}>
                <img src={logo} alt="logo"/>
                </Link>
                </HeaderWrapperStyle.HeaderWrapper>
                <HeaderWrapperStyle.MenuTabContainer>
                {headerMenuSet()}
                <div onClick={() => filterBookedItem()}>북마크</div>
                </HeaderWrapperStyle.MenuTabContainer>

            </HeaderWrapperStyle.HeaderContainer>
    );
};

export default Header;