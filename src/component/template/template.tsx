import React from 'react';
import './template.scss';
import { Link } from 'react-router-dom';

interface IProps {
  children?: React.ReactElement;
}

const Template = ({children}: IProps) => {
  const openPopup = () => {
    const url = './popup';
    const options = 'width=1000, height=620, top=20, left=250';
    window.open(url, "popupName", options);
  };

  return (
    <div className="template-wrap">
      <header>
        <div className='global-navi'>
          <h1>Lifelog</h1>
          <p>효동동 Blog</p>
        </div>
        <nav>
          <ul className='side-navi'>
            <li>
              <Link to="/">*<b>Guset</b></Link>
            </li>
            <li>
              <Link to="/main">- Main</Link>
            </li>
            <li>
              <Link to="/sub">- Sub</Link>
            </li>
            <li onClick={openPopup}>- Popup</li>
          </ul>
        </nav>
      </header>
      <div className='body'>{children}</div>
      <footer>
        <div className='footer-wrap'>
          <h1>Lifelog</h1>
          <p>ⓒ jeong_hYoon. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Template;
