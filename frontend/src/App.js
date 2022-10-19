import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from './components/HomePage'
import SpotDetails from "./components/SpotDetails";
import CreateSpot from "./components/CreateSpot";
import AddReview from "./components/Reviews/AddReview"
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/spots/:spotId/reviews' component={AddReview}></Route>
          <Route exact path='/spots/:spotId' component={SpotDetails} />
          <Route path='/spots' component={CreateSpot} />
        </Switch>
      )}
    </>
  );
}

export default App;
