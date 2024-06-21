import React, {useContext, useEffect, useState} from 'react';
import ItemBox from './ItemBox';
import { ItemStyle } from './ItemStyle';
import { ThemeContext } from 'styled-components';
import { useRecoilState} from 'recoil';
import { bookMarkItem, moreHasState, moreLoadState, jobsListState } from '../../recoil/atoms';
import useScrollJobList from '../../hooks/useScrollJobList';
import Button from '@mui/material/Button';
import PageSkin from '../PageSkin/PageSkin';
import useDetailJobList from '../../hooks/detailJobList';
import { useNavigate } from 'react-router-dom';

function ItemList() {
    const setScroll = useScrollJobList();
    const fetchDetailJob = useDetailJobList();
    const theme = useContext(ThemeContext);
    const row = 20;
    const [pageNm, setPageNm] = useRecoilState(moreLoadState);
    const [hasMore, setHasMore] = useRecoilState(moreHasState)
    const [jobList, setJobList] = useRecoilState(jobsListState);
    const [bookmarkId, setBookMarkId] = useRecoilState(bookMarkItem)
    const [stopMoreLoad, setStopMoreLoad] = useState(false) 
    const nav  = useNavigate()

    
    useEffect(() => {
        setScroll({nm:pageNm, row:row})
    },[pageNm, row, setScroll ]);

      const moreLoadFunc = () => {
        
        const totalPages = Math.ceil(jobList.total / row);
        if (pageNm < totalPages) {
          setScroll({nm:pageNm, row:row})

          setPageNm((prev) => prev + 1);
          const allDataLoaded = jobList.processedJobs.length >= jobList.total;
          setHasMore(!allDataLoaded);
        } else {
            setStopMoreLoad(true)
          setHasMore(false);
        }
      };
      

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
      <>
      <PageSkin/>
      <ItemStyle.ItemListContainer theme={theme}>
       {jobList && jobList.processedJobs.map((i) => (
             <ItemBox
               key={i.id}
               props={{
                 item: i,
                 theme: theme,
                 func: bookmarkSave,
                 selectFunc :detailJob,
               }}
             />
           ))} 
    {stopMoreLoad ?  <Button  className='muibtn'  disabled>더보기</Button>
 :  <Button  className='muibtn' onClick={() => moreLoadFunc()} variant="contained">더보기</Button>
}   </ItemStyle.ItemListContainer>
      </>
        )
}

export default ItemList;