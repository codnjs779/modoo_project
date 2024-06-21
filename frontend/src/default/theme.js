import { BookmarkBorder as BookmarkBorderIcon, Bookmark as BookmarkIcon } from '@mui/icons-material';
import { useRecoilState, useRecoilValue } from 'recoil';
import { sizeUpTextState } from '../recoil/atoms';


const windowSize = {
    small: '600px',
    base: '768px',
    large: '1024px'
};

const fontSize = {
//   xs: !textControl ? '0.65rem' : `${0.65 *2} rem`,
//   sm: !textControl ? '0.85rem' : `${0.85 *2} rem`,
//   base: !textControl ? '1rem' : `${1 *2} rem`,
//   md: !textControl ? '1.25rem' : `${1.25 *2} rem`,
//   lg: !textControl ? '1.5rem' : `${1.5 *2} rem`,
//   xxlg:!textControl ? '2.6rem' : `${2.6 *2} rem`,
//   mglg: !textControl ? '2.9rem' : `${2.9 *2} rem`,

  xs: '0.65rem',
  sm: '0.85rem',
  base: '1rem',
  md: '1.25rem',
  lg: '1.5rem',
  xxlg:'2.6rem',
  mglg: '2.9rem',
};

const colorPalette = {
    lightGray:"#ccc",
    darkGray:"#737373",
    mainColor:"#488aa2",
    baseColor:"black",
    grayShdow:"rgba(0, 0, 0, 0.1)",
    lightMain:"#AAD7D9",
    fontDarkGray:'#3E3E3E',
    white:'white',
    sigOrange: 'rgba(245,128,39,0.6)',
    activeColor:"rgb(255, 253, 212)",
}

const radius = {
    sm: '6px',
    base:'10px',
    md:'15px',
    lg:'25px'
}

const fontBold = {
    thin:'300',
    base:'500',
    mdBold:'600',
    lgBold:'700',
}

export const theme = {
    windowSize,
    fontSize,
    colorPalette,
    radius,
    fontBold,
}

