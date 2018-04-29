import {Route, Redirect} from 'react-router-dom';

const Auth = {
  get isLogin() {
    return global.userInfo.name;
  },
  login() {
    global.location.reload();
  },
  logout() {
    global.location.reload();
  }
};

Auth.Route = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props => {
      if (Auth.isLogin) {
        return <Component {...props} />;
      }

      return <Redirect to={{pathname: '/login', state: {from: props.location}}} />;
    }}
  />
);

export default Auth;
