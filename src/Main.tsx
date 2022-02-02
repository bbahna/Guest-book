import React from 'react';
import './Main.scss';

function Main() {
  return (
    <div className='main-wrap'>
      <header className='main-header'>
        <h1>Lifelog</h1>
        <p>효동동 Blog</p>
      </header>
      <body className='main-body'>
        <section className='blog'>
          Node.js를 활용한 게시판 구현(예정)
        </section>
      </body>
      <footer className='main-footer'>
        ((이곳은 푸터영역))
      </footer>
    </div>
  );
}

export default Main;
