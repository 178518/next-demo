import React, { Component } from 'react';
import Header from 'components/header';
import Footer from 'components/footer';

class Layout extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="ant-layout pc-layout">
        <Header/>
        {children}
        <Footer />
      </div>
    );
  }
}

export default Layout;
