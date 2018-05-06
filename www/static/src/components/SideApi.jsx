import { PureComponent } from 'react';
import {
  Menu,
  Icon,
  Input,
  Button,
  Popconfirm
} from 'antd';
const {SubMenu} = Menu;

export default class extends PureComponent {
  constructor(...args) {
    super(...args);
    this.state = this.initialState();
  }

  initialState() {
    return {
      editElement: '',
      editData: ''
    };
  }

  onEdit(data, e) {
    e.stopPropagation();
    this.setState({editElement: data.name, editData: data.name});
  }

  onDelete(data, e) {
    e.stopPropagation();

    const apis = Object.assign({}, this.props.value);
    const interfaces = Array.from(apis.interfaces).filter(api => api.cate !== data.name);
    apis.interfaces = interfaces;

    this.props.onChange(apis);
    this.setState(this.initialState());
  }

  onUpdate(e) {
    this.setState({editData: e.target.value});
  }

  onSave(e) {
    e.stopPropagation();

    const apis = Object.assign({}, this.props.value);
    const interfaces = Array.from(apis.interfaces);
    interfaces.forEach(api => {
      if (api.cate === this.state.editElement) {
        api.cate = this.state.editData;
      }
    });
    apis.interfaces = interfaces;

    this.props.onChange(apis);
    this.setState(this.initialState());
  }

  onCancel(e) {
    e.stopPropagation();
    this.setState(this.initialState());
  }

  onSelect({key}) {
    this.props.onSelect(key);
  }

  onDeleteAPI(data, e) {
    console.log(data.name);
    e.stopPropagation();
    const apis = Object.assign({}, this.props.value);
    const interfaces = Array.from(apis.interfaces).filter(api => api.name !== data.name);
    apis.interfaces = interfaces;

    this.props.onChange(apis);
    this.setState(this.initialState());
  }

  onAdd() {
    this.props.onDeSelect();
  }

  renderCateMenu(data) {
    const editable = data.name === this.state.editElement;
    if (editable) {
      return (
        <div className="sub-menu-title">
          <Input style={{width: '120px'}} value={this.state.editData} onChange={this.onUpdate.bind(this)} />
          <div className="sub-menu-opt">
            <Icon type="save" onClick={this.onSave.bind(this)}/>
            <Popconfirm
              title="确认取消？"
              onConfirm={this.onCancel.bind(this)}
            >
              <Icon type="close-circle" onClick={e => e.stopPropagation()}/>
            </Popconfirm>
          </div>
        </div>
      );
    }

    return (
      <div className="sub-menu-title">
        <span>{data.name}</span>
        <div className="sub-menu-opt">
          <Icon type="edit" onClick={this.onEdit.bind(this, data)} />
          <Popconfirm
            title="确认删除？"
            onConfirm={this.onDelete.bind(this, data)}
          >
            <Icon type="close-circle" />
          </Popconfirm>
        </div>
      </div>
    );
  }

  renderSubMenu(data) {
    if (data.name === this.props.value.name) {
      return <Menu.Item disabled key="title">
        {data.name}
        <div style={{float: 'right'}}>
          <Button
            ghost
            size="small"
            icon="plus"
            shape="circle"
            style={{paddingLeft: '4px'}}
            onClick={this.onAdd.bind(this)}
          ></Button>
        </div>
      </Menu.Item>;
    }

    if (!Array.isArray(data.children) || !data.children.length) {
      return null;
    }

    return (
      <SubMenu key={data.name} title={this.renderCateMenu(data)}>
        {data.children.map(item =>
          <Menu.Item key={item.name}>
            <div className="sub-menu-title">
              {item.name}
              <div className="sub-menu-opt">
                <Popconfirm
                  title="确认删除？"
                  onConfirm={this.onDeleteAPI.bind(this, item)}
                >
                  <Icon type="close-circle" />
                </Popconfirm>
              </div>
            </div>
          </Menu.Item>)}
      </SubMenu>
    );
  }

  render() {
    let list = [{name: this.props.value.name, children: []}];
    let defaultOpenKeys = [];

    if (
      Array.isArray(this.props.value.interfaces) &&
      this.props.value.interfaces.length
    ) {
      let listAPI = {};
      this.props.value.interfaces.forEach(function(api) {
        if (!Array.isArray(listAPI[api.cate])) {
          listAPI[api.cate] = [];
        }
        listAPI[api.cate].push(api);
      });
      listAPI = Object.keys(listAPI).map(item => ({name: item, children: listAPI[item]}));
      list = [...list, ...listAPI];

      defaultOpenKeys = listAPI.map(data => data.name);
    }

    return (
      <Menu
        mode="inline"
        theme="dark"
        defaultOpenKeys={defaultOpenKeys}
        style={{ height: '100%' }}
        onSelect={data => this.onSelect(data)}
      >
        {list.map(data => this.renderSubMenu(data))}
      </Menu>
    );
  }
}
