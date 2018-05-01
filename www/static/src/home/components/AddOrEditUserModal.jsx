import {PureComponent} from 'react';
import {Modal, Form, Select, Spin} from 'antd';
import rq from './request';

export default Form.create({
  // mapPropsToFields({model}) {
  //   if (!model || !Object.keys(model).length) {
  //     return;
  //   }

  //   return {
  //     users: Form.createFormField(
  //       model.users.map(user => ({
  //         text: user.display_name || user.name,
  //         value: user._id
  //       }))
  //     )
  //   };
  // }
})(class extends PureComponent {
  state = {
    data: [],
    fetching: false
  }

  fetchUser = async keyword => {
    this.setState({data: [], fetching: true});
    const resp = await rq.get('/api/user?keyword=' + keyword);
    const data = resp.data.data.map(user => ({
      text: user.display_name || user.name,
      value: user._id
    }));
    this.setState({data, fetching: false});
  }

  render() {
    const {visible, onOk, onCancel, form, model} = this.props;
    const {getFieldDecorator} = form;
    const {fetching, data} = this.state;

    const defaultUsers = model ? model.users.map(user => ({
      key: user._id,
      label: user.display_name || user.name
    })) : [];

    return (
      <Modal
        title="编辑成员"
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
      >
        <Form layout="vertical">
          <Form.Item label="成员名称">
            {getFieldDecorator('users', {
              initialValue: defaultUsers,
              rules: [
                {
                  required: true,
                  message: '请输入成员名称'
                }
              ]
            })(<Select
              mode="multiple"
              labelInValue
              placeholder="请输入用户"
              notFoundContent={fetching ? <Spin size="small" /> : null}
              filterOption={false}
              onSearch={this.fetchUser}
              onChange={this.handleChange}
            >
              {this.state.data.map(user => <Select.Option key={user.value} value={user.value}>{user.text}</Select.Option>)}
            </Select>)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
});
