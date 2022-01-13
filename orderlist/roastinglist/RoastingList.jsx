import "./roastinglist.css";
import { useParams,useNavigate,useLocation } from "react-router-dom";
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { useState, useEffect, forwardRef } from "react";
import axios from "axios"
import MaterialTable from 'material-table'
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Button from '@material-ui/core/Button';

import { FormControl, Grid, TextField, InputLabel,Container,Typography } from "@material-ui/core";

export default function OrderList() {
  function compareProducts(productA, productB) {
    var stringA = String(productA.id);
    var stringB = String(productB.id);
    return stringA.localeCompare(stringB)
  }
  
  function compareBeans(productA, productB) {
    var stringA = String(productA.id);
    var stringB = String(productB.id);
    return stringA.localeCompare(stringB)
  }
  const pdf = new jsPDF()
  const tableHeight =(window.innerHeight - 64 - 64 - 52 - 1) / window.innerHeight * 100 - 10;
  const [textInput, setTextInput] = useState('');
  const [buttonText, setButtonText] = useState('Save Calculation');
  const [saved, setSaved] = useState(false);
  const [orders, setOrder] = useState([]);
  const [beans, setBeans] = useState([]);
  const [orderIDs, setOrderIDs] = useState([]);
  const [loading, setLoading] = useState(true);
  let params = useParams();
  const location = useLocation()
  useEffect( () => {

    const fetchData = async () => {
      const result = await axios.post(
        "https://glitchhub.coffee/api/v1/roasting/makeCalculation",
        {
          orderIDs:location.state
        }
      );
      setLoading(false)
      var ordersArray = result.data[1];
      ordersArray.sort(compareProducts)
      setOrder(ordersArray);
      var beansData = result.data[0];
      var beansStr = [];

      for (var i = 0 ; i<beansData.length; i++){
        var bean = {id: beansData[i].name, amount:beansData[i].amount+" kg"}
        beansStr.push(bean);
      }
      beansStr.sort(compareBeans)
      setBeans(beansStr)

    };
    fetchData();
    var orderIDS = [];
    location.state.forEach(id =>{
      orderIDS.push({id:id})
    })  
    setOrderIDs(orderIDS)
  },[]);

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  const beansColumns = [
    {title: "Bean", field:"id"},
    {title:"QTY KG", field:"amount"}
  ]
  const orderIDColumns = [
    {title: "Order ID", field:"id"},
  ]
  const productsColumns = [
    {title: "Product", field:"id"},
    {title:"QTY", field:"amount"},


  ]

  async function saveCalculation(){
    if(textInput!=""){ 
      await axios.post("https://glitchhub.coffee/api/v1/roasting/",{
        title: textInput,
        orderIDs : orderIDs,
        date: new Date(),
        products: orders,
        beans : beans
      }).catch(function (error){
      alert("Calculation could not be saved")
    }
    )  
    setSaved(true)
    setButtonText("Calculation Saved")
    }
    else{
      alert("Calculation title is empty")
    }
  }
  // async function recalculate(){
  //   setOrder([])
  //   setBeans([])
  //   setLoading(true)
  //   const fetchData = async () => {
  //     const result = await axios.post(
  //       "http://localhost:3000/api/v1/roasting/makeCalculation",
  //       {
  //         orderIDs:location.state
  //       }
  //     );
  //     console.log(result.data)
  //     setLoading(false)
  //     var ordersArray = result.data[1];
  //     ordersArray.sort(compareProducts)
  //     setOrder(ordersArray);
  //     var beansData = result.data[0];
  //     var beansStr = [];

  //     for (var i = 0 ; i<beansData.length; i++){
  //       var bean = {id: beansData[i].name, amount:beansData[i].amount+" kg"}
  //       beansStr.push(bean);
  //     }
  //     beansStr.sort(compareBeans)
  //     setBeans(beansStr)
  //   };
  //   fetchData()
  // }
  
  

  return (
    
    <div className="productList">
      <div className="saveCalculationButton">
      <div className="calculationTextfield">
          <TextField 
            onChange={(e) => { setTextInput(e.target.value) }}
            label="Calculation Title" 
            variant="outlined" 
            color="primary" 
            value= {textInput}
            size="small"
            disabled= {saved == true}
            />
        </div>
        <div>
          <Button
            className=""
            onClick={saveCalculation}
            color="primary" 
            variant="contained"
            disabled= {saved == true || loading == true}
            >
            {buttonText}
          </Button>
        </div>

        {/* <div className="test">
        <Button
            onClick={recalculate}
            color="primary" 
            variant="contained">
            Recalculate Orders
          </Button>
        </div> */}



      </div>
      <br/>
      <div className="tables">
        <div className="orderIDTable">
            <MaterialTable
            options={{
              maxBodyHeight: `${tableHeight}vh`,
              minBodyHeight: `${tableHeight}vh`,
              pageSize: 80,
              showTitle: false
              
            }}
            icons={tableIcons}
            title="Order IDs"
            columns={orderIDColumns}
            data={orderIDs}
            />
        </div>
        <div className="roastingTable">
            <MaterialTable
            options={{
              search:false,
              exportButton: true,
              sorting: true,
              maxBodyHeight: `${tableHeight}vh`,
              minBodyHeight: `${tableHeight}vh`,
              pageSize: 80
            }}
            icons={tableIcons}
            isLoading = {loading}
            title="Roasting List"
            columns={beansColumns}
            data={beans}
          
            />
          </div>

          <div className="productsTable">
            <MaterialTable
            options={{
              search:false,
              exportButton: true,
              sorting: true,
              maxBodyHeight: `${tableHeight}vh`,
              minBodyHeight: `${tableHeight}vh`,
              pageSize: 80
            }}
            isLoading = {loading}
            icons={tableIcons}
            title="Products"
            columns={productsColumns}
            data={orders}
            />
          </div>
      </div>
    </div>
  );
}