import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import SnackOrBoozeApi from "./Api";
import NavBar from "./NavBar";
import { Route, Switch } from "react-router-dom";
//import FoodMenu from "./FoodMenu";
import SnackOrBoozeMenu from "./ListMenu";
import Snack from "./FoodItem";
import Drink from "./DrinkItem";
//import DrinkMenu from "./DrinkMenu";
//import DrinkItem from "./DrinkItem";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [snacks, setSnacks] = useState([]);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    async function getSnacksAndDrinks() {
      let snacks = await SnackOrBoozeApi.getSnacks();
      let drinks = await SnackOrBoozeApi.getDrinks();
      setSnacks(snacks);
      setDrinks(drinks);
      console.log(snacks);
      console.log(drinks);
      setIsLoading(false);
    }
    getSnacksAndDrinks();
  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/">
              <Home snacks={snacks} />
            </Route>
            <Route exact path="/snacks">
              <SnackOrBoozeMenu title="Food Items" path="/snacks" items={snacks}  />
            </Route>
            <Route path="/snacks/:id">
              <Snack items={snacks} cantFind="/snacks" />
            </Route>
            <Route exact path="/drinks">
              <SnackOrBoozeMenu title="Drinks" path="/drinks" items={drinks} />
            </Route>
            <Route path="/drinks/:id">
              <Drink items={drinks} cantFind="/drinks" />
            </Route>
            <Route>
              <p>Hmmm. I can't seem to find what you want.</p>
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
