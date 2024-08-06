import InputWithLabel from "../../../components/molecules/input-with-label/InputWithLabel";
import DashboardTemplate from "../../../components/templates/dashboard/default/DashboardTemplate";

function AS_AddClientPage() {
  return (
    <DashboardTemplate>
      <h1>Add New Client</h1>
      <InputWithLabel label="Testing" />
    </DashboardTemplate>
  );
}

export default AS_AddClientPage;
