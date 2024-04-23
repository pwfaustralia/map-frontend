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
import Route from "./components/templates/Route";
import ClientDashboard from "./pages/client-dashboard/ClientDashboard";
import ClientsPage from "./pages/clients/ClientsPage";
import LoginPage from "./pages/login/LoginPage";
import "./theme/variables.css";
import LoginTemplate from "./components/templates/login/LoginTemplate";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/login" redirectIfLoggedIn>
            <LoginTemplate>
              <LoginPage />
            </LoginTemplate>
          </Route>

          <Route exact path="/clients" scopeName="view-all-clients">
            <ClientsPage />
          </Route>

          <Route exact path="/dashboard">
            <ClientDashboard />
          </Route>

          <Route>
            <h1>404</h1>
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
