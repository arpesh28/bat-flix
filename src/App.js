import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

// Screens
import HomePage from './screens/Home/HomePage'

function App() {
  return (
    <Router className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        {/* <Route exact path="/search" component={HomePage} /> */}
      </Switch>
    </Router>
  );
}

export default App;
