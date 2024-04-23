import { MRT_TableInstance, MaterialReactTable, MaterialReactTableProps } from "material-react-table";

interface MaterialTableProps {
  table: MRT_TableInstance<any>;
}

type MRTProps = MaterialTableProps & MaterialReactTableProps<any>;

function MaterialTable(props: MRTProps) {
  const { table, ...materialTableProps } = props;

  return <MaterialReactTable {...materialTableProps} table={table} />;
}

export default MaterialTable;
