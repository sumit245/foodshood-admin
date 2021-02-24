import React, { Component } from "react";
import "../assets/css/dashforge.css";
import "../assets/css/dashforge.contacts.css";
import { BrowserRouter, Route } from "react-router-dom";
import 'react-feather'
import "jquery";
import HomeScreen from "./screens/HomeScreeen";
import ProductScreen from "./screens/ProductScreen";
import BillScreen from './screens/BillScreen'
import ChallanScreen from './screens/ChallanScreen'
import ClientTable from './components/ClientTable'
import Dashboard from './screens/Dashboard'
import ClientChallan from './components/ClientChallan'
import ClientProduct from './components/ClientProduct'
import ClientBills from './components/ClientBills'
import LoginScreen,{ForgotPage} from './screens/LoginScreen'
import Settings from './screens/Settings'
import Logout from "./components/Logout";
import PaymentScreen from "./screens/PaymentScreen";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.checkLogin=this.checkLogin.bind(this)
    this.state={
      user:""
    }
  }
  
  
  
  checkLogin(){
    var x=sessionStorage.getItem('adminName')
    this.setState({user:x||"" })
  }
  componentDidMount(){
    setInterval(this.checkLogin,1000)
  }
  
  render() {
    const {user}=this.state
    return (
      <>
        <BrowserRouter>
          {user.length>1?<Route path="/" component={Dashboard} exact /> : <Route path="/" component={LoginScreen} exact /> }
          <Route path='/clientdetail'component={ClientTable}/>
          <Route path='/challandetail'component={ClientChallan} exact/>
          <Route path='/productdetail' component={ClientProduct }/>
          <Route path='/forgotpage' component={ForgotPage}/>
          <Route path='/billdetail' component={ClientBills}/>
          <Route path="/Home" component={HomeScreen} />
          <Route path='/logout' component={Logout} />
          <Route path="/Challans" component={ChallanScreen} />
          <Route path="/settings" component={Settings} />
          <Route path="/Payments" component={PaymentScreen} />
          <Route path="/Bills" component={BillScreen} />
          <Route path="/Products" component={ProductScreen} />
        </BrowserRouter>
      </>
    );
  }
}
