import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

import Auth from '../../utils/auth';
import '../../styles/Nav.css';

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

const Header = () => {
  const classes = useStyles();
  
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <div className={classes.root}>
      <header className="bg-info text-dark mb-4 py-3 display-flex align-center">
        <button className="btn btn-lg btn-light m-2" onClick={logout}>Logout</button>
        <ButtonGroup variant="text" color="primary" aria-label="outlined primary button group">
          <Button><NavLink to="/profile" className={isActive => 
            "nav-link" + (!isActive ? " unselected" : "")}>Profile</NavLink>
          </Button>
          <Button><NavLink to='/following' className={isActive => 
            "nav-link" + (!isActive ? " unselected" : "")}>Following</NavLink></Button>
          <Button><NavLink to='/discover' className={isActive => 
            "nav-link" + (!isActive ? " unselected" : "")}>Discover</NavLink></Button>
        </ButtonGroup>
      </header>
    </div>
  );
};

export default Header;
