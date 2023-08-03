import "./datatable.scss";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../app/datatablesource";
// import { Link } from "next/link";
import { useEffect, useState } from "react";
import Link from "next/link";

const Datatable = () => {


  const rows: GridRowsProp = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    {
      id: 3, col1: 'MUI', col2: 'is Amazing',
    }
  ];
  const [data, setData] = useState(rows);
  const handleDelete = (id: number) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Nom', width: 150 },
    { field: 'col2', headerName: 'CIN', width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link href="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link href="/new" className="link">
          Add New
        </Link>
      </div>
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid rows={data} columns={columns} />
      </div>
    </div>
  );
};

export default Datatable;
