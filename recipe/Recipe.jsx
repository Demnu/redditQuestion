import { useParams,useNavigate,useLocation } from "react-router-dom";
import axios from "axios"
import { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete'; 
import SendIcon from '@mui/icons-material/Send';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

  import "./recipe.css";
  import Button from '@material-ui/core/Button';

  import { Autocomplete, FormControl, Grid, TextField, InputLabel,Container,Typography } from "@mui/material";
  


  export default function Recipe() {
    let navigate = useNavigate();
    let params = useParams();
    const location = useLocation()
    const [id, setID] = useState("")
    const [product, setProduct] = useState(location.state)
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
    const [title, setTitle] = useState('')
    const [details, setDetails] = useState('')
    const [titleError, setTitleError] = useState(false)
    const [detailsError, setDetailsError] = useState(false)
    const [updateSuccess, setUpdateSuccess] = useState(null)
    const [recipes, setRecipe] = useState([]);



    const handleDelete = (id) => {
        setRecipe(recipes.filter((item) => item.id !== id));
        axios.delete("https:///glitchhub.coffee/api/v1/recipes/"+id)
      };


    useEffect( () => {
      const fetchData = async () => {
        const result = await axios(
          "https://glitchhub.coffee/api/v1/recipes/"+params.recipeID,
        );
        setID(result.data._id)
        setBean1Name(result.data.bean1Name)
        setBean1Amount(result.data.bean1Amount)
        setBean2Name(result.data.bean2Name)
        setBean2Amount(result.data.bean2Amount)
        setBean3Name(result.data.bean3Name)
        setBean3Amount(result.data.bean3Amount)
        setBean4Name(result.data.bean4Name)
        setBean4Amount(result.data.bean4Amount)
        setBean5Name(result.data.bean5Name)
        setBean5Amount(result.data.bean5Amount)
        setBean6Name(result.data.bean6Name)
        setBean6Amount(result.data.bean6Amount)
        setBean7Name(result.data.bean7Name)
        setBean7Amount(result.data.bean7Amount)
        setBean8Name(result.data.bean8Name)
        setBean8Amount(result.data.bean8Amount)    
      };
    fetchData();
    },[]);
    async function resetValues (){
      const res = await axios.patch("https://glitchhub.coffee/api/v1/recipes/"+params.recipeID,{
          product: product,
          bean1Name : "",
          bean1Amount : "",
          bean2Name : "",
          bean2Amount : "",
          bean3Name : "",
          bean3Amount : "",
          bean4Name : "",
          bean4Amount : "",
          bean5Name : "",
          bean5Amount : "",
          bean6Name : "",
          bean6Amount : "",
          bean7Name : "",
          bean7Amount : "",
          bean8Name : "",
          bean8Amount : "",
      })
      setBean1Name("")
      setBean1Amount("")
      setBean2Name("")
      setBean2Amount("")
      setBean3Name("")
      setBean3Amount("")
      setBean4Name("")
      setBean4Amount("")
      setBean5Name("")
      setBean5Amount("")
      setBean6Name("")
      setBean6Amount("")
      setBean7Name("")
      setBean7Amount("")
      setBean8Name("")
      setBean8Amount("")
    }
    async function deleteRecipe (){
      setProduct(null)
      axios.delete("https://glitchhub.coffee/api/v1/recipes/"+product)
    }


    async function handleSubmit (e) {
      e.preventDefault()
      setTitleError(false)
      setDetailsError(false)
      console.log(id);
      if (title && details) {
        console.log(title, details, product)
      } 
      await axios.patch("https://glitchhub.coffee/api/v1/recipes/"+id,{
        id: id,
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
  
    }).catch(function (error){
      console.log("duplicate")
    }
    )

    
    }

    return (
        <div className='user'>
          <div className="leftSide">
            <h1>{product}</h1>
            <ul> 

              <li>Make sure to click "Update Recipe" after making any changes</li>
              <br/>
              <li>All measurements are made in grams</li>
            </ul>

            <br/>
          </div>
          <div >
            <Container size="sm">
              <Typography
                variant="h6" 
                color="textSecondary"
                component="h2"
                gutterBottom
              >
              </Typography>
        
              <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField 
                  onChange={(e) => setBean1Name(e.target.value)}
                  label="Bean 1" 
                  variant="outlined" 
                  color="secondary" 
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={bean1Name}
                  error={titleError}
                />
                <TextField
                  onChange={(e) => setBean1Amount(e.target.value)}
                  label="Bean 1 Amount (g)"
                  variant="outlined"
                  color="secondary"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={bean1Amount}

                  error={detailsError}
                />
                <br/>
                <br/>
                <TextField 
                  onChange={(e) => setBean2Name(e.target.value)}
                  label="Bean 2" 
                  variant="outlined" 
                  color="secondary" 
                  error={titleError}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={bean2Name}
                />
                <TextField
                  onChange={(e) => setBean2Amount(e.target.value)}
                  label="Bean 2 Amount (g)"
                  variant="outlined"
                  color="secondary"
                  type="number"
                  error={detailsError}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={bean2Amount}
                />
                <br/>
                <br/>
                <TextField 
                  onChange={(e) => setBean3Name(e.target.value)}
                  label="Bean 3" 
                  variant="outlined" 
                  color="secondary" 
                  error={titleError}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={bean3Name}
                />
                <TextField
                  onChange={(e) => setBean3Amount(e.target.value)}
                  label="Bean 3 Amount (g)"
                  variant="outlined"
                  color="secondary"
                  type="number"
                  error={detailsError}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={bean3Amount}
                />
                <br/>
                <br/>
                <TextField 
                  onChange={(e) => setBean4Name(e.target.value)}
                  label="Bean 4" 
                  variant="outlined" 
                  color="secondary" 
                  error={titleError}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={bean4Name}
                />
                <TextField
                  onChange={(e) => setBean4Amount(e.target.value)}
                  label="Bean 4 Amount (g)"
                  variant="outlined"
                  color="secondary"
                  type="number"
                  error={detailsError}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={bean4Amount}
                />
                <br/>
                <br/>
                <TextField 
                  onChange={(e) => setBean5Name(e.target.value)}
                  label="Bean 5" 
                  variant="outlined" 
                  color="secondary" 
                  error={titleError}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={bean5Name}
                />
                <TextField
                  onChange={(e) => setBean5Amount(e.target.value)}
                  label="Bean 5 Amount (g)"
                  variant="outlined"
                  color="secondary"
                  type="number"
                  error={detailsError}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={bean5Amount}
                />
                <br/>
                <br/>
                <TextField 
                  onChange={(e) => setBean6Name(e.target.value)}
                  label="Bean 6" 
                  variant="outlined" 
                  color="secondary" 
                  error={titleError}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={bean6Name}
                />
                <TextField
                  onChange={(e) => setBean6Amount(e.target.value)}
                  label="Bean 6 Amount (g)"
                  variant="outlined"
                  color="secondary"
                  type="number"
                  error={detailsError}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={bean6Amount}
                />
                <br/>
                <br/>
                <TextField 
                  onChange={(e) => setBean7Name(e.target.value)}
                  label="Bean 7" 
                  variant="outlined" 
                  color="secondary" 
                  error={titleError}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={bean7Name}
                />
                <TextField
                  onChange={(e) => setBean7Amount(e.target.value)}
                  label="Bean 7 Amount (g)"
                  variant="outlined"
                  color="secondary"
                  type="number"
                  error={detailsError}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={bean7Amount}
                />
                <br/>
                <br/>
                <TextField 
                  onChange={(e) => setBean8Name(e.target.value)}
                  label="Bean 8" 
                  variant="outlined" 
                  color="secondary" 
                  error={titleError}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={bean8Name}
                />
                <TextField
                  onChange={(e) => setBean8Amount(e.target.value)}
                  label="Bean 8 Amount (g)"
                  variant="outlined"
                  color="secondary"
                  type="number"
                  error={detailsError}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={bean8Amount}
                />
                <br/>
                <br/>
                <div>
                  <div className="buttonContainer">
                    <Button
                      startIcon={<SendIcon />}
                      type="submit" 
                      color="primary" 
                      variant="contained">
                      Update
                    </Button>

                    <Button 
                      startIcon={<RestartAltIcon />}
                      variant="contained" 
                      onClick={resetValues}>
                      Reset Values
                    </Button> 

                    <Button color="" variant="contained"
                      startIcon={<DeleteIcon />}
                      style={{backgroundColor: '#bd0000', color: '#FFFFFF'}}
                      onClick={() => {
                      deleteRecipe().then(navigate("/recipes"));}}>
                      Delete
                    </Button>
                  </div>
                  <br/>
                  <div>

                  </div>
                </div>

                <br/> 
                <br/>

              </form>
            </Container>
        </div>
    </div>

    );
  }

//   <form>
//   <label htmlFor="productName">Product </label>
//   <input required type="text" value={product} onChange={(e)=>{setProduct(e.target.value)}} /> <br /><br />

//   <div className="">
//   <label htmlFor="productName">Bean 1 </label>
//   <input type="text" value={bean1Name} onChange={(e)=>{setBean1Name(e.target.value)}} /> 
//   <label htmlFor="productName">Bean 1 Amount (g) </label>
//   <input type="number" value={bean1Amount} onChange={(e)=>{setBean1Amount(e.target.value)}} /> <br /><br />
//   <label htmlFor="productName">Bean 2 </label>
//   <input type="text" value={bean2Name} onChange={(e)=>{setBean2Name(e.target.value)}} /> 
//   <label htmlFor="productName">Bean 2 Amount (g) </label>
//   <input type="number" value={bean2Amount} onChange={(e)=>{setBean2Amount(e.target.value)}} /> <br /><br />
//   <label htmlFor="productName">Bean 3 </label>
//   <input type="text" value={bean3Name} onChange={(e)=>{setBean3Name(e.target.value)}} /> 
//   <label htmlFor="productName">Bean 3 Amount (g) </label>
//   <input type="number" value={bean3Amount} onChange={(e)=>{setBean3Amount(e.target.value)}} /> <br /><br />
//   <label htmlFor="productName">Bean 4 </label>
//   <input type="text" value={bean4Name} onChange={(e)=>{setBean4Name(e.target.value)}} /> 
//   <label htmlFor="productName">Bean 4 Amount (g) </label>
//   <input type="number" value={bean4Amount} onChange={(e)=>{setBean4Amount(e.target.value)}} /> <br /><br />
//   <label htmlFor="productName">Bean 5 </label>
//   <input type="text" value={bean5Name} onChange={(e)=>{setBean5Name(e.target.value)}} /> 
//   <label htmlFor="productName">Bean 5 Amount (g) </label>
//   <input type="number" value={bean5Amount} onChange={(e)=>{setBean5Amount(e.target.value)}} /> <br /><br />
//   <label htmlFor="productName">Bean 6 </label>
//   <input type="text" value={bean6Name} onChange={(e)=>{setBean6Name(e.target.value)}} /> 
//   <label htmlFor="productName">Bean 6 Amount (g) </label>
//   <input type="number" value={bean6Amount} onChange={(e)=>{setBean6Amount(e.target.value)}} /> <br /><br />
//   <label htmlFor="productName">Bean 7 </label>
//   <input type="text" value={bean7Name} onChange={(e)=>{setBean7Name(e.target.value)}} /> 
//   <label htmlFor="productName">Bean 7 Amount (g) </label>
//   <input type="number" value={bean7Amount} onChange={(e)=>{setBean7Amount(e.target.value)}} /> <br /><br />
//   <label htmlFor="productName">Bean 8 </label>
//   <input type="text" value={bean8Name} onChange={(e)=>{setBean8Name(e.target.value)}} /> 
//   <label htmlFor="productName">Bean 8 Amount (g) </label>
//   <input type="number" value={bean8Amount} onChange={(e)=>{setBean8Amount(e.target.value)}} /> <br /><br />
//   </div>



// </form>
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