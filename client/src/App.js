import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './styles/App.css';
import Landing from './pages/Landing';
import NewPet from './pages/NewPet';

function App() {
  return (
    <Router>
      <div className="container">
      {/* <Nav /> */}
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/manage-pets" component={NewPet} />
      </Switch>
      </div>
    </Router>
  );
}

export default App;
