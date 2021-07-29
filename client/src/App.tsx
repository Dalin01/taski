import './bootwatch.simplex.css'; // theme
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './components/login/Login';

function App() {
  return (
    <Router>
      <Header />
      <Route path="/login" exact>
        <Login />
      </Route>
      <Footer />
    </Router>
  );
}

export default App;
