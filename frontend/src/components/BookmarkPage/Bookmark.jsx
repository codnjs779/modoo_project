import React from 'react';
import { ItemStyle } from '../ItemList/ItemStyle';
import styled, { ThemeContext } from 'styled-components';
import { useContext } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import ItemBox from '../ItemList/ItemBox';
import { bookmarkFilterList} from '../../recoil/selector';
import { bookMarkItem } from '../../recoil/atoms';
import { useNavigate } from 'react-router-dom';
import useDetailJobList from '../../hooks/detailJobList';

const Bookmark = () => {
    const theme = useContext(ThemeContext);
    const fetchDetailJob = useDetailJobList();
    const nav = useNavigate();
    const [bookmarkId, setBookMarkId] = useRecoilState(bookMarkItem)
    const bookMarkItemSelector = useRecoilValue(bookmarkFilterList(bookmarkId));
    
    const bookmarkSave = (id) => {
      setBookMarkId((prev) => {
        return [...prev, id]; 
      });
    };

    const detailJob = (id) => {
      fetchDetailJob({id:id})
      nav(`/jobid/${id}`)
    }
  
  
    return (
    <BookmarkPageStyle>
          <TitleText>북마크 목록</TitleText>
            <ItemStyle.ItemListContainer theme={theme}>
           {bookMarkItemSelector.map((i) => (
                 <ItemBox
                   key={i.id}
                   props={{
                     item: i,
                     theme: theme,
                     func: bookmarkSave,
                     selectFunc: detailJob
                   }}
                 />
               ))} 
         </ItemStyle.ItemListContainer>
    </BookmarkPageStyle>


    );
};

export default Bookmark;

const BookmarkPageStyle = styled.div`
display: flex;
flex-direction: column;
margin-top: 5rem;
`

const TitleText = styled.h1`
margin-left: 4rem;
margin-bottom: 3rem;

`