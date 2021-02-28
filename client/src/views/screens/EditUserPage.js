import React, { Component } from 'react'
import AddUserForm from "../components/AddUserForm";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";

export default class EditUserPage extends Component {
    render() {
        return (
            <>
        <TopNav />
        <div className="contact-wrapper">
          <SideNav />
          <AddUserForm />
        </div>
      </>
        )
    }
}
