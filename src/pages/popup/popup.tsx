import React from 'react';
import './popup.scss';
import Template from '../../component/template/template';

function PopupPage() {
  return (
    <div id='popup-wrap'>
      <Template>
        <body>
          <section>
            * 팝업 페이지<br/>
            - onClick시, PopUp open
          </section>
        </body>
      </Template>
    </div>
  );
}

export default PopupPage;
