import {PureComponent} from 'react';
import {Input} from 'antd';

import ParamsTable from './Params';
import RespTab from './Resp';

const APIName = props => (
  <Input
    className="api-name"
    placeholder="接口名称"
    {...props}
  />
);

const APIDesc = props => (
  <Input.TextArea
    className="api-desc"
    placeholder="接口描述"
    {...props}
  />
);

const APICate = props => (
  <Input
    className="api-callback"
    placeholder="接口分类（必填）"
    {...props}
  />
);

const APIFormat = props => (
  <Input
    className="api-format"
    placeholder="接口格式(选填，如果调用格式和通用格式不一样需要填写)"
    {...props}
  />
);

const APICallback = props => (
  <Input
    className="api-callback"
    placeholder="接口回调(选填，如果客户端回调方法为固定函数名需要填写)"
    {...props}
  />
);

export default class extends PureComponent {
  getProps(key) {
    const newData = Object.assign({}, this.props.value);

    return {
      value: newData[key],
      onChange: e => {
        newData[key] = e.target.value;
        this.props.onChange(newData);
      }
    };
  }

  getParamProps() {
    const data = this.props.value.args;
    return {
      data,
      onChange: data => {
        const newData = Object.assign({}, this.props.value);
        newData.args = data;
        this.props.onChange(newData);
      }
    };
  }

  getRespProps() {
    const panes = this.props.value.resp;
    return {
      panes: Array.isArray(panes) ? panes : [],
      onChange: data => {
        const newData = Object.assign({}, this.props.value);
        newData.resp = data;
        this.props.onChange(newData);
      }
    };
  }

  render() {
    return (
      <div className="api">
        <APIName {...this.getProps('name')} />
        <APIDesc {...this.getProps('desc')} />
        <APICate {...this.getProps('cate')} />
        <APIFormat {...this.getProps('format')} />
        <APICallback {...this.getProps('callback')} />
        <ParamsTable {...this.getParamProps()} />
        <RespTab {...this.getRespProps()} />
      </div>
    );
  }
}
