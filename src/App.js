import './App.css';
import Hero from './Hero';
import Result from './Result';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">{/* <Hero></Hero> */}</div>

      <Switch>
        <Route path="/result">
          <Result />
        </Route>
        <Route path="/">
          <Hero />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
