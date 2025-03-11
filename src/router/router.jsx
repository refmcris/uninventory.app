import { Route, Switch } from "wouter";
import { HomeScreen } from "../screens";

export const Router = () => {
  return (
    <>
      <Switch>
        <Route path="/" component={HomeScreen} />
      </Switch>
    </>
  );
};
