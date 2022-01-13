import "./recipes.css";
import { DataGrid } from '@mui/x-data-grid';
import { Outlet } from "react-router-dom";
import Button from '@material-ui/core/Button';

import { useState, useEffect } from "react";
import axios from "axios"
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete'; 
export default function ProductList() {


  const [products, setProducts] = useState([]);


  const handleDelete = (id) => {
    setProducts(products.filter((item) => item.id !== id));
    axios.delete("https://glitchhub.coffee/api/v1/products/"+id)
  };

  useEffect( () => {

    const fetchData = async () => {
      const result = await axios(
        "https://glitchhub.coffee/api/v1/products",
      );

      setProducts(result.data);
    };
    fetchData();

  },[]);

  const buttonE = () =>{
    return (<h1>test</h1>)
  }




  const columns = [
    { field: "id", headerName: "Product", width: 400,editable: true },

    {
      field: "action",
      headerName: "",
      width: 5,
      renderCell: (params) => {
        return (
          <>
            <DeleteIcon
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
    { field: "Create", 
    headerName:           
      <Link to={`/product/NewProduct`}>
        <Button
          className=""
          color="primary" 
          variant="contained">
          Create Product
        </Button>
      </Link> ,width: 235 },
  ];

  return (
    
    <div className="productList">
        <DataGrid
          rows={products}
          disableSelectionOnClick
          columns={columns}
          pageSize={20}
        />

    </div>
  );
}
