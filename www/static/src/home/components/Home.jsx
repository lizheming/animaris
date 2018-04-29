import {PureComponent} from 'react';
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
import rq from './request';

const { Meta } = Card;

export default class extends PureComponent {
  constructor(...props) {
    super(...props);
    this.state = this.initState();
  }

  async componentWillMount() {
    const resp = await rq.get('/api/doc');
    this.setState({list: resp.data});
  }

  initState() {
    return {
      loading: false,
      list: [
        // {
        //   id: 1,
        //   avatar: 'https://p0.ssl.qhimgs4.com/t013198fa0cca90c0f6.png',
        //   title: '快资讯',
        //   description: '信息流 SDK 客户端接口文档，主要是以 console.log() 交互为主。信息流 SDK 客户端接口文档，主要是以 console.log() 交互为主。信息流 SDK 客户端接口文档，主要是以 console.log() 交互为主。'
        // }
      ]
    };
  }

  render() {
    const {loading, list} = this.state;
    return (
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
    );
  }
}
