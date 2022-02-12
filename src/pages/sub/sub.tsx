import React from 'react';
import './sub.scss';
import Template from '../../component/template/template';

function SubPage() {
  return (
    <div id='sub-wrap'>
      <Template>
        <body>
          <section>
            2. 서브 페이지<br/>
            - 게시판 글 작성
          </section>
        </body>
      </Template>
    </div>
  );
}

export default SubPage;
