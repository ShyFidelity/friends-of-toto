import * as React from 'react';
import { useProfileContext } from '../../utils/GlobalState';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import UploadButton from '../Upload/UploadButton';
import {Link} from 'react-router-dom'
import Auth from '../../utils/auth';

import Toto from '../../images/totothicc.svg';
import '../StickyHeader/StickyHeader.css'

const pages = ['Following', 'Discover' ];

const StickyHeader = () => {
  const [state] = useProfileContext();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { profilePic } = state;
    
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
     <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
               <img src={Toto} width="80px"  alt="" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
         
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link 
                      className='drop-custom-link'
                      to={`/${page}`}
                    >
                      {page} 
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
       
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
           <img src={Toto} width="80px" alt="" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                 <Typography textAlign="center">
                      <Link 
                      className="custom-link"
                      to={`/${page}`}>
                      {page} </Link>
                      </Typography>
              </Button>
            ))}
          </Box>
          <UploadButton className="upload-btn" />
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Profile Pic" src={profilePic} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem 
                onClick={handleCloseNavMenu}>                      
                <Typography
              
                  textAlign="center"
                >
                  <Link 
                    className='drop-custom-link'
                    to='/me'
                  >
                    Profile 
                  </Link>
                </Typography>
              </MenuItem> 
              <MenuItem  
                onClick={handleCloseUserMenu}>
                <Typography
                className='drop-custom-link'
                style={{  fontFamily: 'little-dinosaur' }} 
                  textAlign="center"
                  onClick={logout}
                >
                  Logout
                </Typography>
              </MenuItem>   
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default StickyHeader;
