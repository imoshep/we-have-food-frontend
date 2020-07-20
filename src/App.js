import React, { Component } from "react";
import "./App.scss";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import userService from "./services/userService";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/common/protected-route";

import Login from "./components/login";
import Signup from "./components/signup";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import AddFood from "./components/add-food";
import Homepage from "./components/homepage";

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
        <ToastContainer />
        <Navbar user={user} />
        <main>
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/user/login" exact component={Login} />
            <Route path="/user/signup" exact component={Signup} />
            <ProtectedRoute path="/food/add" exact component={AddFood} />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;
