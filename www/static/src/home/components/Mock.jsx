import {PureComponent} from 'react';
import {Radio, Input} from 'antd';
import rq from './request';
import ButtonGroup from 'antd/lib/button/button-group';

export default class extends PureComponent {
  state = {
    data: {
      interfaces: []
    }
  }

  constructor(props, state) {
    super(props, state);

    const {id} = props.match.params;
    if (!id) {
      return;
    }
    this.id = id;
    this.getDoc();
  }

  async getDoc() {
    const resp = await rq.get(`/api/doc/${this.id}`);
    if (resp.errno) {
      return;
    }
    const {data} = resp;
    this.setState({data: {_id: data._id, interfaces: [], ...data.data}});
  }

  async updateActiveResp({name}, respName) {
    const data = Object.assign({}, this.state.data);
    const {interfaces} = data;
    const api = interfaces.find(v => v.name === name);
    if (!api) {
      return false;
    }

    const {resp} = api;
    if (!Array.isArray(resp)) {
      return false;
    }

    for (let i = 0; i < resp.length; i++) {
      resp[i].active = resp[i].name === respName;
    }
    api.resp = resp;
    data.interfaces = interfaces;
    const result = await rq.put(`/api/doc/${this.id}`, {data});
    if (result.errno) {
      return false;
    }
    this.setState({data, random: Math.random()});
  }

  renderAPI = (api) => {
    const activeName = (api.resp.find(r => r.active) || api.resp[0]).name;
    return (<tr key={api.name} style={{textAlign: 'left'}}>
      <td>{api.name}</td>
      <td>
        <Radio.Group
          defaultValue={activeName}
          size="small"
          onChange={e => {
            this.updateActiveResp(api, e.target.value);
          }}>
          {api.resp.map(resp => <Radio.Button key={resp.name} value={resp.name}>{resp.name}</Radio.Button>)}
        </Radio.Group>
      </td>
    </tr>);
  }

  render() {
    const {iframe, random} = this.state;
    const {interfaces} = this.state.data;
    const apis = interfaces.filter(api => Array.isArray(api.resp) && api.resp.length && api.resp[0].content).map(this.renderAPI);
    return (
      <div style={{ background: '#fff', padding: 24, minHeight: 'calc(100vh - 163px)', display: 'flex' }}>
        <div className="left" style={{width: 400, marginRight: 50}}>
          <p>
            <Input.Search
              placeholder="输入URL"
              enterButton="确定"
              onSearch={value => this.setState({iframe: value})}
            />
          </p>
          <iframe key={random} src={iframe} style={{width: 400, height: 700, border: '1px solid #ddd'}}></iframe>
        </div>
        <div className="right">
          <table>
            <thead>
              <tr>
                <th>接口名称</th>
                <th>返回数据</th>
              </tr>
            </thead>
            <tbody>
              {apis}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
