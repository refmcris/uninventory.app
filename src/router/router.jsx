import { Route, Switch } from "wouter";
import { HomeScreen, PrivateScreen, LoginScreen, RegisterScreen } from "../screens";

export const Router = () => {
  return (
    <>
      <Switch>
        <Route path="/" component={HomeScreen} />
        <Route path="/private" component={PrivateScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
      </Switch>
    </>
  );
};
