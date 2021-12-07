import { Link } from 'react-router-dom';
import toto from '../images/toto.svg';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import '../styles/Landing.css'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Landing() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <header className="App-header">
        <img src={toto} className="App-logo" alt="toto dog logo" />
        <h1>Friends of Toto!</h1>
        <h4>
          A social network for animals because people talk too much. 
        </h4>
          <Button className="landingButton"><Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>Login</Link></Button>
          <Button className="landingButton"><Link to='/signup' style={{ textDecoration: 'none', color: 'white' }}>Create Account</Link></Button>
    
      </header>
    </div>
  )
}
