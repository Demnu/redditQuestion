import React from "react";
import "./topbar.css";
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import logo from './logo.png';
import logo2 from './logo2.png';

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <a href="/" className="topLeft">
          <img className="logo" src={logo}/>
        </a>

        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsIcon />
            <span className="topIconBadge">2</span>
          </div>

          <div className="topbarIconContainer">
              <SettingsIcon/>
          </div>
        </div>
      </div>
    </div>
  );
}
