import { IonButton, IonSpinner } from "@ionic/react";
import { Link } from "react-router-dom";
import useLogoutUser from "../../hooks/useLogoutUser";

function Links() {
  const { logoutUser, isMutating: isLogoutLoading } = useLogoutUser();
  return (
    <>
      <Link to="/dashboard" style={{ color: "#000" }}>
        Dashboard
      </Link>
      &nbsp;
      <Link to="/clients" style={{ color: "#000" }}>
        Clients
      </Link>
      <IonButton onClick={logoutUser} disabled={isLogoutLoading}>
        Logout
        {isLogoutLoading && <IonSpinner />}
      </IonButton>
    </>
  );
}

export default Links;
