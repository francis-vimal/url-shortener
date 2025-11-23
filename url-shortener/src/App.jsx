import './App.css'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import DashboardPage from './components/Dashboard/DashboardPage';
import ViewStats from "./components/ViewStats";

function App() {
  return (
    <>
      <Toaster position="bottom-center" />

      <Router>
        <Switch>
          <Route exact path="/" component={DashboardPage} />
          <Route path="/code/:code" component={ViewStats} />
        </Switch>
      </Router>
    </>
  )
}

export default App
