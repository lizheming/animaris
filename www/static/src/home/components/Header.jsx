import React from 'react';
import {Link} from 'react-router-dom';
import {Layout, Menu, Dropdown, Avatar, Icon} from 'antd';

import rq from './request';

const navs = [
  {
    title: '首页',
    pathname: '/'
  },
  {
    title: '关于',
    pathname: '/about'
  }
];

async function logout() {
  await rq.delete('/api/token');
  location.reload();
}

export default props => {
  const defaultSelectedKeys = [location.pathname];
  if (!global.userInfo.name) {
    return (
      <Layout.Header>
        <div className="logo">
          <Link to={{pathname: '/'}}>Animaris</Link>
        </div>
      </Layout.Header>
    );
  }

  return (
    <Layout.Header>
      <div className="logo">
        <Link to={{pathname: '/'}}>Animaris</Link>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={defaultSelectedKeys}
        style={{ lineHeight: '64px' }}
      >
        {navs.map(nav =>
          <Menu.Item key={nav.pathname}>
            <Link to={{pathname: nav.pathname}}>{nav.title}</Link>
          </Menu.Item>
        )}
      </Menu>
      <div className="user-pop">
        <Dropdown overlay={<Menu>
          <Menu.Item disabled>
            <Icon type="user" />个人中心
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="logout">
            <span onClick={logout}><Icon type="logout" />退出登录</span>
          </Menu.Item>
        </Menu>}>
          <span>
            <Avatar size="small" src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
            <span>{global.userInfo.name}</span>
          </span>
        </Dropdown>
      </div>
    </Layout.Header>
  );
};
