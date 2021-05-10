import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import "bootstrap/dist/css/bootstrap.min.css";

// Screens
import HomePage from './screens/Home/HomePage'
import Search from './screens/Search/Search'

function App() {
  return (
    <Router className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/search" component={Search} />
        {/* <Route exact path="/search" component={HomePage} /> */}
      </Switch>
    </Router>
  );
}

export default App;
