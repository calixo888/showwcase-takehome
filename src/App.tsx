import React from 'react';
import Home from './pages/Home';
import Showcase from './pages/Showcase';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/showcase">
            <Showcase />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
