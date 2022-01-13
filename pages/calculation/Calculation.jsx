import "./Calculation.css";
import { useParams,useNavigate,useLocation } from "react-router-dom";
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
import DeleteIcon from '@mui/icons-material/Delete'; 
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


  let params = useParams();
  let navigate = useNavigate();
  const tableHeight =(window.innerHeight - 64 - 64 - 52 - 1) / window.innerHeight * 100 - 10;
  const [calculationID, setCalculationID] = useState()
  const [products, setProducts] = useState([]);
  const [beans, setBeans] = useState([]);
  const [title, setTitle] = useState([]);
  const [orderIDs, setOrderIDs] = useState([]);
  const [date, setDate] = useState([]);  
  const location = useLocation()
  useEffect( () => {
    var productsArray = [];
    var beansArray = [];
    productsArray = location.state.products;
    productsArray.sort(compareProducts)
    setProducts(productsArray);
    beansArray = location.state.beans
    beansArray.sort(compareBeans)
    setBeans(beansArray)
    setTitle(location.state.title)
    setDate(location.state.date)
    setOrderIDs(location.state.orderIDs)
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

  async function deleteCalculation (){
    axios.delete("https://glitchhub.coffee/api/v1/roasting/" +params.calculationID )
  }
  
  

  return (
    
    <div className="productList">
      <div className="top">
        <div className="calculationDescription">
            <div>
                Calculation: <b>{title}</b> 
            </div>
            <div className="dateDiv">
                Date Saved:  <b>{date}</b>
            </div>
        </div>
        <div className="deleteCalculation">
          <Button 
          style={{backgroundColor: '#bd0000', color: '#FFFFFF'}}
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={() => {
          deleteCalculation().then(navigate("/calculations"));}}>
          Delete Calculation
          </Button>
          </div>
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
        <div className="orderIDTable">
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
            icons={tableIcons}
            title="Products"
            columns={productsColumns}
            data={products}
            />
          </div>
      </div>
    </div>

  );
}