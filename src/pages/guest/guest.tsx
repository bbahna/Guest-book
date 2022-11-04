import Template from '../../component/template/template';
import './guest.scss';
import chatList from '../../store/data.json';

function GuestPage() {
  return (
    <Template>
      <div className='guest-wrap'>
        <div className='guest-top'>
          <h2>Guest-book</h2>
          <p>멋진 방명록을 남겨주세요.</p>
        </div>      
        <ul className='chat-wrap'>
          <li className='chat-box' style={{background: "#ddd"}}>
            <h3>글 제목</h3>
            <p>글 내용</p>
          </li>
          {chatList.guest.map((o)=>{
            return (
              <li className='chat-box' style={{background: `${o.color}`}}>
                <h3>{o.title}</h3>
                <p>{o.body}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </Template>
  );
}

export default GuestPage;
