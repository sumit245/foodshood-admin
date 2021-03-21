import { Avatar } from "@material-ui/core";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Settings,
  Edit3,
  LifeBuoy,
  LogOut,
  Bell,
  Mail,
} from "react-feather";

export default class TopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: true,
      adminName: sessionStorage.getItem("adminName"),
      adminRole: sessionStorage.getItem("adminRole"),
    };
    this.drpDownClicked = this.drpDownClicked.bind(this);
  }

  drpDownClicked() {
    console.log(this.state.check);
    if (this.state.check) {
      let drp = document.getElementById("drpdn");
      drp.style.display = "block";
    } else {
      let drp = document.getElementById("drpdn");
      drp.style.display = "none";
    }
  }
  render() {
    const { adminName, adminRole } = this.state;
    return (
      <>
        <header className="navbar navbar-header navbar-header-fixed">
          <div className="navbar-brand">
            <Link to="../../index.html" className="df-logo">
              Munky<span>box</span>
            </Link>
          </div>
          {/* navbar-brand */}
          <div id="navbarMenu" className="navbar-menu-wrapper">
            <div className="nav navbar-menu">
              <div className="nav-item" style={{width:400}}>
                <div className=" search-form">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search"
                  />
                  <button className="btn" type="button">
                    <Search />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* navbar-menu-wrapper */}
          <div className="navbar-right">
            <div className='nav-link'>
            <Mail/>
            </div>
            <div className='nav-link'>
              <Bell/>
            </div>
            <div className="dropdown dropdown-profile">
              <Link
                to='#'
                className="dropdown-link"
                data-toggle="dropdown"
                data-display="static"
                onClick={() => {
                  this.setState((prevState) => ({
                    check: !prevState.check,
                  }));
                  this.drpDownClicked();
                }}
              >
                <div className="avatar avatar-sm">
                  <Avatar className="rounded-circle">Ad</Avatar>
                </div>
              </Link>
              {/* dropdown-link */}
              {/* dropdown-link */}
              <div
                className="dropdown-menu dropdown-menu-right tx-13"
                id="drpdn"
              >
                <div className="avatar avatar-lg mg-b-15">
                  <Avatar className="rounded-circle">Ad</Avatar>
                </div>
                <h6 className="tx-semibold tx-uppercase mg-b-5">{adminName}</h6>
                <p className="mg-b-25 tx-12 tx-uppercase tx-color-03">
                  {adminRole}
                </p>
                {adminRole === "admin" ? (
                  <>
                  <Link to="/settings" className="dropdown-item">
                    <Edit3 /> View Profile
                  </Link>
                  <div className="dropdown-divider" />
                   <Link to="/settings" className="dropdown-item">
                   <LifeBuoy /> Company Setting
                 </Link>
                 <Link to="/settings" className="dropdown-item">
                   <Settings />
                   Account Settings
                 </Link>
                 <Link to="/logout" className="dropdown-item">
                   <LogOut />
                   Sign Out
                 </Link>
                 </>
                ) : (
                  <>
                  <Link to="/settings" className="dropdown-item">
                    <Edit3 /> View Profile
                  </Link>
                  <div className="dropdown-divider" />
                  <Link to="/logout" className="dropdown-item">
                   <LogOut />
                   Sign Out
                 </Link>


                  </>
                )}

               
              </div>
              {/* dropdown-menu */}
            </div>
            {/* dropdown */}
          </div>
          {/* navbar-right */}
        </header>
        {/* navbar */}
      </>
    );
  }
}
