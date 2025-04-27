import { Route, Switch } from "wouter";
import {
  HomeScreen,
  PrivateScreen,
  UserHomeScreen,
  Equipment,
  MostUsedEquipmentsScreen,
  DashboardScreen
} from "../screens";

export const Router = () => {
  return (
    <>
      <Switch>
        <Route path="/" component={HomeScreen} />
        <Route path="/private" component={PrivateScreen} />
        <Route path="/home" component={UserHomeScreen} />
        <Route path="/equipment" component={Equipment} />
        <Route path="/dashboard" component={DashboardScreen} />
        <Route path="/mostUsedEquipments" component={MostUsedEquipmentsScreen} />
      </Switch>
    </>
  );
};
