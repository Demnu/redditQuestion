import "./calculationslist.css";
import MaterialTable from 'material-table'

import Button from '@material-ui/core/Button';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { useState, useEffect, forwardRef } from "react";
import axios from "axios"
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
import DeleteIcon from '@mui/icons-material/Delete'; 


export default function ProductList() {
  const [calculations, setCalculations] = useState([]);
  const [select, setSelection] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([])
  const tableHeight =((window.innerHeight - 64 - 64 - 52 - 1) / window.innerHeight * 100)-100;
  const [loading, setLoading] = useState(true);

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

  useEffect( () => {

    const fetchData = async () => {
      const result = await axios(
        "https://glitchhub.coffee/api/v1/roasting",
      );
      var mongoCalculations = [] 
      mongoCalculations = result.data;
      mongoCalculations.forEach(calculation =>{
          var date = new Date(calculation.date)
        calculation.date = date.toLocaleDateString()  + " " + date.toLocaleTimeString() 
      })  
      mongoCalculations = mongoCalculations.reverse()
      
      setCalculations(result.data)

      setLoading(false)
    };
    fetchData();

  },[]);

  const deleteCalculation = (id) => {
    axios.delete("https://glitchhub.coffee/api/v1/roasting/"+id)
    var mongoCalculations = [] 
    mongoCalculations = calculations;
    mongoCalculations = mongoCalculations.filter(item => item.id !== id)
    setCalculations(mongoCalculations)

     
  };
  
  const columns = [
    { field: "title", headerName: "Calculation", width: 300 },
    {
      field: "date",
      headerName: "Date Saved",
      width: 200,
    },
    {
      field: "edit", 
      headerName:"",
      renderCell:(params)=>{
        return(
          <Link
          to={`/calculation/${params.row.id}`}
          state={params.row}
        >
          <Button 
          variant="contained" color="primary" className="productListEdit" >View</Button>
          </Link>
        )
      }
    },
    {
      field: "Delete", 
      width:100,
      headerName:"",
      renderCell:(params)=>{
        return(
          <div>

            <Button 
            style={{backgroundColor: '#bd0000', color: '#FFFFFF'}}
            color="" 
            variant="contained"
            onClick={() => {
            deleteCalculation(params.row.id)}}>
            Delete
            </Button>
          </div>


        )
      }
    },


  ];



return (
  
  <div className="productList">
      <DataGrid
        rows={calculations}
        columns={columns}
        loading={loading}
        />
  </div>
);
}