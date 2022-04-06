/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { Component } from 'react';
import avater from '../style/imgs/b1.jpg';
import { Menu, Icon, Layout, Popover } from 'antd';
import { queryString } from '../utils';
import { withRouter } from 'react-router-dom';
import { PwaInstaller } from './widget';
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HeaderCustom extends Component {
  state = {
    user: '',
    visible: false,
  };
  componentDidMount () {
    const QueryString = queryString();
    const _user = JSON.parse(localStorage.getItem('user')) || '测试';
    // if (!_user && QueryString.hasOwnProperty('code')) {
    // } else {
    //   this.setState({
    //     user: _user
    //   });
    // }
  };
  menuClick = (e) => {
    console.log(e);
    e.key === 'logout' && this.logout();
  };
  logout = () => {
    // localStorage.removeItem('user');
    // this.props.history.push('/login')
  };
  popoverHide = () => {
    this.setState({
      visible: false,
    });
  };
  handleVisibleChange = (visible) => {
    this.setState({ visible });
  };
  render () {
    return (
      <Header className="custom-theme header" >
        <Icon
          className="header__trigger custom-trigger"
          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.props.toggle}
        />
        <Menu
          mode="horizontal"
          style={{ lineHeight: '64px', float: 'right' }}
          onClick={this.menuClick}
        >
          <Menu.Item key="pwa">
            <PwaInstaller />
          </Menu.Item>
          <SubMenu title={<span className="avatar"><img src={avater} alt="头像" /><i className="on bottom b-white" /></span>}>
            <MenuItemGroup title="用户中心">
              <Menu.Item key="setting:1">你好</Menu.Item>
              <Menu.Item key="logout"><span onClick={this.logout}>退出登录</span></Menu.Item>
            </MenuItemGroup>
          </SubMenu>
        </Menu>
      </Header>
    )
  }
}

export default withRouter(HeaderCustom);
