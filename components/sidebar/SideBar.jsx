import "./sidebar.css";

import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CoffeeIcon from '@mui/icons-material/Coffee';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import CalculateIcon from '@mui/icons-material/Calculate';
export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem active">
              <HomeIcon className="sidebarIcon" />
              Home
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/orders" className="link">
                <li className="sidebarListItem">
                  <ReceiptIcon className="sidebarIcon" />
                  Orders
                </li>
            </Link>
            <Link to="/calculations" className="link">
                <li className="sidebarListItem">
                  <CalculateIcon className="sidebarIcon" />
                  Calculations
                </li>
            </Link>
            <Link to="/recipes" className="link">
                <li className="sidebarListItem">
                  <MenuBookIcon className="sidebarIcon" />
                  Recipes
                </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <CoffeeIcon className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to="/analytics" className="link">
              <li className="sidebarListItem">
                <AutoGraphIcon className="sidebarIcon" />
                Analytics
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
