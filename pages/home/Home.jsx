import "./home.css";
import logo from './Glitch_Logo_400x.gif';
import RoastingList from "./roastinglist/RoastingList"
import { FormControl, Grid, TextField, InputLabel,Container,Button,Typography } from "@mui/material";

export default function Home() {
  return (
    <div className="home">
      <div className="roastingList">
        <h1>Welcome to Glitch Coffee Roasters Roasting System</h1>
        <h2>
          Guide
        </h2>
        <h3>
          Creating a Recipe
        </h3>
        <p>
          Click on Recipes on the sidebar. Then click on the "Create Recipe" blue button on the top right of the table.
        </p>
        <h3>
        Calculating Roasting List
      </h3>
        <p>
          Click on Orders on the sidebar. Check all of the orders you desire to be calculated and then press the Calculate button.
        </p>
      </div>
      <div>
        <h2>
          TO DO'S
        </h2>
        <p>
          Authentication
        </p>
        <p>
          Make website pretty
        </p>
        <p>
          Maybe have capablilty to send an email of a created roasting list
        </p>
        <h2>
          Glitches/Errors
        </h2>
        <p>
          Dates of orders are a day before (fixed on 27/11/21)
        </p>
        <p>
          Cannot reload page
        </p>
      </div>

    </div>
  );
}
