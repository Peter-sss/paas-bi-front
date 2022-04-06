import React, { Component } from 'react';
import Routes from './routes';
import SiderCustom from './components/SiderCustom';
import HeaderCustom from './components/HeaderCustom';
import { Layout } from 'antd';
import { ThemePicker } from './components/widget';
import { connectAlita } from 'redux-alita';

const { Content, Footer } = Layout;

class App extends Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render () {
    const { auth = { data: {} }, responsive = { data: {} } } = this.props;
    console.log(auth);
    return (
      <Layout>
        <SiderCustom collapsed={this.state.collapsed} />
        <ThemePicker />
        <Layout style={{ flexDirection: 'column' }}>
          <HeaderCustom
            toggle={this.toggle}
            collapsed={this.state.collapsed}
            user={auth.data || {}}
          />
          <Content style={{ margin: '0 16px', overflow: 'initial', flex: '1 1 0' }}>
            <Routes auth={auth} />
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}> */}
          {/*     Mob-Bi ©{new Date().getFullYear()} */}
          {/* </Footer> */}
        </Layout>
      </Layout>
    );
  }
}

export default connectAlita(['auth', 'responsive'])(App);
