import React from 'react';
import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx"
import NavBar from "./components/Navbar/Navbar.jsx"
import Home from "./containers/Home/Home.jsx"
import Search from "./containers/Search/Search";
import Create from "./containers/Create/Create.jsx"
import About from "./components/About/About.jsx"
import PkDetail from "./containers/PkDetail/PkDetail.jsx";
import "./App.css";


function App() {

  return (
    <div className="App">
      <React.Fragment>
        <Route exact path="/" component={LandingPage} />

        <Route path="/home" component={NavBar} />
        <Route exact path="/home" component={Home} />

        <Route path="/results" component={NavBar} />
        <Route
          exact path="/results/:name"
          component={Search} 
        />

        <Route path="/pokemons" component={NavBar} />
        <Route
          exact path="/pokemons/:id"
          render={({ match }) => < PkDetail id={match.params.id} />}
        />

        <Route path="/create" component={NavBar} />
        <Route path="/create" exact component={Create} />

        <Route path="/about" component={NavBar} />
        <Route path="/about" component={About} />
        
      </React.Fragment>
    </div>
  );
}

export default App;