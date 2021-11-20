import './styles/App.css';
import Nav from './components/Navigation';
import Landing from './pages/Landing';
import Login from './components/Login';
import NewPet from './pages/NewPet';

function App() {
  return (
    <div className="container">
    <Nav/>
    <Landing />
    <Login/>
    <NewPet />
    </div>
  );
}

export default App;
