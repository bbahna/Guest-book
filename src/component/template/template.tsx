import React from 'react';
import './template.scss';

interface IProps {
  children?: React.ReactElement;
}

const Template = ({children}: IProps) => {
  return (
    <>
      <header>
        <div className='header-wrap'>
          <h1>Lifelog</h1>
          <p>효동동 Blog</p>
        </div>
      </header>
      {children}
      <footer>
        <div className='footer-wrap'>
          <h1>Lifelog</h1>
          <p>ⓒ jeong_hYoon. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Template;
