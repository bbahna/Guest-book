import React from 'react';
import './main.scss';
import Template from '../../component/template/template';

function MainPage() {
  return (
    <div id='main-wrap'>
      <Template>
        <body>
          <section className='pageExplain'>
            1. 메인 페이지<br/>
            - 게시판 글 목록
          </section>
          <section className='madalView'>
            {/* Modal-button */}
            <button className='madalBtn'>
              Modal view
            </button>
            {/* Modal-contents */}
            <div className='madalWrap'>
              <div className='outArea'/>
              <div className='modalBox'>
                당신은 Modal을 발견했습니다.
              </div>
            </div>
          </section>
        </body>
      </Template>
    </div>
  );
}

export default MainPage;
