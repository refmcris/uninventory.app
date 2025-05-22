import { Route, Switch } from "wouter";
import {
  HomeScreen,
  PrivateScreen,
  UserHomeScreen,
  Equipment,
  MostUsedEquipmentsScreen,
  DashboardScreen,
  HistoricalLoans,
  UserProfile,
  LoginScreen,
  RegisterScreen,
  ActiveInactiveEquipmentsScreen,
  ActiveInactiveLoansScreen,
  ActiveInactiveUsersScreen,
  EquipmentManagementScreen,
  LoansManagement
} from "../screens";
import { UserManagement } from "../components";

export const Router = () => {
  return (
    <>
      <Switch>
        <Route path="/" component={HomeScreen} />
        <Route path="/private" component={PrivateScreen} />
        <Route path="/home" component={UserHomeScreen} />
        <Route path="/equipos" component={Equipment} />
        <Route path="/dashboard" component={DashboardScreen} />
        <Route
          path="/mostUsedEquipments"
          component={MostUsedEquipmentsScreen}
        />
        <Route path="/prestamos-realizados" component={HistoricalLoans} />
        <Route path="/perfil" component={UserProfile} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route
          path="/activeInactiveEquipments"
          component={ActiveInactiveEquipmentsScreen}
        />
        <Route
          path="/activeInactiveLoans"
          component={ActiveInactiveLoansScreen}
        />
        <Route
          path="/activeInactiveUsers"
          component={ActiveInactiveUsersScreen}
        />
        <Route
          path="/equipment-management"
          component={EquipmentManagementScreen}
        />
        <Route path="/dashboard-usuarios" component={UserManagement} />
        <Route path="/loans-management" component={LoansManagement} />
      </Switch>
    </>
  );
};
