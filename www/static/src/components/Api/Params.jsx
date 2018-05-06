import {PureComponent} from 'react';
import {
  Popconfirm,
  Button,
  Table,
  Input,
  Checkbox,
  Icon,
  Switch,
  Select
} from 'antd';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';

const {Option} = Select;
const OPTIONS = {
  integer: '整型',
  string: '字符串',
  boolean: '布尔值',
  array: '数组',
  object: '对象',
  callback: '回调'
};

const EditableCell = ({editable, value, onChange}) => {
  if (!editable) {
    return <Ellipsis tooltip className="ellipsis" lines={1} style={{height: '1.25em'}}>
      {value}
    </Ellipsis>;
  }

  return (
    <Input
      style={{ margin: '-5px 0' }}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
};

export default class extends PureComponent {
  constructor(...args) {
    super(...args);

    this.columns = [{
      title: '名称',
      dataIndex: 'name',
      width: '250px',
      render: this.renderColumns.bind(this, 'name')
    }, {
      title: '类型',
      dataIndex: 'type',
      width: '100px',
      render: this.renderTypeColumns.bind(this, 'type')
    }, {
      title: '必填',
      width: '80px',
      dataIndex: 'required',
      render: this.renderRequireColumns.bind(this, 'required')
    }, {
      title: '备注',
      dataIndex: 'description',
      width: '250px',
      render: this.renderColumns.bind(this, 'description')
    }, {
      title: '举例',
      dataIndex: 'value',
      // width: '350px',
      render: this.renderColumns.bind(this, 'value')
    }, {
      title: '操作',
      dataIndex: 'operation',
      width: '150px',
      render: this.renderOperation.bind(this)
    }];
    this.cacheData = this.data;
  }

  get data() {
    return Array.from(this.props.data);
  }

  set data(newData) {
    this.cacheData = newData.map(item => ({ ...item }));
    return this.props.onChange(newData);
  }

  findData(key, data) {
    const index = data.findIndex(item => item.key === key);
    if (index === -1) {
      return undefined;
    }

    return data[index];
  }

  renderOperation(text, record) {
    const { editable, cleanable } = record;

    if (editable) {
      return (
        <div className="editable-row-operations">
          <a onClick={() => this.save(record.key)}>
            <Icon type="save" /> 保存
          </a><Popconfirm
            title="放弃修改？"
            onConfirm={() => this.cancel(record.key)}
          >
            <a><Icon type="logout" /> 取消</a>
          </Popconfirm>
        </div>
      );
    };

    return (
      <div className="editable-row-operations">
        <a onClick={() => this.edit(record.key)}>
          <Icon type="edit" /> 编辑
        </a><Popconfirm
          title="确认删除该条数据？"
          onConfirm={() => this.onDelete(record.key)}
        >
          <a href="#"><Icon type="delete" /> 删除</a>
        </Popconfirm>
      </div>
    );
  }

  renderColumns(column, text, record) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }

  renderTypeColumns(column, type, {editable, key}) {
    if (!editable) {
      return OPTIONS[type];
    }
    const options = Object.keys(OPTIONS).map(opt =>
      <Option value={opt}>{OPTIONS[opt]}</Option>
    );
    return <Select
      defaultValue={type}
      onChange={newType => this.updateData(key, target => {
        target.type = newType;
      })}
    >{options}</Select>;
  }

  renderRequireColumns(column, required, {editable, key}) {
    const defaultChecked = required !== false;
    if (!editable) {
      if (!defaultChecked) {
        return null;
      }
      return <Icon type="check" />;
    }

    return <Switch
      checkedChildren={<Icon type="check" />}
      unCheckedChildren={<Icon type="cross" />}
      defaultChecked={defaultChecked}
      onChange={checked => this.updateData(key, target => {
        if (checked) { return }
        target.required = false;
      })}
    />;
  }

  updateData(key, cb) {
    const newData = this.data;
    const target = this.findData(key, newData);
    if (!target) { return }
    cb(target, newData);
    this.data = newData;
  }

  /** 删除数据 */
  onDelete(key) {
    const newData = this.data;
    this.data = newData.filter(item => item.key !== key);
  }

  /** 添加一条新数据 */
  handleAdd() {
    const data = this.data.map(record => {
      record.key += 1;
      return record;
    });
    const newData = {
      key: 1,
      name: '',
      type: 'string',
      value: '',
      description: '',
      editable: true
    };
    data.unshift(newData);
    this.data = data;
  }

  /** 编辑按钮点击 */
  edit(key) {
    this.updateData(key, target => target.editable = true);
  }

  /** 保存修改 */
  save(key) {
    this.updateData(key, target => delete target.editable);
  }

  /** 取消修改 */
  cancel(key) {
    this.updateData(key, target => {
      Object.assign(target, this.findData(key, this.cacheData));
      delete target.editable;
    });
  }

  /** 编辑情况下每个 Input 的修改 */
  handleChange(value, key, column) {
    this.updateData(key, target => { target[column] = value });
  }

  render() {
    return (
      <div className="api-params">
        <div className="api-params__title">
          <label>接口参数：</label>
          <Button
            className="editable-add-btn"
            onClick={this.handleAdd.bind(this)}
          >
            <Icon type="plus" />增加
          </Button>
        </div>
        <Table
          bordered
          pagination={false}
          dataSource={this.data}
          columns={this.columns}
        />
      </div>
    );
  }
};
