import React, { PureComponent } from 'react';
import {render} from 'react-dom';
import {Layout, Button} from 'antd';
import API from './components/Api';
import SideApi from './components/SideApi';
import PageLayout from './components/Layout';

global.React = React;
const apis = {
  name: '信息流SDK接口文档',
  description: 'xxxx',
  interfaces: [{
    'name': 'getMonitorData',
    'cate': '基础',
    'desc': '获取打点数据',
    'args': [
      {
        key: 1,
        name: 'callback',
        type: 'string',
        value: '__CALLBACK__',
        description: ''
      }
    ],
    'resp': [
      {
        key: 1,
        name: 'default',
        value: {
          'wid': '0daec6a44968b83b91b91c67ea9529c3',
          'sign': 'llq',
          'network_type': '4',
          'refer_scene': '0',
          'source': 'funny,sexc,mass_vulgar,sexf,sts0,disu_label,vulgar,weak,sex4,fts0,qgc,,nbbn_kfunny_1:暗语,nbbn_kfunny_1:英语,nbbn_sfunny_搞笑,nbbn_tfunny,,vhot_duanzi',
          'refer_subscene': '7001'
        }
      }
    ]
  }, {
    cate: '基础',
    'name': 'newsComment',
    'desc': 'iOS更新顶部固定栏评论数',
    'args': [
      {
        key: 1,
        name: 'cmt_count',
        type: 'integer',
        description: '评论数',
        value: '0'
      },
      {
        key: 2,
        name: 'iscmt',
        type: 'boolean',
        value: 'true',
        description: '是否是评论'
      },
      {
        key: 3,
        name: 'cmt_click_callback',
        type: 'string',
        value: 'window.QHLun.tujiNativeShowInputbox',
        description: '评论点击后回调'
      }
    ],
    resp: [{key: 1}]
  }]
};

class App extends PureComponent {
  constructor(...props) {
    super(...props);
    this.state = this.initState();
  }

  initState() {
    return {
      data: apis,
      currentItem: null,
      currentApi: {
        name: '',
        cate: '',
        desc: '',
        args: [],
        resp: [{key: 1}]
      }
    };
  }

  onEdit(data) {
    const currentApiIndex = this.state.data.interfaces.findIndex(api =>
      api.name === data
    );
    if (currentApiIndex === -1) {
      return;
    }

    const currentApi = this.state.data.interfaces[currentApiIndex];
    this.setState({currentApi, currentItem: data});
  }

  onCancel() {
    const {currentItem, currentApi} = this.initState();
    this.setState({currentItem, currentApi});
  }

  onSave() {
    const {currentItem, currentApi, data} = this.state;
    const newData = Object.assign({}, data);
    const interfaces = Array.from(newData.interfaces);

    if (!currentItem) {
      interfaces.push(currentApi);
      newData.interfaces = interfaces;

      return this.setState({data: newData});
    }

    const currentApiIndex = interfaces.findIndex(api => api.name === currentItem);
    if (currentApiIndex === -1) {
      return;
    }

    interfaces[currentApiIndex] = currentApi;
    newData.interfaces = interfaces;

    return this.setState({data: newData});
  }

  render() {
    return (
      <PageLayout><Layout style={{background: '#fff' }}>
        <Layout.Sider width={300}>
          <SideApi
            value={this.state.data}
            onChange={data => this.setState({data})}
            onSelect={data => this.onEdit(data)}
            onDeSelect={this.onCancel.bind(this)}
          />
        </Layout.Sider>
        <Layout.Content style={{ padding: '24px', minHeight: 'calc(100vh - 163px)' }}>
          <API
            value={this.state.currentApi}
            onChange={data => this.setState({currentApi: data})}
          />
          <Button type="primary" onClick={this.onSave.bind(this)}>保存</Button>
        </Layout.Content>
      </Layout></PageLayout>
    );
  }
}
render(<App />, document.getElementById('app'));
