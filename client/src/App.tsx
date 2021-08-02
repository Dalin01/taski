import './bootwatch.simplex.css'; // theme
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/header/Header';
// import Footer from './components/footer/Footer';
import Login from './views/login/Login';
import RegisterView from './views/register/Register';
import Workspaces from './views/workspaces/Workspaces';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import { State } from './types';
import Logout from './views/logout/Logout';
import Workspace from './views/workspace/Workspace';

function App() {
  const { user }: { user: State } = useSelector((state: any) => state.user);

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/workspace/:id/:name">
          <Workspace />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <RegisterView />
        </Route>

        <Route path="/workspaces">
          <Workspaces />
        </Route>

        <Route exact path="/">
          {user ? <Redirect to="/workspaces" /> : <Login />}
        </Route>

        <Route path="/logout">
          <Logout />
        </Route>
      </Switch>

      {/* <Footer /> */}
    </Router>
  );
}

export default App;
