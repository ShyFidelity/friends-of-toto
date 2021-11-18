
import './App.css';
import paw from './images/pawlike.svg'
import Nav from './navigation'
import toto from './images/toto.svg'
//import nav bar use in return 
function App() {
  return (
 
    <div className="App">
         
      <header className="App-header">
      <img src={toto} className="App-logo" alt="toto dog logo" />
        <h1>Friends of Toto!</h1>
        < Nav/>
        <p>
          A social network for animals because people talk to much. 
        </p>
       <img src= {paw} alt= "paw like btn" />
        </header>
        <div className= "container"> 
        <div className="divbox"> 
        <p> ❤  <b> RemiHound </b> today i was pretty happy even though in this picture i look sad truth is i actually look sad like all the time so it's really not a big deal it just makes people give me more treats tbh</p>
        </div>
        </div>
    
    </div>
  );
}

export default App;
