import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Colors from "./Colors";
import Color from "./Color";
import ColorNew from "./ColorNew";

function Routes() {
  const INITIAL_STATE = [
    { color: "#326da8", name: "blue" },
    { color: "#7932a8", name: "purple" },
  ];
  const [colors, setColors] = useState(INITIAL_STATE);

  return (
    <Switch>
      <Route exact path="/colors">
        <Colors colors={colors} />
      </Route>
      <Route path="/colors/new">
        <ColorNew setColors={setColors} />
      </Route>
      <Route path="/colors/:name">
        <Color colors={colors} />
      </Route>
      <Redirect to="/colors"></Redirect>
    </Switch>
  );
}

export default Routes;
