import React from 'react';
import './template.scss';
import { Link } from 'react-router-dom';

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
        <nav>
          <ul className='navi-menu'>
            <li>
              <Link to="/">Main</Link>
            </li>
            <li>
              <Link to="/sub">Sub</Link>
            </li>
          </ul>
        </nav>
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
