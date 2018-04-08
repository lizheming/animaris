import React, { PureComponent } from 'react';
import {render} from 'react-dom';
import {
  Button,
  Card,
  Icon,
  Avatar,
  List,
  Layout,
  Menu
} from 'antd';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';

global.React = React;
const { Meta } = Card;

class App extends PureComponent {
  constructor(...props) {
    super(...props);
    this.state = this.initState();
  }

  initState() {
    return {
      loading: false,
      list: [
        {
          id: 1,
          avatar: 'https://p0.ssl.qhimgs4.com/t013198fa0cca90c0f6.png',
          title: '快资讯',
          description: '信息流 SDK 客户端接口文档，主要是以 console.log() 交互为主。信息流 SDK 客户端接口文档，主要是以 console.log() 交互为主。信息流 SDK 客户端接口文档，主要是以 console.log() 交互为主。'
        }
      ]
    };
  }

  render() {
    const {loading, list} = this.state;
    return (
      <Layout>
        <Layout.Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Layout.Header>
        <Layout.Content style={{ padding: '30px 50px 0' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 'calc(100vh - 163px)' }}>
            <List
              rowKey="id"
              loading={loading}
              grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
              dataSource={[...list, '']}
              renderItem={item =>
                item ? (
                  <List.Item key={item.id}>
                    <Card
                      hoverable
                      actions={[
                        <div><Icon type="edit" /> 编辑</div>,
                        <div><Icon type="delete" /> 删除</div>
                      ]}
                    >
                      <Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a href="#">{item.title}</a>}
                        description={
                          <Ellipsis tooltip className="ellipsis" lines={3}>
                            {item.description}
                          </Ellipsis>
                        }
                      />
                    </Card>
                  </List.Item>
                ) : (
                  <List.Item>
                    <Button type="dashed" className="newButton">
                      <Icon type="plus" /> 新增产品
                    </Button>
                  </List.Item>
                )
              }
            />
          </div>
        </Layout.Content>
        <Layout.Footer style={{textAlign: 'center'}}>
          Ant Design ©2018 Created by Ant UED
        </Layout.Footer>
      </Layout>
    );
  }
}
render(<App />, document.getElementById('app'));
