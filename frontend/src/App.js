import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from './components/HomePage'
import SpotDetails from "./components/SpotDetails";
import CreateSpot from "./components/CreateSpot";
import AddReview from "./components/Reviews/AddReview"
import UserReviews from "./components/Reviews/UserReviews";
import UserSpots from './components/SpotDetails/UserSpots'
import EditReview
  from "./components/Reviews/EditReview";
import UserBookings from "./components/Booking/UserBookings";
import EditBooking from "./components/Booking/EditBooking";
import Results from "./components/Search/Results";
import Footer from "./components/Navigation/Footer";

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
          <Route exact path='/spots/current' component={UserSpots} />
          <Route exact path='/spots/:spotId/reviews' component={AddReview}></Route>
          <Route exact path='/spots/:spotId' component={SpotDetails} />
          <Route exact path='/reviews/current' component={UserReviews} />
          <Route exact path='/reviews/:reviewId' component={EditReview} />
          <Route exact path='/bookings/current' component={UserBookings} />
          <Route exact path='/bookings/:bookingId' component={EditBooking} />
          <Route path='/search' component={Results} />
          <Route path='/spots' component={CreateSpot} />
          <Route><div style={{ color: 'red', marginTop: "100px", marginLeft: '38%', fontSize: 'xx-large' }} id='header'>404 Page Not Found</div></Route>
        </Switch>
      )}
      <Footer />
    </>
  );
}

export default App;
