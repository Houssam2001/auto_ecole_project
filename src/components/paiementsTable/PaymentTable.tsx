import { useEffect, useState } from "react";
import './datatable.scss'
import { DataGrid, GridColDef,frFR } from "@mui/x-data-grid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import DepenseModal from "./DepensesForm";

const PaymentTable = () => {
  const supabase = createClientComponentClient()
  const [data, setData] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([]); // New state for storing client data

  const columns: GridColDef[] = [
    { field: "date", headerName: "Date", width: 150 },
    { field: "value", headerName: "Valeur", width: 150 },
    { field: "CIN", headerName: "CIN", width: 150 },
    { field: "nom", headerName: "Client Name", width: 200 }, // New field for client name
    { field: "category", headerName: "Client Permis", width: 200 }, // New field for client name
    

    // { field: "Commentaire", headerName: "Commentaire", width: 350 },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <div className="cellAction">
    //         <Link href={`/transactions/${params.row.id}`} style={{ textDecoration: "none" }}>
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
      const { data: transactions, error } = await supabase.from("transactions").select("*");
      if (error) {
        throw new Error("Error fetching transactions.");
      }
      setData(transactions);
      console.log(transactions)
      const clientIds = transactions.map(transaction => transaction.client_id);
      const { data: clientData, error: clientError } = await supabase
        .from("clients")
        .select("*")
        .in("id", clientIds);
      if (clientError) {
        throw new Error("Error fetching clients.");
      }
      setClients(clientData);
    } catch (error: any) {
      console.error(error);
    }

  };
  useEffect(() => {
    fetchDepenses();
  }, [[supabase, setData]]);
  const handleDelete = async (id: any) => {
    try {
      setData((prevData) => prevData.filter((item: any) => item.id !== id));
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="datatable  group-enabled">
      <div className="datatableTitle">
        {/* Add New User */}
        {/* <Link href="/new" className="link"> */}
        {/* <DepenseModal/> */}
        {/* </Link> */}
      </div>
      <div style={{ height: 530, width: "100%" }}>
        <DataGrid
          rows={data.map(transaction => ({
            ...transaction,
            nom: clients.find(client => client.id === transaction.client_id)?.nom || 'N/A',
            category: clients.find(client => client.id === transaction.client_id)?.category || 'N/A',
            CIN: clients.find(client => client.id === transaction.client_id)?.CIN || 'N/A',

          }))} columns={columns} 
          
          localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
          />
      </div>
    </div>
  );
};

export default PaymentTable;
