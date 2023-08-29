import { useEffect, useState } from "react";
import './datatable.scss'
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import DepenseModal from "./DepensesForm";

const DepensesTable = () => {
  const supabase = createClientComponentClient()
  const [data, setData] =useState<any[]>([])
  const columns: GridColDef[] = [
    { field: "date", headerName: "Date", width: 150 },
    { field: "value", headerName: "Valeur", width: 150 },
    { field: "title", headerName: "Titre", width: 250 },
    { field: "Commentaire", headerName: "Commentaire", width: 350 },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <div className="cellAction">
    //         <Link href={`/depenses/${params.row.id}`} style={{ textDecoration: "none" }}>
    //           <div className="viewButton">View</div>
    //         </Link>
    //         <div
    //           className="deleteButton"
    //           onClick={() => handleDelete(params.row.id)}
    //         >
    //           Delete
    //         </div>
    //       </div>
    //     );
    //   },
    // },
  ];
  const fetchDepenses = async () => {
    try {
      const  {data:depenses,error}  = await supabase.from("depenses").select("*");
      if (error)   {
        throw new Error("Error fetching depenses.");
      }
      setData(depenses);
      console.log(depenses)
    } catch (error:any) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDepenses();
  }, [[supabase, setData]]);
  const handleDelete = async (id:any) => {
    try {
      setData((prevData) => prevData.filter((item:any) => item.id !== id));
    } catch (error:any) {
      console.error(error);
    }
  };

  return (
    <div className="datatable  group-enabled">
      <div className="datatableTitle">
        {/* Add New User */}
        {/* <Link href="/new" className="link"> */}
          <DepenseModal/>
        {/* </Link> */}
      </div>
      <div style={{ height: 530, width: "100%" }}>
        <DataGrid rows={data} columns={columns} />
      </div>
    </div>
  );
};

export default DepensesTable;
