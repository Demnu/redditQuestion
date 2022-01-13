import "./recipes.css";
import { DataGrid } from '@mui/x-data-grid';
import { Outlet } from "react-router-dom";
import { FormControl, Grid, TextField, InputLabel,Container,Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { useState, useEffect } from "react";
import axios from "axios"
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete'; 
export default function ProductList() {


  const [recipes, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);


  const handleDelete = (id) => {
    setRecipe(recipes.filter((item) => item.id !== id));
    axios.delete("https://glitchhub.coffee/api/v1/recipes/"+id)
  };

  useEffect( () => {
    const fetchData = async () => {
      const result = await axios(
        "https://glitchhub.coffee/api/v1/recipes",
      );
      setLoading(false)
      setRecipe(result.data);

    };
    fetchData();

  },[]);





  const columns = [
    { field: "id", headerName: "Recipe", width: 400,editable: true },
    {
      field: "edit", 
      headerName:"",
      width:80,
      renderCell:(params)=>{
        return(
          <Link
          to={`/recipe/${params.row._id}`}
          state={params.row.id}
        >
          <Button style={{backgroundColor: '#12824C', color: '#FFFFFF'}}
          variant="contained" className="productListEdit">Edit</Button>
          </Link>
        )
      }
    },
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
    width: 250,
    editable: true, 
    headerName:           
      <Link  to={`/recipe/newRecipe`}>
        <div> 
        <Button
              className=""
              color="primary" 
              variant="contained">
              Create Recipe
            </Button>
        </div>
      </Link>
      },

  ];

  return (
    
    <div className="productList">

        
        <DataGrid
          rows={recipes}
          columns={columns}
          pageSize={50}
          loading={loading}
        />

    </div>
  );
}
