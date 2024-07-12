import ClientsTable from "../../../components/organisms/clients-table/ClientsTable";
import DashboardTemplate from "../../../components/templates/dashboard/default/DashboardTemplate";
import "./AS_ClientsPage.css";

function AS_ClientsPage() {
  return (
    <DashboardTemplate>
      <ClientsTable countPerPage={20} />
    </DashboardTemplate>
  );
}

export default AS_ClientsPage;
