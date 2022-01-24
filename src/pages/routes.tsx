import React from "react";
import Home from "pages/home";

import { Link, Route, Switch } from "react-router-dom";
const Routes = () => (
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
);

export default Routes;
