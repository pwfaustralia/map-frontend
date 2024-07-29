import { Link } from "react-router-dom";
import DashboardTemplate from "../../../components/templates/dashboard/default/DashboardTemplate";
import TableWithFilters from "../../../components/templates/table-with-filters/TableWithFilters";
import { useSearchClientsFast } from "../../../services/queries";
import "./AS_ClientsPage.css";
import { routes } from "../../../helpers";
import Button from "../../../components/atoms/button/Button";

function AS_ClientsPage() {
  const tableColumns = [
    {
      accessorKey: "document.first_name",
      header: "First Name",
    },
    {
      accessorKey: "document.last_name",
      header: "Family  Name",
    },
    {
      accessorKey: "document.email",
      header: "Email Address",
    },
    {
      accessorKey: "document.mobile_phone",
      header: "Mobile Phone",
    },
    {
      accessorKey: "document.physical_address.town",
      header: "Town",
    },
    {
      accessorKey: "document.physical_address.street_name",
      header: "Street",
    },
  ];
  return (
    <DashboardTemplate>
      <TableWithFilters
        countPerPage={20}
        tableColumns={tableColumns}
        fetcher={useSearchClientsFast}
        filterByLabel="Filter clients by"
        buttons={
          <Link to={routes.AS["add-client"]} replace={true}>
            <Button>Add New Client</Button>
          </Link>
        }
      />
    </DashboardTemplate>
  );
}

export default AS_ClientsPage;
