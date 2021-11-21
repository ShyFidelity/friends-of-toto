import { Link } from 'react-router-dom';
import toto from '../images/toto.svg';
// import paw from '../images/pawlike.svg';

export default function Landing() {
    return (
        <div className="Landing">
          <header className="App-header">
          <img src={toto} className="App-logo" alt="toto dog logo" />
            <h1>Friends of Toto!</h1>
            <p>
              A social network for animals because people talk too much. 
            </p>
          {/* <img src= {paw} alt= "paw like btn" /> */}
          <Link to="/login">Login</Link>
          <br />
          <Link to="/signup">Create Account</Link>
          </header>
      </div>
    )
    
}
