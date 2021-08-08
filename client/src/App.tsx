import './bootstrap.sketchy.css'; // theme
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/header/Header';
// import Footer from './components/footer/Footer';
import Login, { InitialState } from './views/login/Login';
import RegisterView from './views/register/Register';
import Workspaces from './views/workspaces/Workspaces';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import { UserType } from './types';
import Logout from './views/logout/Logout';
import Workspace from './views/workspace/Workspace';

function App() {
  const { user }: { user: UserType } = useSelector(
    (state: InitialState) => state.user
  );

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/taskspace/:id/:name">
          <Workspace />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <RegisterView />
        </Route>

        <Route path="/taskspace">
          <Workspaces />
        </Route>

        <Route exact path="/">
          {user && user.token ? <Redirect to="/taskspace" /> : <Login />}
        </Route>

        <Route path="/logout">
          <Logout />
        </Route>

        <Route exact path="/*">
          {user && user.token ? <Redirect to="/taskspace" /> : <Login />}
        </Route>
      </Switch>

      {/* <Footer /> */}
    </Router>
  );
}

export default App;
