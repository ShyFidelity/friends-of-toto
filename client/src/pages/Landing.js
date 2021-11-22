import { Link } from 'react-router-dom';
import toto from '../images/toto.svg';
// import paw from '../images/pawlike.svg';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

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
        <p>
          A social network for animals because people talk too much. 
        </p>
        {/* <img src= {paw} alt= "paw like btn" /> */}
        <ButtonGroup color="secondary" variant="contained" aria-label="contained secondary button group">
          <Button><Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>Login</Link></Button>
          <Button><Link to='/signup' style={{ textDecoration: 'none', color: 'white' }}>Create Account</Link></Button>
        </ButtonGroup>
      </header>
    </div>
  )
}