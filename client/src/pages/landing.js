import toto from '../images/toto.svg';
// import paw from '../images/pawlike.svg';
import Login from '../components/Login';

export default function Landing() {
    return (
        <div className="Landing">
        <header className="App-header">
        <Login />
        <img src={toto} className="App-logo" alt="toto dog logo" />
          <h1>Friends of Toto!</h1>
          <p>
            A social network for animals because people talk too much. 
          </p>
         {/* <img src= {paw} alt= "paw like btn" /> */}
          </header>
      </div>
    )
    
}
