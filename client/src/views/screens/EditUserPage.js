import axios from 'axios';
import React, { Component } from 'react'
import { getClientbyID } from '../../controllers/ClientController';
import AddUserForm from "../components/AddUserForm";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";

export default class EditUserPage extends Component {
  state = {
    userdata: []
  }
  constructor(props) {
    super(props);
    let url = window.location.href;
    const idofclient = url.split('id=')[1];
    axios.get('/api/users/'+idofclient).then(res=>{
      this.setState({userdata:res.data})
    }).catch(err=>console.error(err))
  }
  
  componentDidMount() {

    
  }

  render() {
    console.log(this.state.userdata);
    return (
      <>
        <TopNav />
        <div className="contact-wrapper">
          <SideNav />
          <AddUserForm data={this.state.userdata} title="Edit User" btnTitle="Add" isLoaded={true} />
        </div>
      </>
    )
  }
}
