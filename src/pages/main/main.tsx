import React from 'react';
import './main.scss';
import Template from '../../component/template/template';

function MainPage() {
  return (
    <div id='main-wrap'>
      <Template>
        <body>
          <section>
            메인 페이지<br/>
            - 게시판 글 목록
          </section>
        </body>
      </Template>
    </div>
  );
}

export default MainPage;
