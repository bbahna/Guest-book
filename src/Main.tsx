import React from 'react';
import './Main.scss';

function Main() {
  return (
    <div id='main-wrap'>
      <header>
        <div className='header-wrap'>
          <h1>Lifelog</h1>
          <p>효동동 Blog</p>
        </div>
      </header>
      <body>
        <section className=''>
          Node.js를 활용한 게시판 구현(예정)
        </section>
      </body>
      <footer>
        <div className='footer-wrap'>
          <h1>Lifelog</h1>
          <p>ⓒ jeong_hYoon. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Main;
