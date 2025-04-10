import { Route, Switch } from "wouter";
import {
  HomeScreen,
  PrivateScreen,
  UserHomeScreen,
  Equipment,
  HistoricalLoans,
  UserProfile,
  PrivateScreen,
  LoginScreen,
  RegisterScreen
} from "../screens";

export const Router = () => {
  return (
    <>
      <Switch>
        <Route path="/" component={HomeScreen} />
        <Route path="/private" component={PrivateScreen} />
        <Route path="/home" component={UserHomeScreen} />
        <Route path="/equipos" component={Equipment} />
        <Route path="/prestamos-realizados" component={HistoricalLoans} />
        <Route path="/perfil" component={UserProfile} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
      </Switch>
    </>
  );
};
