import { useEffect, useState } from "react";
import './datatable.scss'
import { DataGrid, GridColDef, GridToolbar, frFR } from "@mui/x-data-grid";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import SearchBar from '@mkyy/mui-search-bar';

const Datatable = () => {
  const supabase = createClientComponentClient()
  const [data, setData] = useState<any[]>([]);
  const [originalData, setOriginalData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const columns: GridColDef[] = [
    { field: "CIN", headerName: "Cin", width: 100 },
    { field: "nom", headerName: "nom", width: 150 },
    { field: "prenom", headerName: "prenom", width: 150 },
    { field: "phone", headerName: "Telephone", width: 150 },
    { field: "inscrit", headerName: "date d'inscription", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link href={`/clients/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Voir</div>
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
      const { data: clients, error } = await supabase.from("clients").select("*");
      if (error) {
        throw new Error("Error fetching clients.");
      }
      setOriginalData(clients);
      setFilteredData(clients);
    } catch (error: any) {
      console.error(error);
    }
  };


  // const fetchClients = async () => {
  //   try {
  //     const  {data:clients,error}  = await supabase.from("clients").select("*");
  //     if (error)   {
  //       throw new Error("Error fetching clients.");
  //     }
  //     setData(clients);
  //     console.log(clients)
  //   } catch (error:any) {
  //     console.error(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchClients();
  // }, [[supabase, setData]]);
  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    const lowercaseQuery = searchQuery.toLowerCase();
    const newFilteredData = originalData.filter(item => {
      return (
        (item.nom && item.nom.toLowerCase().includes(lowercaseQuery)) ||
        (item.prenom && item.prenom.toLowerCase().includes(lowercaseQuery)) ||
        (item.CIN && item.CIN.toLowerCase().includes(lowercaseQuery))
      );
    });
    setFilteredData(newFilteredData);
  }, [searchQuery]);

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
        Add New User
        <Link href="/new" className="link">
          Add New
        </Link>
      </div>
      <div className="group-enabled  p-4">
        <div className="text-lg">

          Chercher avec Prenom,nom ou Cin
        </div>
        <SearchBar
          placeholder="Prenom ,nom ou Cin"
          value={searchQuery}
          onChange={(newValue) => setSearchQuery(newValue)}
          onCancelResearch={() => setSearchQuery('')}
          className="rounded-md border border-black my-2"

        />

      </div>
      <div style={{ height: 530, width: "100%" }}>
        <DataGrid
          localeText={frFR.components.MuiDataGrid.defaultProps.localeText}

          rows={filteredData} columns={columns}

        />
      </div>
    </div>
  );
};

export default Datatable;
