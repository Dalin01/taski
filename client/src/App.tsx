import './bootwatch.simplex.css'; // theme
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './views/login/Login';
import RegisterView from './views/register/Register';
import Workspaces from './views/workspaces/Workspaces';

function App() {
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

      {/* <Footer /> */}
    </Router>
  );
}

export default App;
