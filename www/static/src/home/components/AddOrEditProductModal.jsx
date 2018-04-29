import {PureComponent} from 'react';
import {Modal, Input, Form} from 'antd';

export default Form.create({
  mapPropsToFields({model}) {
    if (!model || !Object.keys(model).length) {
      return;
    }

    return {
      title: Form.createFormField({value: model.title}),
      avatar: Form.createFormField({value: model.avatar}),
      description: Form.createFormField({value: model.description})
    };
  }
})(class extends PureComponent {
  render() {
    const {visible, onOk, onCancel, isEdit, model, form} = this.props;
    const {getFieldDecorator} = form;

    return (
      <Modal
        title={isEdit ? '编辑产品' : '新增产品'}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
      >
        <Form layout="vertical">
          <Form.Item label="产品名称">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '请输入产品名称'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="产品LOGO">
            {getFieldDecorator('avatar', {
              rules: [
                {
                  required: true,
                  message: '请输入产品LOGO'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="产品简介">
            {getFieldDecorator('description', {
              rules: [
                {
                  required: true,
                  message: '请输入产品简介'
                }
              ]
            })(<Input.TextArea autosize={{minRows: 6}}/>)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
});
