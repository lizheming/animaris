
import {
  Layout,
  Menu
} from 'antd';

export default function(props) {
  return (
    <Layout>
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
      <Layout.Content style={{ padding: '30px 50px 0' }}>
        {props.children}
      </Layout.Content>
      <Layout.Footer style={{textAlign: 'center'}}>
          WebView Mock Platform ©2018 Created by Lizheming
      </Layout.Footer>
    </Layout>
  );
}
