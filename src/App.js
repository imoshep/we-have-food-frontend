import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/common/protected-route";

import Login from "./components/login";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import AddFood from "./components/add-food";
import Homepage from "./components/homepage";

function App() {
  return (
    <div className="container-fluid">
      <header>
        <ToastContainer />
        <Navbar />
      </header>
      <main>
        <Switch>
          {/* <ProtectedRoute path="/" component={AddFood} /> */}
          <Route path="/" exact component={Homepage} />
        </Switch>
        <Login />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
