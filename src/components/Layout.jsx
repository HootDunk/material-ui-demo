import { makeStyles } from '@material-ui/core'
import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/ToolBar'
import Avatar from '@material-ui/core/Avatar'
import { AddCircleOutlined, SubjectOutlined } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router';
import { format } from  'date-fns'

const drawerWidth = 240;

// passing in a function lets us pass the theme object to make changes to it directly
const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    page: {
      backgroundColor: "#f9f9f9",
      width: '100%',
      padding: theme.spacing(3)
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    active: {
      background: '#f4f4f4'
    },
    title: {
      padding: theme.spacing(2),
    },
    toolbar: theme.mixins.toolbar,
    date: {
      flexGrow: 1, // flexGrow of one takes up all possible horizontal space availablee
      // hence pushing the username all the way to the right
    },
    avatar: {
      marginLeft: theme.spacing(2)
    }
  }
})

// for 

export default function Layout({children}) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation(); // use in check-ins app


  const menuItems = [
    {
      text: 'My Notes',
      icon: <SubjectOutlined color="secondary" />,
      path: '/'
    },
    {
      text: 'Create Note',
      icon: <AddCircleOutlined color="secondary" />,
      path: '/create'
    },

  ]
  
  return (
    <div className={classes.root}>

      <AppBar 
        className={classes.appBar}
        elevation={0}
      >
        <ToolBar>
          <Typography className={classes.date}>
            Today is the { format(new Date(), 'do MMMM Y') }
          </Typography>
          <Typography>
            Josh
          </Typography>
          <Avatar src="/mario-av.png" className={classes.avatar}/>
        </ToolBar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography variant="h5" className={classes.title}>
            Ninja Notes
          </Typography>
        </div>

        <List>
          {menuItems.map(item => (
            <ListItem 
              button
              key={item.path}
              onClick={() => history.push(item.path)}
              className={location.pathname === item.path && classes.active? location.pathname : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  )
}

// toolbar div shares same height as the height of the <Toolbar> component. The
// difference is that the div we create is within the normal flow of the document.
// whereas the toolbar component is within the Appbar component and it gets removed
// from the normal flow of the document. 
