import {Link} from 'react-router-dom';
import {Layout, Menu} from 'antd';

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

export default props => {
  const defaultSelectedKeys = [location.pathname];
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
    </Layout.Header>
  );
};
