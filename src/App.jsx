import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Error404 from "./components/Error404";
import Header from "./components/Header";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import Solicitud from "./pages/Solicitud";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/inicio/" component={Inicio} />
        <Route exact path="/solicitud/:idSolicitud" component={Solicitud} />
        <Route path='*' exact={true} component={Error404} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
