import React from 'react';
import {useTranslation} from 'react-i18next';
import {DateTime} from 'luxon';
import packageJSON from '../../../../package.json';

const Footer = () => {
  const [t] = useTranslation();

  return (
    <footer className="main-footer">
      <strong>
        <span>Copyright © {DateTime.now().toFormat('y')} </span>
        <a href="https://medcheck.com.py/" target="_blank" rel="noopener noreferrer">
          MedCheck
        </a>
        <span>.</span>
      </strong>
      <div className="float-right d-none d-sm-inline-block">
        <b>{t<string>('footer.version')}</b>
        <span>&nbsp;23.08</span>
      </div>
    </footer>
  );
};

export default Footer;
