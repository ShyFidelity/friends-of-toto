import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './styles/App.css';
import Landing from './pages/Landing';
import Profile from './pages/Profile';
import Following from './pages/Following';
import Discover from './pages/Discover';

function App() {
  return (
    <Router>
      <div className="container">
      {/* <Nav /> */}
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/following" component={Following} />
        <Route exact path="/discover" component={Discover} />
      </Switch>
      </div>
    </Router>
  );
}

export default App;
