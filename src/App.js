import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import SimpleMap from './mapView';
import Home from './Home';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/attractions">Attractions</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Routes>s and
            renders the first one that matches the current URL */}
        <Switch>
          <Route path="/attractions">
            <SimpleMap />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
