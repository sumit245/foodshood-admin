import React, { Component } from "react";
import "jquery";
import "../../assets/css/dashforge.css";
import { addClient, updateClient } from "../../controllers/ClientController";

export default class AddUserForm extends Component {
  state = {}

  componentDidMount() {
    if (this.props.title === "Edit User") {
      this.setState({
        ...this.props.data,
        flat_num: this.props.data.address.flat_num,
        locality: this.props.data.address.locality,
        city: this.props.data.address.city,
        state: this.props.data.address.state,
        postal_code: this.props.data.address.postal_code,
        country: this.props.data.address.country,
        lat: this.props.data.address.geo.lat,
        lng: this.props.data.address.geo.lng
      })
    }
    else if(this.props.title === "View User" ){
      this.setState({
        ...this.props.data,
        flat_num: this.props.data.address.flat_num,
        locality: this.props.data.address.locality,
        city: this.props.data.address.city,
        state: this.props.data.address.state,
        postal_code: this.props.data.address.postal_code,
        country: this.props.data.address.country,
        lat: this.props.data.address.geo.lat,
        lng: this.props.data.address.geo.lng
      })

    }
  }



  onChangeHandler = (e) => {
    const value = e.target.value;
    this.setState({
      [e.target.name]: value,
    });
  }
  onSubmit = (e) => {
    e.preventDefault();
    const data = this.state;
    let address = {
      geo: {
        lat: data.lat,
        lng: data.lng,
      },
      flat_num: data.flat_num,
      locality: data.locality,
      sector: data.sector,
      block: data.block,
      city: data.city,
      postal_code: data.postal_code,
      state: data.state,
      country: data.country,
    };
    const newUser = {
      address: address,
      first_name: data.first_name,
      last_name: data.last_name,
      email_id: data.email_id,
      phone: data.phone,
      status: data.status
    };
    console.log(newUser);
    if(this.props.title==="Add User"){
      addClient(newUser);
      window.location.href = "/users-dashboard";
    }
    else if(this.props.title==="Edit User"){
      updateClient(this.props.data._id,newUser)
      window.location.href="/users-dashboard"
    }
    else if(this.props.btnTitle==="Back"){
      window.location.href="/users-dashboard"

    }
    

    
  }

  render() {
    return (
      <div className="contact-content">
        <div
          className="tab-content"
          style={{ position: "absolute", left: 0, width: "80%" }}
        >
          <div id="contactInformation" className=" pd-20 pd-xl-25">
            <form action="">
              <div
                className="row row-sm"
                style={{ backgroundColor: "#fff", marginTop: -10 }}
              >
                <div className="col-sm mg-t-10 mg-sm-t-10 mg-b-10">
                  <h5 className="tx mg-t-5">{this.props.title}</h5>
                </div>
                <div className="col-sm mg-t-10 mg-sm-t-10 mg-b-10">
                  {" "}
                  <div className="d-flex px-5 justify-content-end">
                    <button
                      onClick={() => {
                        window.location.href = "/Home";
                      }}
                      className="btn btn-sm btn-white mr-2"
                      style={{ zIndex: 1000 }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={this.onSubmit}
                      className="btn btn-sm  btn-icon btn-primary px-4 mx-1"
                      style={{ zIndex: 1000 }}
                    >
                      {this.props.btnTitle}
                    </button>
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-between mg-t-25 mg-b-25">
                <h6 className="mg-b-0">Personal Details</h6>
              </div>
              <div className="row row-sm">
                <div className="col-6 col-sm-4 ">
                  <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                    First Name
                  </label>
                  <p className="mg-b-0">
                    <input
                      onChange={this.onChangeHandler}
                      name="first_name"
                      value={this.state.first_name || this.props.first_name}
                    />
                  </p>
                </div>
                <div className="col-6 col-sm-4 ">
                  <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                    Last name
                  </label>
                  <p className="mg-b-0">
                    <input
                      onChange={this.onChangeHandler}
                      name="last_name"
                      value={this.state.last_name}
                    />
                  </p>
                </div>
                <div className="col-6 col-sm-4 ">
                  <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                    Email Address
                  </label>
                  <p className=" mg-b-0">
                    <input
                      onChange={this.onChangeHandler}
                      name="email_id"
                      value={this.state.email_id}
                    />
                  </p>
                </div>
                <div className="col-6 col-sm-4 mg-sm-t-10">
                  <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                    Phone Number
                  </label>
                  <p className="mg-b-0">
                    <input
                      onChange={this.onChangeHandler}
                      name="phone"
                      value={this.state.phone}
                    />
                  </p>
                </div>
                <div className="col-sm-4 mg-sm-t-10">
                  <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                    Latitude
                  </label>
                  <p className="mg-b-0">
                    <input
                      onChange={this.onChangeHandler}
                      name="lat"
                      value={this.state.lat}
                    />
                  </p>
                </div>
                <div className="col-sm-4 mg-sm-t-10">
                  <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                    Longitude
                  </label>
                  <p className="mg-b-0">
                    <input
                      onChange={this.onChangeHandler}
                      name="lng"
                      value={this.state.lng}
                    />
                  </p>
                </div>
              </div>

              <div className="row row-sm">
                <div className="col-sm-4 mg-t-20 mg-sm-t-30">
                  <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                    Flat/Apartment
                  </label>
                  <p className="mg-b-0">
                    <input
                      onChange={this.onChangeHandler}
                      name="flat_num"
                      value={this.state.flat_num}
                    />
                  </p>
                </div>
                <div className="col-sm-4 mg-t-20 mg-sm-t-30">
                  <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                    Street
                  </label>
                  <p className="mg-b-0">
                    <input
                      onChange={this.onChangeHandler}
                      name="locality"
                      value={this.state.locality}
                    />
                  </p>
                </div>
                <div className="col-sm-4 mg-t-20 mg-sm-t-30">
                  <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                    City
                  </label>
                  <p className="mg-b-0">
                    <input
                      onChange={this.onChangeHandler}
                      name="city"
                      value={this.state.city}
                    />
                  </p>
                </div>
                <div className="col-6 col-sm-4 mg-t-20 mg-sm-t-30">
                  <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                    State
                  </label>
                  <p className="mg-b-0">
                    <input
                      onChange={this.onChangeHandler}
                      name="state"
                      value={this.state.state}
                    />
                  </p>
                </div>
                <div className="col-6 col-sm-4 mg-t-20 mg-sm-t-30">
                  <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                    Country
                  </label>
                  <p className="mg-b-0">
                    <input
                      onChange={this.onChangeHandler}
                      name="country"
                      value={this.state.country}
                      required
                    />
                  </p>
                </div>
                <div className="col-6 col-sm-4 mg-t-20 mg-sm-t-30">
                  <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                    Postal Code
                  </label>
                  <p className="mg-b-0">
                    <input
                      onChange={this.onChangeHandler}
                      name="postal_code"
                      value={this.state.postal_code}
                      required
                    />
                  </p>
                </div>
                <div className="col-sm col-sm-4 mg-t-20 mg-sm-t-30 ">
                  <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                    Status
                  </label>
                  <p className="mg-b-0">
                    <input
                      onChange={this.onChangeHandler}
                      name="status"
                      value={this.state.status}
                    />
                  </p>
                </div>
              </div>
              {/* row */}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
