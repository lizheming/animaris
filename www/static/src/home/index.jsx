import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import React from 'react';
import {Layout} from 'antd';
import {render} from 'react-dom';

import Auth from './components/Auth';
import Header from './components/Header';
import Home from './components/Home';
import Edit from './components/Edit';
import Login from './components/Login';
import Mock from './components/Mock';

global.React = React;

render((
  <Router>
    <Layout>
      <Header />
      <Layout.Content style={{ padding: '30px 50px 0' }}>
        <Auth.Route exact={true} path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Auth.Route path="/d/:id" component={Edit} />
        <Auth.Route path="/mock/:id" component={Mock} />
      </Layout.Content>
      <Layout.Footer style={{textAlign: 'center'}}>
        Animaris Platform ©2018 Created by Lizheming
      </Layout.Footer>
    </Layout>
  </Router>
), document.getElementById('app'));
