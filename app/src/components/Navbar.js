import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Logo from '../assets/img/branding.jpg'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: '16px'
  },
  title: {
    flexGrow: 1
  },
  imagen: {
    borderRadius: '50%'
  }
}))

function Navbar (props) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' className={classes.menuButton} color='inherit'>
            <MenuIcon />
          </IconButton>

          <Typography variant='h6' className={classes.title}>
            Informacion ADA4D
          </Typography>

          <IconButton color='inherit'>
            <img src={Logo} width='40px' height='40px' alt='' className={classes.imagen} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar
