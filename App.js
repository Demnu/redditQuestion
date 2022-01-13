import logo from './logo.svg';
import './App.css';

import TopBar from "./components/topbar/TopBar";
import Sidebar from './components/sidebar/SideBar';
import Home from "./pages/home/Home";
import OrderList from "./pages/orderlist/OrderList";
import RoastingList from "./pages/orderlist/roastinglist/RoastingList";
import CalculationsList from "./pages/savedCalculations/calculationsList";
import Calculation from "./pages/calculation/Calculation";
import RecipeList from "./pages/recipes/RecipeList";
import ProductList from "./pages/products/ProductList";
import Recipe from './pages/recipe/Recipe'
import NewRecipe from './pages/recipe/NewRecipe'
import NewProduct from './pages/product/NewProduct'
import Analytics from './pages/analytics/Analytics'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <TopBar />
        <div className="container">
        <Sidebar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/users" element={<Home/>}/>
          <Route path="/orders" element={<OrderList/>}/>
          <Route path="/recipes" element={<RecipeList/>}/>
          <Route path="/products" element={<ProductList/>}/>
          <Route path="/product/NewProduct" element={<NewProduct/>}/>
          <Route path="/recipe/:recipeID" element={<Recipe/>}/>
          <Route path="/recipe/NewRecipe" element={<NewRecipe/>}/>
          <Route path="/roastingList" element={<RoastingList/>}/>
          <Route path="/calculations" element={<CalculationsList/>}/>
          <Route path="/calculation/:calculationID" element={<Calculation/>}/>
          <Route path="/analytics" element={<Analytics/>}/>
        </Routes>
        </div>
    </Router>
    </div>
  );
}

export default App;
