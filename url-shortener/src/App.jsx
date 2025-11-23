import './App.css'
import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import DashboardPage from './components/Dashboard/DashboardPage';
import ViewStats from "./components/ViewStats";
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [searchText, setSearchText] = useState("");

  return (
    <>
      <Toaster position="bottom-center" />
      <Router>
        <Header searchText={searchText} setSearchText={setSearchText} />
        <main className="content">
          <Switch>
            <Route exact path="/" >
              <DashboardPage searchText={searchText} />
            </Route>
            <Route path="/code/:code" component={ViewStats} />
          </Switch>
        </main>
        <Footer />
      </Router>
    </>
  )
}

export default App
