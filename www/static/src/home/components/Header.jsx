import {Layout, Menu} from 'antd';

export default props => (
  <Layout.Header>
    <div className="logo">Animaris</div>
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['1']}
      style={{ lineHeight: '64px' }}
    >
      <Menu.Item key="1">首页</Menu.Item>
      <Menu.Item key="2">关于</Menu.Item>
    </Menu>
  </Layout.Header>
);
