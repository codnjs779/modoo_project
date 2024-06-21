import React, {useContext, useEffect} from 'react';
import styled from 'styled-components';
import  { useRecoilValue } from "recoil";
import { detailJobState } from '../../recoil/atoms';
import { ThemeContext } from 'styled-components';
import useDetailJobList from '../../hooks/detailJobList';
import { useParams } from 'react-router-dom';


const DetailPage = () => {
    const data = useRecoilValue(detailJobState)
    const item = data?.job?.data
    const theme = useContext(ThemeContext);
    const fetchDetailJob = useDetailJobList();
    const params = useParams()
    console.log('dd', item)


    useEffect(() => {
        fetchDetailJob({id:params.id})
    }, [])


    // const item = {
    //     "id": 9,
    //     "cntctNo": "1588-1519",
    //     "envHandWork": "작은 물품 조립가능",
    //     "rno": "9",
    //     "envLiftPower": "5~20Kg의 물건을 다룰 수 있음",
    //     "salary": "2,060,740",
    //     "company": "서초프라임요양병원",
    //     "compAddr": "서울특별시 서초구 방배천로2길 22 서초프라임 요양병원 (방배동)",
    //     "envLstnTalk": "듣고 말하기에 어려움 없음",
    //     "salaryType": "월급",
    //     "empType": "계약직",
    //     "envStndWalk": "일부 서서하는 작업 가능",
    //     "enterType": "무관",
    //     "jobNm": "환경 미화원",
    //     "envBothHands": "양손작업 가능",
    //     "termDate": "2024-05-24~2024-06-10",
    //     "envEyesight": "비교적 큰 인쇄물을 읽을 수 있음",
    //     "reqCareer": "무관",
    //     "reqEduc": "무관"
    // }

    return (
        
            item ? 
            <DetailPageStyle theme={theme}>
                <Line/>
            <TitleText>회사정보</TitleText>
           <UpperInfo>
               <LeftBox>
                   <div className='type'>
                   </div>
                   <div className='company'>
                       {item.company}
                   </div>
               </LeftBox>

               <RightBox>
                   <RightMiniBox>
                       <NameBox>주&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소</NameBox>
                       <ValueBox>{item.compAddr}</ValueBox>
                   </RightMiniBox>

                   <RightMiniBox>
                       <NameBox>급&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;여</NameBox>
                       <ValueBox>{item.salary} | {item.salaryType}</ValueBox>
                   </RightMiniBox>

                   <RightMiniBox>
                       <NameBox>경&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;력</NameBox>
                       <ValueBox>{item.reqCareer}</ValueBox>
                   </RightMiniBox>

                   <RightMiniBox>
                       <NameBox>업무내용</NameBox>
                       <ValueBox>{item.jobNm}</ValueBox>
                   </RightMiniBox>

                   <RightMiniBox>
                       <NameBox>필요학력</NameBox>
                       <ValueBox>{item.reqEduc}</ValueBox>
                   </RightMiniBox>

                   <RightMiniBox>
                       <NameBox>모집기간</NameBox>
                       <ValueBox>{item.termDate}</ValueBox>
                   </RightMiniBox>
               </RightBox>
           </UpperInfo>
       
    
        
           <BottomInfo>
           <Line/>
               <TitleText>신체능력</TitleText>
               <BottomMiniBox>
                   <div>{item.envBothHands ? item.envBothHands : null}</div>
                   <div>{item.envEyesight ? item.envEyesight : null}</div>
                   <div>{item.envHandWork ? item.envHandWork : null}</div>
                   <div>{item.envLiftPower ? item.envLiftPower : null}</div>
                   <div>{item.envLstnTalk ? item.envLstnTalk  : null}</div>
                   <div>{item.envStndWalk ? item.envStndWalk : null}</div>
               </BottomMiniBox>

           </BottomInfo>
       </DetailPageStyle>

       : <div>로딩중입니다</div>
    );
};

export default DetailPage;

const DetailPageStyle = styled.div`
display: flex;
flex-direction: column;
width: 70vw;
max-width: 70vw;
height: 100%;
justify-content: center;
margin: 70px auto;


@media (max-width: ${(props) => props.theme.windowSize.base}) {
    width: 90vw;
      }
`


const UpperInfo = styled.div`
display: flex;
justify-content: space-evenly;

@media (max-width: ${(props) => props.theme.windowSize.base}) {
    flex-direction: column;
    margin: auto;
      }

`
const LeftBox = styled.div`
display: flex;
flex-direction:column;

.type {
    width: 70px;
    text-align: center;
    border-radius: 7px;
    background-color:lightgray;
}
.company {
    margin-top: 10px;
    width: 400px;
    height: 250px;
    border-radius: 14px;
    background-color: ${(props) => props.theme.colorPalette.sigOrange};
    border:1px solid lightgray;
    text-align: center;
    align-content: center;
    font-size:${(props) => props.theme.fontSize.lg};
    font-weight: bold;
}
`

const Line = styled.div`
width: 70vw;
height: 2px;
border-radius: 2px;
margin-bottom: 10px;
background-color: #bfbfbfcf;
`

const RightBox = styled.div`
display: flex;
flex-direction: column;
margin-top: 60px;
margin:60px 0 0 30px;
font-size: ${(props) => props.theme.fontSize.md};
@media (max-width: ${(props) => props.theme.windowSize.base}) {
margin: 20px 0 0 20px;
font-size: ${(props) => props.theme.fontSize.base};

      }
`

const RightMiniBox = styled.div`
display: flex;
margin-bottom: 5px;
`

const NameBox = styled.div`
width: 70px;
max-width: 70px;
margin-right: 20px;
font-weight: 600;

@media (max-width: ${(props) => props.theme.windowSize.base}) {
margin-right: 10px;
      }
`

const ValueBox = styled.div`
width: 270px;
max-width: 270px;
`
const BottomInfo = styled.div`
display: flex;
flex-direction: column;
margin-top: 30px;
`
const TitleText = styled.div`
font-size: ${(props) => props.theme.fontSize.md};
font-weight: 600;
margin-bottom: 20px;
`
const BottomMiniBox = styled.div`
display: flex;
justify-content: flex-start;
flex-wrap: wrap;
max-width: inherit;
div {
    margin:10px;
    border:0.3px solid lightgray;
    background-color: ${(props) => props.theme.colorPalette.activeColor};
    padding:5px;
    border-radius: 5px;
}
div:empty {
    display: none;
  }
`