import React, { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import ani from '../../images/ani.gif'
import SimpleAlert from '../../default/Alert';
const Contact = () => {
    const theme = useContext(ThemeContext)
    const [visibleState, setVisibleState] = useState(false)
    const myemail = 'chaenny.choi@gmail.com'
    const copylink = (email) => {
        navigator.clipboard.writeText(email)
        setVisibleState(true)

        setTimeout(() => {
            setVisibleState(false)
        }, 3000);

    }
     return (
        <ContactStyle theme={theme}>
            <img src={ani} alt='emailimg'/>
            <TextStyle options={{size:theme.fontSize.xxlg, weight:600, color:theme.colorPalette.fontDarkGray}}>문의사항</TextStyle>
            <div className='emailbox'>
            <TextStyle onClick={() =>copylink(myemail)} options={{size:theme.fontSize.mg, weight:600, color:theme.colorPalette.darkGray}}>{myemail}</TextStyle>
            </div>
            <p>궁금하신 사항이 있으시면 메일주소로 연락 부탁드립니다.</p>
            {
                visibleState ? <SimpleAlert props={{status:"success", text:"복사완료!"}}/> : null
            }
            
        </ContactStyle>
    );
};

export default Contact;

const ContactStyle = styled.div`
display: flex;
flex-direction: column;
align-items: center;
text-align: center;
margin-top: 100px;
.emailbox{
    display: flex;
    align-items: center;
    text-align: center;
    align-content: center;
    margin-top: 20px;
    img {
        margin-left: 10px;
        cursor: pointer;
    }
}

p {
    color: ${(props) => (props.theme.colorPalette.darkGray)};
}
`
const TextStyle = styled.div`
font-size: ${(props) => (props.options.size)};
font-weight: ${(props) => (props.options.weight)};
text-align: center;
cursor:pointer;
color: ${(props) => (props.options.color)};

`
