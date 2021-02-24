import React, { Component } from "react";
import "jquery";
import "../../assets/css/dashforge.css";
import { getClients, updateClient } from "../../controllers/ClientController";

export default class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      allUsers: [],
      client_names: [],
      currClients: {},
      ...props.client
    };
  }
  onSubmit(e) {
    e.preventDefault();
    const data = this.state;
    console.log(data);
    updateClient(data._id,data)
    window.location.href='/Clients?data='+data.mobile_number
  }
  onChangeHandler(e) {
    let val=e.target.value;
    this.setState({
      [e.target.name]: val,
    });
    const newVal = {
      [e.target.name]: e.target.value,
    };
    console.log(newVal);
  }
  componentDidMount() {
    let currClient = this.props.client;
    var clients = getClients();
    clients
      .then((data) => data)
      .then((json) => {
        var users = json;
        var clientNames = [];
        users.forEach((element) => {
          clientNames.push(element.client_name);
        });
        this.setState({
          allUsers: json,
          currClients: currClient,
          client_names: clientNames,
        });
      });
  }
  render() {
    // const { allUsers, client_names, currClients } = this.state;

    return (
      <div id="contactInformation" className=" pd-20 pd-xl-25">
        <div className="d-flex align-items-center justify-content-between mg-b-25">
        <form action="">
                <div className="d-flex align-items-center justify-content-between mg-b-25">
                  <h6 className="mg-b-0">Personal Details</h6>
                </div>
                <div className="row">
                  <div className="col-6 col-sm">
                    <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                      Client Name
                    </label>
                    <p className="mg-b-0">
                      <input
                        onChange={this.onChangeHandler}
                        name="client_name"
                        value={this.state.client_name}
                      />
                    </p>
                  </div>
                  {/* col */}
                  <div className="col-6 col-sm">
                    <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                      Mobile Number
                    </label>
                    <p className="mg-b-0">
                      <input
                        onChange={this.onChangeHandler}
                        name="mobile_number"
                        value={this.state.mobile_number}
                        required
                      />
                    </p>
                  </div>
                  {/* col */}
                  <div className="col-sm mg-t-20 mg-sm-t-0">
                    <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                      Phone Number
                    </label>
                    <p className="mg-b-0">
                      <input
                        onChange={this.onChangeHandler}
                        name="phone_number"
                        value={this.state.phone_number}
                      />
                    </p>
                  </div>
                  {/* col */}
                </div>
                {/* row */}
                <h6 className="mg-t-40 mg-b-20">Billing Details</h6>
                <div className="row row-sm">
                  <div className="col-6 col-sm-4">
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
                  <div className="col-6 col-sm-4">
                    <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                      Company
                    </label>
                    <p className="mg-b-0">
                      <input
                        onChange={this.onChangeHandler}
                        name="company"
                        value={this.state.company}
                      />
                    </p>
                  </div>
                  <div className="col-6 col-sm-4 mg-t-20 mg-sm-t-0">
                    <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                      GST Number
                    </label>
                    <p className="mg-b-0">
                      <input
                        onChange={this.onChangeHandler}
                        name="gst_num"
                        value={this.state.gst_num}
                      />
                    </p>
                  </div>
                  <div className="col-sm-4 mg-t-20 mg-sm-t-30">
                    <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                      Sector
                    </label>
                    <p className="mg-b-0">
                      <input
                        onChange={this.onChangeHandler}
                        name="sector"
                        value={this.state.sector}
                      />
                    </p>
                  </div>
                  <div className="col-sm-4 mg-t-20 mg-sm-t-30">
                    <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                      Block
                    </label>
                    <p className="mg-b-0">
                      <input
                        onChange={this.onChangeHandler}
                        name="block"
                        value={this.state.block}
                      />
                    </p>
                  </div>
                  <div className="col-sm-4 mg-t-20 mg-sm-t-30">
                    <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                      Address
                    </label>
                    <p className="mg-b-0">
                      <input
                        onChange={this.onChangeHandler}
                        name="address"
                        value={this.state.address}
                      />
                    </p>
                  </div>
                </div>
                {/* row */}
                <div className="row row-sm">
                  <div className="col-sm mg-t-20 mg-sm-t-30">
                    {" "}
                    <div className="d-flex px-5 justify-content-end mr-5">
                      <button
                        type="submit"
                        className="btn btn-sm btn-white mr-2"
                        style={{ zIndex: 1000 }}
                      >
                        Reset
                      </button>
                      <button
                        onClick={this.onSubmit}
                        className="btn btn-sm  btn-icon mr-4 btn-primary"
                        style={{ zIndex: 1000 }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </form>
        </div>
               
      </div>
    );
  }
}
