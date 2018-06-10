import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import React from 'react';
import {Layout} from 'antd';
import {render} from 'react-dom';

import Auth from './components/Auth';
import Header from './components/Header';
import Home from './Home';
import Edit from './Edit';
import Login from './Login';
import Register from './Register';
import Mock from './Mock';

global.React = React;

render((
  <Router>
    <Layout>
      <Header />
      <Layout.Content style={{ padding: '30px 50px 0' }}>
        <Auth.Route exact={true} path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Auth.Route path="/d/:id" component={Edit} />
        <Auth.Route path="/mock/:id" component={Mock} />
      </Layout.Content>
      <Layout.Footer style={{textAlign: 'center'}}>
        <a href="https://github.com/lizheming/animaris" target="_blank">Animaris</a> Platform ©2018 Created by <a href="https://github.com/lizheming" target="_blank">@lizheming</a>
      </Layout.Footer>
    </Layout>
  </Router>
), document.getElementById('app'));
