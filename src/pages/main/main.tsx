import React, { useState } from 'react';
import './main.scss';
import Template from '../../component/template/template';

function MainPage() {
  // Modal-button Click시, useState 상태변경
  const [ModalShow, setModalShow] = useState(true);
  const toggleModalShow = () => setModalShow(!ModalShow);

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
            <button className='madalBtn' onClick={toggleModalShow}>
              Modal view
            </button>
            {/* Modal-contents */}
            <div className={`madalWrap ${ModalShow ? 'close' : 'open'}`}>
              <div className='outArea' onClick={toggleModalShow}/>
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
