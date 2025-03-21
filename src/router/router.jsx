import { Route, Switch } from "wouter";
import {
  HomeScreen,
  PrivateScreen,
  UserHomeScreen,
  Equipment
} from "../screens";

export const Router = () => {
  return (
    <>
      <Switch>
        <Route path="/" component={HomeScreen} />
        <Route path="/private" component={PrivateScreen} />
        <Route path="/home" component={UserHomeScreen} />
        <Route path="/equipment" component={Equipment} />
      </Switch>
    </>
  );
};
