import { FormControl, Grid, TextField, InputLabel,Container,Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';

import axios from "axios"
import { useState, useEffect } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import {useNavigate } from "react-router-dom";


export default function Create() {
  let navigate = useNavigate();

  const [id, setID] = useState("")
  const [product, setProduct] = useState("New Recipe")
  useEffect( () => {

    const fetchData = async () => {
      const result = await axios(
        "https://glitchhub.coffee/api/v1/products"
      );
      setProducts(result.data)


      
    };
    fetchData();
  },[]);
  const [products, setProducts] = useState("");
  const [textInput, setTextInput] = useState('');
  const [productError, setProductError] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  async function handleSubmit (e) {
    e.preventDefault()
    if(!productError){
      const res = await axios.post("https://glitchhub.coffee/api/v1/products/",{
        id: textInput,

    })
    navigate("/products")

    }

  
  }



  const handleTextInputChange = event => {
      var duplicate =false;
      for (var i = 0 ; i<products.length; i++){
        if(textInput === products[i].id){
          duplicate = true;
          setProductError(true)
          setErrorMsg("Product Already Exists")
        }
      }
      if(!duplicate){
        setProductError(false)
        setErrorMsg("")
      }
  };



  useEffect(() => {
    handleTextInputChange();
  }, [textInput]);
  

  return (
    <Container size="sm">
      <Typography
        variant="h6" 
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a Product
      </Typography>
      <br/>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>

        <TextField 
          id="standard-error-helper-text"

          onChange={(e) => { setTextInput(e.target.value) }}
          label="Product Name" 
          variant="outlined" 
          color="secondary" 
          value= {textInput}
          error={productError}
          helperText={errorMsg}

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
  )
}