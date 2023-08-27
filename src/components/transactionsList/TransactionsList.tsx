'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useEffect, useState } from "react"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import Link from "next/link"
import './transactions.scss'
const TransactionsList = ({ amount_id }: { amount_id: any }) => {
    const supabase = createClientComponentClient()
    const [data, setData] = useState<any[]>([])
    const columns: GridColDef[] = [
        { field: "date", headerName: "Date", width: 100 },
        { field: "value", headerName: "Value", width: 150 },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link href={`/transaction/${params.row.id}`} style={{ textDecoration: "none" }}>
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
    const fetchTransactions = async () => {
        try {
            const { data: transactions, error } = await supabase.from("transactions").select("*").eq('amount_id', amount_id);
            if (error) {
                throw new Error("Error fetching transactions.");
            }
            setData(transactions);
            console.log(transactions)
        } catch (error: any) {
            console.error(error.message);
        }
    };
    useEffect(() => {
        fetchTransactions();
    }, [[supabase, setData]]);
    const handleDelete = async (id: any) => {
        try {
            setData((prevData) => prevData.filter((item: any) => item.id !== id));
        } catch (error: any) {
            console.error(error.message);
        }
    };
    return (
        <div className="list">
            <div className="listContainer">
                <div className="datatable">
                    <div className="datatableTitle">
                        
                    </div>
                    <div style={{ height: 530, width: "100%" }}>
                        <DataGrid rows={data} columns={columns} />
                    </div>



                </div>
            </div>
        </div>
    )
}

export default TransactionsList
