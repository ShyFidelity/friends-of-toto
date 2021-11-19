
import './App.css';
import Nav from './components/Navigation'
import Login from './components/Login';
//import nav bar use in return 
function App() {
  return (
    <div className="container">
    <Nav/>
    <Login/>
    </div>
  );
}

export default App;
