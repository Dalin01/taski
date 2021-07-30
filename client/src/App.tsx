import './bootwatch.simplex.css'; // theme
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './views/login/Login';
import RegisterView from './views/register/Register';
import Workspaces from './views/workspaces/Workspaces';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import { State } from './types';
import Logout from './views/logout/Logout';

function App() {
  const loggedIn = useSelector((state: any) => state.userLogin);
  const { user }: { user: State } = loggedIn;

  return (
    <Router>
      <Header />

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
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
