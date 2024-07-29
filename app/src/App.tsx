import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/* Theme variables */
import AS_ClientsPage from "./pages/admins-and-staffs/clients/AS_ClientsPage";
import C_Dashboard from "./pages/clients/client-dashboard/C_Dashboard";
import PageNotFound from "./pages/common/PageNotFound";
import Route from "./pages/common/Route";
import LoginPage from "./pages/common/login/LoginPage";
import "./theme/variables.css";
import { routes } from "./helpers";
import AS_AddClientPage from "./pages/admins-and-staffs/add-client/AS_AddClientPage";
import DashboardTemplate from "./components/templates/dashboard/default/DashboardTemplate";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path={routes.common.login}>
            <LoginPage />
          </Route>

          <Route exact path={routes.AS.clients} scopeName="view-all-clients">
            <AS_ClientsPage />
          </Route>
          <Route exact path={routes.AS["add-client"]} scopeName="create-clients">
            <AS_AddClientPage />
          </Route>

          <Route exact path={routes.C.dashboard}>
            <C_Dashboard />
          </Route>

          <Route>
            <PageNotFound />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
