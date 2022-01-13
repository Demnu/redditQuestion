import "./roastinglist.css";
import { DataGrid } from '@mui/x-data-grid';
import { FormControl, Grid, TextField, InputLabel,Container,Button,Typography } from "@mui/material";

import { useState, useEffect } from "react";
import axios from "axios"

export default function OrderList() {
  const [orders, setOrder] = useState([]);

  useEffect( () => {

    const fetchData = async () => {
      const result = await axios(
        "https://glitchhub.coffee/api/v1/recipes/getRoastingList",
      );

      setOrder(result.data);
    };
    fetchData();

  },[]);





  const columns = [
    { field: "id", headerName: "BEAN", width: 250 },
    {
      field: "amount",
      headerName: "QTY (KG)",
      width: 150,
    },
  ];
  const [sortModel, setSortModel] = useState([
    {
      field: 'id',
      sort: 'desc',
    },
  ]);

  return (
    
    <div className="productList">
        <DataGrid
          rows={orders}
          disableSelectionOnClick
          columns={columns}
          autoHeight 
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
        />

    </div>
  );
}