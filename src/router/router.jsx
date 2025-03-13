import { Route, Switch } from "wouter";
import { HomeScreen, PrivateScreen } from "../screens";

export const Router = () => {
  return (
    <>
      <Switch>
        <Route path="/" component={HomeScreen} />
        <Route path="/private" component={PrivateScreen} />
      </Switch>
    </>
  );
};
