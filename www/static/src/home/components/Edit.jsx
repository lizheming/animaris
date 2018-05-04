import { PureComponent } from 'react';
import {Layout, Button} from 'antd';
import API from './Api';
import SideApi from './SideApi';
import rq from './request';

export default class extends PureComponent {
  constructor(props, state) {
    super(props, state);
    this.id = props.match.params.id;

    this.getDoc();
    this.state = this.initState();
  }

  initState() {
    return {
      data: {interfaces: []},
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

  async getDoc() {
    const resp = await rq.get(`/api/doc/${this.id}`);
    if (resp.errno) {
      return;
    }
    const {data} = resp;
    this.setState({data: {id: data._id, interfaces: [], ...data.data}});
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

  async onSave() {
    const {currentItem, currentApi, data} = this.state;
    const newData = Object.assign({}, data);
    const interfaces = Array.from(newData.interfaces);

    if (!currentApi.name || !currentApi.cate) {
      return alert('请填写完整内容');
    }

    if (!currentItem) {
      interfaces.push(currentApi);
      newData.interfaces = interfaces;
      await rq.put(`/api/doc/${this.id}`, {data: newData});
      return this.setState({data: newData, currentItem: currentApi.name});
    }

    const currentApiIndex = interfaces.findIndex(api => api.name === currentItem);
    if (currentApiIndex === -1) {
      return;
    }

    interfaces[currentApiIndex] = currentApi;
    newData.interfaces = interfaces;

    await rq.put(`/api/doc/${this.id}`, {data: newData});
    return this.setState({data: newData});
  }

  render() {
    return (
      <Layout style={{background: '#fff' }}>
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
      </Layout>
    );
  }
}
