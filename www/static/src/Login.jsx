import {PureComponent} from 'react';
import {Alert} from 'antd';
import Login, {UserName, Password, Submit} from 'ant-design-pro/lib/Login';
import rq from './components/request';

export default class extends PureComponent {
  state = {
    notice: ''
  }

  onSubmit = async(err, values) => {
    if (err) {
      return false;
    }

    const resp = await rq.post('/api/token', values);
    if (resp.errno) {
      return this.setState({
        notice: resp.errmsg
      });
    }
    location.href = '/';
  }

  render() {
    return (
      <div className="login">
        <h1>Animaris</h1>
        {
          this.state.notice &&
            <Alert style={{ marginBottom: 24 }} message={this.state.notice} type="error" showIcon closable />
        }
        <Login onSubmit={this.onSubmit}>
          <UserName name="username" name="credential" placeholder="用户名" />
          <Password name="password" name="password" placeholder="密码" />
          <Submit style={{ width: '100%' }}>登录</Submit>
          {/* <Link to="/register" style={{ float: 'right' }}>注册</Link> */}
        </Login>
      </div>
    );
  }
}
