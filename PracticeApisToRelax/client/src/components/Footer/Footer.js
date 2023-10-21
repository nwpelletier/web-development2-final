import React from 'react';
import FooterObject from './FooterObject';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    position: 'fixed',
    bottom: 0,
  },
};

function Footer() {
  return (
    <div style={styles.container}>
      <FooterObject text="" footObjClass="footer-box-low" />
      <FooterObject text="" footObjClass="footer-box-high" />
      <FooterObject text="" footObjClass="footer-box-low" />
      <FooterObject text="" footObjClass="footer-box-high" />
      <FooterObject text="(o__0) welcome in (0__o)" footObjClass="footer-text" />
      <FooterObject text="" footObjClass="footer-box-high" />
      <FooterObject text="" footObjClass="footer-box-low" />
      <FooterObject text="" footObjClass="footer-box-high" />
      <FooterObject text="" footObjClass="footer-box-low" />
    </div>
  );
}

export default Footer;
