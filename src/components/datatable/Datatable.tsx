import { useEffect, useState } from "react";
import './datatable.scss'
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const Datatable = () => {
  const supabase = createClientComponentClient()
  const [data, setData] =useState<any[]>([])
  const columns: GridColDef[] = [
    { field: "CIN", headerName: "Cin", width: 250 },
    { field: "nom", headerName: "nom", width: 250 },
    { field: "prenom", headerName: "prenom", width: 250 },
    { field: "phone", headerName: "Telephone", width: 250 },
    { field: "inscrit", headerName: "date d'inscription", width: 250 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link href={`/users/${params.row.id}`} style={{ textDecoration: "none" }}>
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
  const fetchClients = async () => {
    try {
      const  {data:clients,error}  = await supabase.from("clients").select("*");
      if (error)   {
        throw new Error("Error fetching clients.");
      }
      setData(clients);
      console.log(clients)
    } catch (error:any) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchClients();
  }, [[supabase, setData]]);
  const handleDelete = async (id:any) => {
    try {
      setData((prevData) => prevData.filter((item:any) => item.id !== id));
    } catch (error:any) {
      console.error(error.message);
    }
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link href="/new" className="link">
          Add New
        </Link>
      </div>
      <div style={{ height: 530, width: "100%" }}>
        <DataGrid rows={data} columns={columns} />
      </div>
    </div>
  );
};

export default Datatable;
