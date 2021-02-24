import React, { Component } from "react";
import "jquery";
import "../../assets/css/dashforge.css";
import { getClients, updateClient } from "../../controllers/ClientController";

export default class EditContent extends Component {
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
    updateClient(data._id, data)
    window.location.href = '/clientdetail?data=' + data.mobile_number
  }
  onChangeHandler(e) {
    let val = e.target.value;
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
              <h6 className="mg-b-0">Company Details</h6>
            </div>
            <hr style={{ height: 1 }} />
            <div className="row">
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
              <div className="col-6 col-sm-4">
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

              <div className="col-6 col-sm-4 mg-t-20">
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
              <div className="col-6 col-sm-4 mg-t-20">
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
              <div className="col-sm col-sm-4 mg-t-20">
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
            <div className="d-flex align-items-center justify-content-between mg-t-25">
              <h6 className="mg-b-0">Billing Address</h6>
            </div>
            <hr style={{ height: 1 }} />
            <div className="row row-sm">
              <div className="col-sm-4 mg-t-20 mg-sm-t-25">
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
              <div className="col-sm-4 mg-t-20 mg-sm-t-25">
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
              <div className="col-sm-4 mg-t-20 mg-sm-t-25">
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
            <div className="d-flex align-items-center justify-content-between mg-t-25 mg-b-10">
            <h6 className="mg-b-0">Communication Action</h6>
          </div>
          <hr style={{ height: 1 }} />
            <div className="row row-sm">
              <div className="col col-3 mg-t-10">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="check1" />
                  <label className="custom-control-label tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10" htmlFor="check1">SMS Opt-Out</label>
                </div>
              </div>
              <div className="col col-3 mg-t-10">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="check2" />
                  <label className="custom-control-label tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10" htmlFor="check2">Email Opt-Out</label>
                </div>

              </div>
            </div>
          </form>
        </div>

      </div>
    );
  }
}
