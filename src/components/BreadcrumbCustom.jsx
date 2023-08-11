import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

class BreadcrumbCustom extends React.Component {
  render () {
    const abcd = <Breadcrumb.Item>{this.props.abcd}</Breadcrumb.Item> || '';
    const second = <Breadcrumb.Item>{this.props.second}</Breadcrumb.Item> || '';
    return (
      <span>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item><Link to={'/dashboard'}>首页</Link></Breadcrumb.Item>
          {abcd}
          {second}
        </Breadcrumb>
      </span>
    )
  }
}

export default BreadcrumbCustom;
