import "./orderlist.css";
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


export default function ProductList() {
  const [orders, setOrder] = useState([]);
  const [select, setSelection] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([])
  const pdf = new jsPDF()
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
        "https://glitchhub.coffee/api/v1/orders",
      );
      var ordersMongo = []
      ordersMongo = result.data
      for (var i = 0 ; i <ordersMongo.length;i++){
        var date  = new Date(ordersMongo[i].date)
        ordersMongo[i].date = date.toLocaleDateString()
      }
      setLoading(false)
      setOrder(ordersMongo.reverse());
    };
    fetchData();
    console.log(orders)

  },[]);

  const handleSelection = (item) =>{
    setSelectedOrders(item)
    console.log(item)
  }
  
  const calculateRoastingList = () =>{
    if (selectedOrders.length === 0){
      alert("Select at least one order!")
    }
    else{
      

    }
  }
  
  const OrderColumns = [
    {title: "ID", field:"id"},
    {title:"Customer", field:"customerName"},
    {title:"Order Date", field:"date"},
    {
      title: "Products",
      field:"products",
      render: rowData => 
      <div>
        {rowData.products[0].amount}
      </div>


    },
  ]

  const columns = [
    { field: "id", headerName: "Order ID", width: 90 },
    {
      field: "customerName",
      headerName: "Customer",
      width: 150,
    },
    {
      field: "date",
      headerName: "Order Date",
      width: 100,

    },
    {
      field: "products",
      headerName: "Products",
      width: 3000,
      renderCell: (params) => {
        return (
          <div className="test">
            {params.row.products.map(product => (              
                <span><b>{product.name}</b> <b>{product.id}</b> - {product.amount} </span> 
              
          ))}
      
          </div>
        );
      },
    }

  ];

  return (
    
    <div className="productList">

      <div className="calculateButton">
        <Link to='/roastingList' state={selectedOrders}>
          <Button
            className=""
            onClick= {calculateRoastingList}
            color="primary" 
            variant="contained"
            disabled={selectedOrders.length<=0}>
            Calculate Orders
          </Button>
        </Link>      
      </div>
      <br/>
        <DataGrid
          rows={orders}
          columns={columns}
          checkboxSelection
          density = "compact"
          onSelectionModelChange= {item => handleSelection(item)}
          loading={loading}
          />
    </div>
  );
}
