
import './styles/App.css';
import Nav from './components/Navigation'
import Login from './components/Login';
import NewPet from './pages/NewPet'
//import nav bar use in return 
function App() {
  return (
    <div className="container">
    <Nav/>
    <Login/>
    <NewPet />
    </div>
  );
}

export default App;
