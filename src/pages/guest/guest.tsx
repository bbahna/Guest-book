import React from 'react';
import './guest.scss';
import Template from '../../component/template/template';

function GuestPage() {
  return (
    <div id='guest-wrap'>
      <Template>
        <body>
          <section className='pageExplain'>
            방명록 페이지
          </section>
        </body>
      </Template>
    </div>
  );
}

export default GuestPage;
