import React, { Component } from "react";
import "./App.scss";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import userService from "./services/userService";
import "react-toastify/dist/ReactToastify.css";
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

class App extends Component {
  state = {};

  componentDidMount() {
    const user = userService.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <div className="app-container" dir="rtl">
        <ToastContainer pauseOnFocusLoss={false} rtl />
        <Navbar user={user} />
        <main>
          <div id="content">
            <Switch>
              <Route path="/" exact component={Homepage} />
              <Route path="/user/login" exact component={Login} />
              <Route path="/user/signup" exact component={Signup} />
              <Route path="/user/logout" exact component={Logout} />
              <Route path="/user/me" exact component={ViewUser} />
              <ProtectedRoute path="/food/add" exact component={AddFood} />
              <Route path="/food/search" exact component={FindFood} />
              <Route path="/food" component={ViewFood} />
              <Route path="/" component={Homepage} />
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
