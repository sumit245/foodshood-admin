import React, { Component } from "react";
import "../assets/css/dashforge.css";
import "../assets/css/dashforge.contacts.css";
import { BrowserRouter, Route } from "react-router-dom";
import "react-feather";
import "jquery";
import HomeScreen from "./screens/HomeScreeen";
import Dashboard from "./screens/Dashboard";
import LoginScreen, { ForgotPage } from "./screens/LoginScreen";
import Settings from "./screens/Settings";
import Logout from "./components/Logout";
import AddUserPage from "./screens/AddUserPage";
import EditUserPage from "./screens/EditUserPage";
import AddRestaurantPage from "./screens/AddRestaurantPage";
import RestaurantScreen from "./screens/RestaurantScreen";
import ViewUser from './screens/ViewUser'
import EditRestaurant from './screens/EditRestaurant'
export default class App extends Component {
  constructor(props) {
    super(props);
    this.checkLogin = this.checkLogin.bind(this);
    this.state = {
      user: "",
    };
  }

  checkLogin() {
    var x = sessionStorage.getItem("adminName");
    this.setState({ user: x || "" });
  }
  componentDidMount() {
    setInterval(this.checkLogin, 1000);
  }

  render() {
    const { user } = this.state;
    return (
      <>
        <BrowserRouter>
          {user.length > 1 ? (
            <Route path="/" component={Dashboard} exact />
          ) : (
            <Route path="/" component={LoginScreen} exact />
          )}
          <Route path="/forgotpage" component={ForgotPage} />
          <Route path="/users-dashboard" component={HomeScreen} />
          <Route path="/view-user" component={ViewUser}/>
          <Route path="/add-user" component={AddUserPage} />
          <Route path="/edit-user" component={EditUserPage} />
          <Route path="/restaurant-add" component={AddRestaurantPage} />
          <Route path="/restaurant-dashboard" component={RestaurantScreen} />
          <Route path="/edit-restaurant" component={EditRestaurant} />
          <Route path="/logout" component={Logout} />
          <Route path="/settings" component={Settings} />
        </BrowserRouter>
      </>
    );
  }
}
