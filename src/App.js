import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import { purple } from '@material-ui/core/colors'
import Layout from './components/Layout'

// function takes object as arg which represents the theme we want to create (which 
// properties we want to overide from the default)

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fefefe',
    },
    // using a color palette provided material ui.  
    // All the purple colors now applied to secondary (main, light, dark, contrast text)
    secondary: purple
  },
  // example of changing theme typography
  typography: {
    fontFamily: 'Quicksand', // reference name of font from import in index.css
    fontWeightLight: 400,
    fontWeightRegular: 400,
    fontWeightMedium: 400,
    fontWeightBold: 400,
  }

})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Notes />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
