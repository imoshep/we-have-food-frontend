import React, { Component } from "react";
import "./App.scss";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userService from "./services/userService";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserCircle,
  faPeopleArrows,
  faStar,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

import ProtectedRoute from "./components/common/protected-route";
import Login from "./components/login";
import Logout from "./components/logout";
import Signup from "./components/signup";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import AddFood from "./components/add-food";
import Homepage from "./components/homepage";
import FindFood from "./components/find-food";
import ViewUser from "./components/view-user";
import ViewFood from "./components/view-food";
import EditFood from "./components/edit-food";
import PageNotFound from "./components/page-not-found";

class App extends Component {
  state = {};

 
  componentDidMount() {
    library.add(
      faUserCircle,
      faPeopleArrows,
      faStar,
      faCaretDown,
      farStar
    );
    const user = userService.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <div className="app-container">
        <ToastContainer pauseOnFocusLoss={false} rtl />
        <Navbar user={user} />
        <main>
          <div id="content">
            <Switch>
              <Route path="/" exact component={Homepage} />
              <Route path="/user/login" exact component={Login} />
              <Route path="/user/signup" exact component={Signup} />
              <Route path="/user/logout" exact component={Logout} />
              <ProtectedRoute path="/user/me" exact component={ViewUser} />
              <ProtectedRoute path="/food/edit" exact component={EditFood} />
              <ProtectedRoute path="/food/add" exact component={AddFood} />
              <ProtectedRoute path="/food/search" exact component={FindFood} />
              <ProtectedRoute path="/food" component={ViewFood} />
              <Route path='/' component={PageNotFound} />
            </Switch>
          </div>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;



  // "serverUrl": "https://localhost:5000/",
  // "apiUrl": "https://localhost:5000/api",
  
  // "apiUrl": "https://young-everglades-57688.herokuapp.com/api",
  // "serverUrl": "https://young-everglades-57688.herokuapp.com/",
  
  // "apiUrl": "ec2-18-156-192-107.eu-central-1.compute.amazonaws.com/api",
  // "serverUrl": "ec2-18-156-192-107.eu-central-1.compute.amazonaws.com/",