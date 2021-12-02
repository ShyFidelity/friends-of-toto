import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ProfileProvider } from './utils/GlobalState';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Following from './pages/Following';
import Discover from './pages/Discover';
import NewPost from './pages/NewPost';

import './styles/App.css';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>

<ProfileProvider>
      <Router>
        <div className="container">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path='/login' component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/newpost" component={NewPost} />
          <Route exact path="/me" component={Profile} />
          <Route exact path="/profile" component={Profile}/>
          <Route exact path="/profiles/:username" component={Profile} />
          <Route exact path="/following" component={Following} />
          <Route exact path="/discover" component={Discover} />
        </Switch>
        </div>
      </Router>
 </ProfileProvider>

    </ApolloProvider>
  );
}

export default App;
