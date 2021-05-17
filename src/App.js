import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import './App.scss';
import './assets/styles/main.scss';
import { AppHeader } from './cmps/AppHeader/AppHeader';
import { CoinsProvider } from "./context/CoinsContext";
import { CoinsChart } from './pages/CoinsChart/CoinsChart';
import { CoinsTable } from './pages/CoinsTable/CoinsTable';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useMemo, useState } from "react";
import Container from '@material-ui/core/Container';



function App(props) {
  const [prefersDarkMode, setDarkMode] = useState(false);
  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  const toggleDarkMode = () => {
    setDarkMode(!prefersDarkMode);
  }

  return (
    <Container fixed>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Router>
            <AppHeader toggleDarkMode={toggleDarkMode} />
            <>
              <Switch>
                <Redirect exact from="/" to="/table" />
                <CoinsProvider>
                  <Route component={CoinsTable} path={"/table"} />
                  <Route component={CoinsChart} path={"/chart"} />
                </CoinsProvider>
              </Switch>
            </>
          </Router>
        </div>
      </ThemeProvider>
    </Container>
  );
}

export default App;
