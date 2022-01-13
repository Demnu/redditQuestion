import { Link } from "react-router-dom";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios"
import { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete'; 
import { DataGrid } from '@mui/x-data-grid';
import { useFormik } from 'formik';
import { use } from "react-router-dom";
import Autocomplete from '@mui/material/Autocomplete';


  import "./recipe.css";
import { FormControl, Grid, TextField, InputLabel } from "@mui/material";
  


  export default function NewRecipe() {


      
    const [id, setID] = useState("")
    const [product, setProduct] = useState("New Recipe")
    const [bean1Name, setBean1Name] = useState("");
    const [bean1Amount, setBean1Amount] = useState("");
    const [bean2Name, setBean2Name] = useState("");
    const [bean2Amount, setBean2Amount] = useState("");
    const [bean3Name, setBean3Name] = useState("");
    const [bean3Amount, setBean3Amount] = useState("");
    const [bean4Name, setBean4Name] = useState("");
    const [bean4Amount, setBean4Amount] = useState("");
    const [bean5Name, setBean5Name] = useState("");
    const [bean5Amount, setBean5Amount] = useState("");
    const [bean6Name, setBean6Name] = useState("");
    const [bean6Amount, setBean6Amount] = useState("");
    const [bean7Name, setBean7Name] = useState("");
    const [bean7Amount, setBean7Amount] = useState("");
    const [bean8Name, setBean8Name] = useState("");
    const [bean8Amount, setBean8Amount] = useState("");
    
    const [products, setProducts] = useState("");
    var statelessProducts = [{label:"test"}];

    useEffect( () => {

      const fetchData = async () => {
        const result = await axios(
          "https://glitchhub.coffee/api/v1/products"
        );
        setProducts(result.data)


        
      };
      fetchData();
    },[]);

    function mapProductNames (){
      var productsMap = [];

      products.forEach(function(recipe) {
        productsMap.push({name:id})
      });
      console.log(productsMap)
    }

    async function createRecipe()
    {
      if(product.length>0){

          const res = await axios.post("http://localhost:3000/api/v1/recipes/",{
              product: product,
              bean1Name : bean1Name,
              bean1Amount : bean1Amount,
              bean2Name : bean2Name,
              bean2Amount : bean2Amount,
              bean3Name : bean3Name,
              bean3Amount : bean3Amount,
              bean4Name : bean4Name,
              bean4Amount : bean4Amount,
              bean5Name : bean5Name,
              bean5Amount : bean5Amount,
              bean6Name : bean6Name,
              bean6Amount : bean6Amount,
              bean7Name : bean7Name,
              bean7Amount : bean7Amount,
              bean8Name : bean8Name,
              bean8Amount : bean8Amount,
  
          })
          console.log(res);
      }
      else{
          return <div>Product name cannot be empty</div>
      }
    }

    let navigate = useNavigate();

    return (
        <div className='user'>

            <h1>{product}</h1>
            <p>The name of the product must be the same as the name of the blend on ordermentum</p>
            <p>All measurements are made in grams</p>
            <br/>
            <form>
              <Autocomplete
                  id="country-select-demo"
                  freeSolo
                  style={{ width: 300 }}
                  options={products}
                  autoHighlight
                  getOptionLabel={(option) => option.label}

                  renderInput={(params) => <TextField {...params} label="Products" />}

                />
                <label htmlFor="productName">Product </label>
                <input required type="text" value={product} onChange={(e)=>{setProduct(e.target.value)}} /> <br /><br />

                <div className="">
                <label htmlFor="productName">Bean 1 </label>
                <input type="text" value={bean1Name} onChange={(e)=>{setBean1Name(e.target.value)}} /> 
                <label htmlFor="productName">Bean 1 Amount (g) </label>
                <input type="number" value={bean1Amount} onChange={(e)=>{setBean1Amount(e.target.value)}} /> <br /><br />
                <label htmlFor="productName">Bean 2 </label>
                <input type="text" value={bean2Name} onChange={(e)=>{setBean2Name(e.target.value)}} /> 
                <label htmlFor="productName">Bean 2 Amount (g) </label>
                <input type="number" value={bean2Amount} onChange={(e)=>{setBean2Amount(e.target.value)}} /> <br /><br />
                <label htmlFor="productName">Bean 3 </label>
                <input type="text" value={bean3Name} onChange={(e)=>{setBean3Name(e.target.value)}} /> 
                <label htmlFor="productName">Bean 3 Amount (g) </label>
                <input type="number" value={bean3Amount} onChange={(e)=>{setBean3Amount(e.target.value)}} /> <br /><br />
                <label htmlFor="productName">Bean 4 </label>
                <input type="text" value={bean4Name} onChange={(e)=>{setBean4Name(e.target.value)}} /> 
                <label htmlFor="productName">Bean 4 Amount (g) </label>
                <input type="number" value={bean4Amount} onChange={(e)=>{setBean4Amount(e.target.value)}} /> <br /><br />
                <label htmlFor="productName">Bean 5 </label>
                <input type="text" value={bean5Name} onChange={(e)=>{setBean5Name(e.target.value)}} /> 
                <label htmlFor="productName">Bean 5 Amount (g) </label>
                <input type="number" value={bean5Amount} onChange={(e)=>{setBean5Amount(e.target.value)}} /> <br /><br />
                <label htmlFor="productName">Bean 6 </label>
                <input type="text" value={bean6Name} onChange={(e)=>{setBean6Name(e.target.value)}} /> 
                <label htmlFor="productName">Bean 6 Amount (g) </label>
                <input type="number" value={bean6Amount} onChange={(e)=>{setBean6Amount(e.target.value)}} /> <br /><br />
                <label htmlFor="productName">Bean 7 </label>
                <input type="text" value={bean7Name} onChange={(e)=>{setBean7Name(e.target.value)}} /> 
                <label htmlFor="productName">Bean 7 Amount (g) </label>
                <input type="number" value={bean7Amount} onChange={(e)=>{setBean7Amount(e.target.value)}} /> <br /><br />
                <label htmlFor="productName">Bean 8 </label>
                <input type="text" value={bean8Name} onChange={(e)=>{setBean8Name(e.target.value)}} /> 
                <label htmlFor="productName">Bean 8 Amount (g) </label>
                <input type="number" value={bean8Amount} onChange={(e)=>{setBean8Amount(e.target.value)}} /> <br /><br />
                </div>



                <button
                    onClick={() => {
                        createRecipe().then(navigate("/recipes"));
                        
                    }}
                    >
                    Create
                </button>

            </form>
      </div>

    );
  }

//   <form onSubmit={formik.handleSubmit}>
//   <label htmlFor="productName">Product</label>
//   <input onChange={formik.handleChange} defaultValue={recipes.id} id="product" name="product"/>
//   <label htmlFor="bean1Name">Bean 1</label>
//   <input onChange={formik.handleChange} defaultValue={recipes.bean1Name} id="bean1Name" name="bean1Name"/>
//   <label htmlFor="bean1Amount">Bean 1 Amount</label>
//   <input onChange={formik.handleChange} defaultValue={recipes.bean1Amount} id="bean1Amount" name="bean1Amount"/>
//   <button type="submit">Update</button>
// </form>


//   <div className="user">
//   <FormControl>

//       <Grid container spacing={2} >
//           <Grid xs={12} className="containerForm" item> 
//               <p>Product</p>
//               <TextField
//               variant="outlined"
//               defaultValue={recipes.id}
              
//               />
//           </Grid>
//           <Grid xs={8} item> 
//               <p>Bean 1</p>
//               <TextField
//               defaultValue={recipes.bean1Name}
//               />
//               <TextField
//               defaultValue={recipes.bean1Amount}
//               />
//               <span>in grams</span>
//           </Grid>
//           <Grid xs={6} item> 

//           </Grid>
//           <Grid xs={8} item> 
//               <TextField
//               label="Bean"
//               defaultValue="Bean"
//               value = {recipes.bean2Name}
//               />
//           </Grid>
//           <Grid xs={6} item> 
//               <TextField
//               label="Amount (in grams)"
//               defaultValue="Amount"
//               value = {recipes.bean2Amount}
//               />
//           </Grid>
//       </Grid>
//   </FormControl>
// </div>