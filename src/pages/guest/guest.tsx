import Template from '../../component/template/template';
import './guest.scss';
import useFetch from '../../hooks/useFetch';

interface IGuest {
  id: number;
  title: string;
  body: string;
  color: number;
}

function GuestPage() {
  const guest : IGuest[] = useFetch("http://localhost:4000/guest");

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
          {guest.map(o =>
            <li className='chat-box' style={{background: `${o.color}`}} key={o.id}>
              <h3>{o.title}</h3>
              <p>{o.body}</p>
            </li>
          )}
        </ul>
        <div className='chat-input'>
          <form>
            <div className='input-wrap'>
              <div className='chat-box'>
                <input className='chat-title' placeholder='제목'/>
                <input className='chat-body' placeholder='내용'/>
              </div>
              <ul className='color-select'>
                <li className='color-1'/>
                <li className='color-2'/>
                <li className='color-3'/>
                <li className='color-4'/>
                <li className='color-5'/>
              </ul>
            </div>
            <button>입력</button>
          </form>
        </div>
      </div>
    </Template>
  );
}

export default GuestPage;
