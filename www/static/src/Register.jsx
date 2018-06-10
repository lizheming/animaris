import React, {PureComponent} from 'react';
import { Alert, Form, Input, Button, Popover, Progress } from 'antd';
import {Link} from 'react-router-dom';
import rq from './components/request';

const FormItem = Form.Item;

const passwordStatusMap = {
  ok: <div>强度：强</div>,
  pass: <div>强度：中</div>,
  poor: <div>强度：太短</div>
};

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception'
};

export default Form.create()(class extends PureComponent {
  state = {
    notice: ''
  }

  getPasswordStatus = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  checkConfirm = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      // eslint-disable-next-line
      callback('两次输入的密码不匹配!');
    } else {
      callback();
    }
  };

  checkPassword = (rule, value, callback) => {
    if (!value) {
      this.setState({
        help: '请输入密码！',
        visible: !!value
      });
      // eslint-disable-next-line
      callback('error');
    } else {
      this.setState({
        help: ''
      });
      if (!this.state.visible) {
        this.setState({
          visible: !!value
        });
      }
      if (value.length < 8) {
        // eslint-disable-next-line
        callback('error');
      } else {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
    }
  };

  changePrefix = value => {
    this.setState({
      prefix: value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    return this.props.form.validateFields({force: true}, async(err, values) => {
      if (err) {
        return true;
      }

      const resp = await rq.post('/api/user', values);
      if (resp.errno) {
        if (typeof resp.errmsg === 'string') {
          return this.setState({notice: resp.errmsg});
        }

        const errFirst = Object.keys(resp.errmsg)[0];
        return this.setState({notice: resp.errmsg[errFirst]});
      }

      this.setState({
        success: true
      });
      setTimeout(() => {
        location.href = '/login';
      }, 500);
    });
  };

  renderPasswordProgress = () => {
    const { form } = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };

  render() {
    const { form, submitting } = this.props;
    const { getFieldDecorator } = form;

    const {notice, success} = this.state;
    return (
      <div className="login">
        <h1>Animaris</h1>
        {
          (success || notice) &&
            <Alert
              style={{ marginBottom: 24 }}
              message={success ? '注册成功' : notice}
              type={success ? 'success' : 'error'}
              showIcon
              closable
            />
        }
        <Form onSubmit={this.onSubmit}>
          <FormItem>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '请输入用户名'
                },
                {
                  pattern: /[a-z0-9-_.]{4,}/i,
                  message: '用户名不合法'
                }
              ]
            })(<Input size="large" placeholder="用户名" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('display_name', {
              rules: [
                {
                  required: true,
                  message: '请输入个人昵称'
                },
                {
                  pattern: /.{4,10}/,
                  message: '昵称不合法'
                }
              ]
            })(<Input size="large" placeholder="用户昵称" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: '请输入邮箱地址！'
                },
                {
                  type: 'email',
                  message: '邮箱地址格式错误！'
                }
              ]
            })(<Input size="large" placeholder="邮箱" />)}
          </FormItem>
          <FormItem help={this.state.help}>
            <Popover
              content={
                <div style={{ padding: '4px 0' }}>
                  {passwordStatusMap[this.getPasswordStatus()]}
                  {this.renderPasswordProgress()}
                  <div style={{ marginTop: 10 }}>
                    请至少输入 8 个字符。请不要使用容易被猜到的密码。
                  </div>
                </div>
              }
              overlayStyle={{ width: 240 }}
              placement="right"
              visible={this.state.visible}
            >
              {getFieldDecorator('password', {
                rules: [
                  {
                    validator: this.checkPassword
                  }
                ]
              })(<Input size="large" type="password" placeholder="至少8位密码，区分大小写" />)}
            </Popover>
          </FormItem>
          <FormItem>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: '请确认密码！'
                },
                {
                  validator: this.checkConfirm
                }
              ]
            })(<Input size="large" type="password" placeholder="确认密码" />)}
          </FormItem>
          <FormItem>
            <Button
              size="large"
              loading={submitting}
              type="primary"
              htmlType="submit"
              style={{width: 184}}
            >
              注册
            </Button>
            <Link to="/login" style={{float: 'right'}}>
              使用已有账户登录
            </Link>
          </FormItem>
        </Form>
      </div>
    );
  }
});
