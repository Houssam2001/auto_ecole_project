import { useEffect, useState } from "react";
import './datatable.scss'
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import MoniteurModal from "./MoniteurModal";
import {  BsFillCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";
import { green, red } from "@mui/material/colors";
import dynamic from "next/dynamic";
import { getMoniteurs } from "@/utils/supabase";

const Moniteurstable = () => {
    const supabase = createClientComponentClient()
    const [data, setData] = useState<any[]>([])
 
    const columns: GridColDef[] = [
        { field: "carteMoni", headerName: "carte moniteur", width: 150 },
        { field: "nom", headerName: "nom", width: 120 },
        { field: "prenom", headerName: "prenom", width: 120 },
        {
            field: "theorique",
            headerName: "theorique",
            width: 100,
            renderCell: (params) => (
                params.row.theorique ? <BsFillCheckCircleFill style={{ color: green[700] }} /> : <BsFillXCircleFill style={{ color: red[700] }}/>
            ),
        },
        {
            field: "pratique",
            headerName: "pratique",
            width: 100,
            renderCell: (params) => (
                params.row.pratique ? <BsFillCheckCircleFill style={{ color: green[700] }} /> : <BsFillXCircleFill style={{ color: red[700] }}/>
            ),
        },
        { field: "date", headerName: "date Cap", width: 150 },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link href={`/moniteurs/${params.row.id}`} style={{ textDecoration: "none" }}>
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
    const fetchMoniteurs = async () => {
        try {
            const moniteurs = await getMoniteurs();
            setData(moniteurs);
            console.log(moniteurs);
        } catch (error: any) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMoniteurs();
    }, [data,supabase]);

    const handleDelete = async (id: any) => {
        try {
            setData((prevData) => prevData.filter((item: any) => item.id !== id));
        } catch (error: any) {
            console.error(error);
        }
    };

    return (
        <div className="datatable">
            <div className="datatableTitle">
                Add New Moniteur
                <div className="link">
                    <MoniteurModal />
                </div>
            </div>
            <div style={{ height: 530, width: "100%" }}>
                <DataGrid rows={data} columns={columns} />
            </div>
        </div>
    );
};

export default Moniteurstable;
