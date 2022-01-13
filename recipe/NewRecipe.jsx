import { FormControl, Grid, TextField, InputLabel,Container,Button,Typography } from "@material-ui/core";
import axios from "axios"
import { useState, useEffect } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import {useNavigate } from "react-router-dom";


export default function Create() {
  let navigate = useNavigate();
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
  const [isLoading, setIsLoading] = useState(true)
  
  const[duplicate, setDuplicate] = useState(false)

  const[test, setTest] = useState("")
  useEffect( () => {

    const fetchData = async () => {
      const result = await axios(
        "https://glitchhub.coffee/api/v1/products/unusedProducts"
      );
      setProducts(result.data.unusedProducts)
      setIsLoading(false)

      
    };
    fetchData();
  },[]);
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)

  async function handleSubmit (e) {
    e.preventDefault()
    setTitleError(false)
    setDetailsError(false)

    // if (title == '') {
    //   setTitleError(true)
    // }
    // if (details == '') {
    //   setDetailsError(true)
    // }
    if (title && details) {
      console.log(title, details, product)
    } 
    await axios.post("https://glitchhub.coffee/api/v1/recipes/",{
      product: product.label,
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
    setDuplicate(true);
    console.log("duplicate")
  }
  )
    if (!duplicate){
      navigate("/recipes")

    }
  
  }

  function AutoCompleteDiv(){
    if (products.length ===0){
      return(
        <div>
          LOADING
        </div>
      )
    }
    else{
      return(
        <Autocomplete
        onChange={(e,value) => setProduct(value)}
          id="country-select-demo"
          autoComplete 
          includeInputInList 
          style={{ width: 300 }}
          options={products}
          autoHighlight
          getOptionLabel={(option) => option.label}
          renderInput={(params) => <TextField required fullWidth {...params} label="Search for Product"   />}
        />
      )
    }
    
  }

  return (
        <div className='user'>
    <Container size="sm">
      <Typography
        variant="h6" 
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a Recipe
      </Typography>
      
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Autocomplete
        onChange={(e,value) => setProduct(value)}
          id="country-select-demo"
          autoComplete 
          includeInputInList 
          style={{ width: 400 }}
          loading={isLoading}
          options={products}
          autoHighlight
          getOptionLabel={(option) => option.label}
          renderInput={(params) => <TextField required fullWidth {...params} label="Search for Product"   />}
        />

          <br/>


        <TextField 
          onChange={(e) => setBean1Name(e.target.value)}
          label="Bean 1" 
          variant="outlined" 
          color="secondary" 
          error={titleError}
        />
        <TextField
          onChange={(e) => setBean1Amount(e.target.value)}
          label="Bean 1 Amount (g)"
          variant="outlined"
          color="secondary"
          type="number"

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
        />
        <TextField
          onChange={(e) => setBean2Amount(e.target.value)}
          label="Bean 2 Amount (g)"
          variant="outlined"
          color="secondary"
          type="number"
          error={detailsError}
        />
        <br/>
        <br/>
        <TextField 
          onChange={(e) => setBean3Name(e.target.value)}
          label="Bean 3" 
          variant="outlined" 
          color="secondary" 
          error={titleError}
        />
        <TextField
          onChange={(e) => setBean3Amount(e.target.value)}
          label="Bean 3 Amount (g)"
          variant="outlined"
          color="secondary"
          type="number"
          error={detailsError}
        />
        <br/>
        <br/>
        <TextField 
          onChange={(e) => setBean4Name(e.target.value)}
          label="Bean 4" 
          variant="outlined" 
          color="secondary" 
          error={titleError}
        />
        <TextField
          onChange={(e) => setBean4Amount(e.target.value)}
          label="Bean 4 Amount (g)"
          variant="outlined"
          color="secondary"
          type="number"
          error={detailsError}
        />
        <br/>
        <br/>
        <TextField 
          onChange={(e) => setBean5Name(e.target.value)}
          label="Bean 5" 
          variant="outlined" 
          color="secondary" 
          error={titleError}
        />
        <TextField
          onChange={(e) => setBean5Amount(e.target.value)}
          label="Bean 5 Amount (g)"
          variant="outlined"
          color="secondary"
          type="number"
          error={detailsError}
        />
        <br/>
        <br/>
        <TextField 
          onChange={(e) => setBean6Name(e.target.value)}
          label="Bean 6" 
          variant="outlined" 
          color="secondary" 
          error={titleError}
        />
        <TextField
          onChange={(e) => setBean6Amount(e.target.value)}
          label="Bean 6 Amount (g)"
          variant="outlined"
          color="secondary"
          type="number"
          error={detailsError}
        />
        <br/>
        <br/>
        <TextField 
          onChange={(e) => setBean7Name(e.target.value)}
          label="Bean 7" 
          variant="outlined" 
          color="secondary" 
          error={titleError}
        />
        <TextField
          onChange={(e) => setBean7Amount(e.target.value)}
          label="Bean 7 Amount (g)"
          variant="outlined"
          color="secondary"
          type="number"
          error={detailsError}
        />
        <br/>
        <br/>
        <TextField 
          onChange={(e) => setBean8Name(e.target.value)}
          label="Bean 8" 
          variant="outlined" 
          color="secondary" 
          error={titleError}
        />
        <TextField
          onChange={(e) => setBean8Amount(e.target.value)}
          label="Bean 8 Amount (g)"
          variant="outlined"
          color="secondary"
          type="number"
          error={detailsError}
        />
        <br/>
        <br/>


        <Button
          type="submit" 
          color="primary" 
          variant="contained">
          Submit
        </Button>
      </form>

      
    </Container>
    </div>
  )
}