import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Template from '../../components/template/template';
import useFetch from '../../hooks/useFetch';
import editIcon from '../../assets/pencil.svg';
import deleteIcon from '../../assets/trash.svg';

interface IGuest {
  id: number;
  title: string;
  body: string;
  color: number;
}

function GuestPage() {  
	const navigate = useNavigate();
  const guest : IGuest[] = useFetch('http://localhost:4000/guest');
  const [color, setColor] = useState('#ffcad4');

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
  
    fetch(`http://localhost:4000/guest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: titleRef.current.value,
        body: bodyRef.current.value,
        color: color,
      }),
    })
    .then(res => {
      if (res.ok) {
        alert('생성이 완료되었습니다');
        navigate('/');
      } else {
        alert('생성이 실패하였습니다.');
      }
    }
    );
  }
  
  const titleRef = useRef<any>(null);
  const bodyRef = useRef<any>(null);

  return (
    <Template>
      <GuestWrap>
        <GuestTop>
          <h2>Guest-book</h2>
          <p>멋진 방명록을 남겨주세요.</p>
        </GuestTop>
        <ChatWrap>
          {guest.length === 0 ? (
            <p className='no-data'>데이터가 없습니다.</p>
            // $ json-server ./src/store/data.json --port 4000
          ) : (
            guest.map(o =>
              <ChatItem>
                <div className='hover-bar'>
                  <button className='edit-btn'>
                    <img src={editIcon} alt='수정아이콘'/>
                  </button>
                  <button className='delete-btn'>
                    <img src={deleteIcon} alt='삭제아이콘'/>
                  </button>
                </div>
                <ChatBox style={{background: `${o.color}`}} key={o.id}>
                  <h3>{o.title}</h3>
                  <p>{o.body}</p>
                </ChatBox>
              </ChatItem>
          )
          )}
        </ChatWrap>
        <ChatInput>
          <form onSubmit={onSubmit}>
            <div className='input-wrap'>
              <div className='chat-box' style={{background: color}}>
                <input className='chat-title' placeholder='제목' ref={titleRef} required />
                <input className='chat-body' placeholder='내용' ref={bodyRef} required />
              </div>
              <ul className='color-select'>
                <li className='color-1' onClick={() => setColor("#ffcad4")}/>
                <li className='color-2' onClick={() => setColor("#ffe5d9")}/>
                <li className='color-3' onClick={() => setColor("#cce4de")}/>
                <li className='color-4' onClick={() => setColor("#dee5fc")}/>
                <li className='color-5' onClick={() => setColor("#cbc0d3")}/>
              </ul>
            </div>
            <button>입력</button>
          </form>
        </ChatInput>
      </GuestWrap>
    </Template>
  );
}

const GuestWrap = styled.div`
  width: 1200px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  padding: 20px 120px;
  box-sizing: border-box;
  font-size: 15px;
`;
const GuestTop = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-flow: column nowrap;
  margin: 0 5px 20px;
  h2 {
    margin-bottom: 8px;
    font-size: 28px;
    line-height: 22px;
    color: #111;
  }
  p {
    font-size: 15px;
    font-weight: 300;
  }
`;
const ChatWrap = styled.ul`
  flex: 1 1 auto;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-end;
  padding-bottom: 70px;
  .no-data {
    margin: 20px 0;
    font-size: 14px;
    font-style: italic;
    font-weight: 300;
    color: #999;
  }
`;
const ChatItem = styled.li`
  flex: 0 0 auto;
  position: relative;
  margin-bottom: 13px;
  &:hover .hover-bar {
    display: flex;
    flex-flow: row nowrap;
  }
  .hover-bar {
    display: none;
    position: absolute;
    top: 5px;
    right: 5px;
    border-radius: 5px;
    padding: 0 5px;
    background: #f3f3f3;
    button {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;
      width: 25px;
      height: 25px;
      border: none;
      background: none;
      cursor: pointer;
      &:hover {
        background: #e5e5e5;
      }
      img {
        height: 15px;
      }
    }
  }
`;
const ChatBox = styled.div`
  width: fit-content;
  height: fit-content;
  min-width: 250px;
  max-width: 500px;
  display: flex;
  flex-flow: column nowrap;
  padding: 10px;
  border-radius: 8px 8px 0 8px;
  box-shadow: 2px 3px 4px rgba(200, 200, 200, 0.5);
  h3 {
    margin: 0 0 5px;
    font-size: 15.5px;
    line-height: 18px;
    font-weight: 500;
  }
  p {
    font-size: 14px;
  }
`;
const ChatInput = styled.div`
  width: 500px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 10px 0;
  background: rgba(80, 80, 80, 0.75);
  border-radius: 50px 50px 80px 80px;
  form {
    flex: 0 0 auto;
    display: flex;
    flex-flow: row nowrap;
    .input-wrap {
      display: flex;
      flex-flow: column nowrap;
      margin-right: 10px;
      .chat-box {
        width: 300px;
        display: flex;
        flex-flow: column nowrap;
        margin-bottom: 5px;
        padding: 8px;
        border-radius: 8px 8px 0 8px;
        input {
          background: none;
          border: none;
          font-family: 'Noto Sans KR', sans-serif;
          color: #333;
          &:focus {
            outline: none;
          }
          &.chat-title {
            font-size: 15.5px;
            line-height: 18px;
            font-weight: 500;
          }
          &.chat-body {
            font-size: 14px;
          }
        }
      }
    }
    button {
      flex: 0 0 auto;
      height: 25px;
      padding: 0 10px;
      border: none;
      font-size: 13px;
      font-weight: 600;
      background: #333;
      color: #fff;
      border-radius: 3px;
      cursor: pointer;
    }
  }
  .color-select {
    flex: 0 0 auto;
    display: flex;
    flex-flow: row nowrap;
    li {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin-left: 8px;
      cursor: pointer;
      &:hover {
        border: 1px solid #333;
        box-sizing: border-box;
      }
      &.color-1 {
        background: #ffcad4;
      }
      &.color-2 {
        background: #ffe5d9;
      }
      &.color-3 {
        background: #cce4de;
      }
      &.color-4 {
        background: #dee5fc;
      }
      &.color-5 {
        background: #cbc0d3;
      }
    }
  }
`;

export default GuestPage;
