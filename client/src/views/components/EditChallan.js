import React, { Component } from "react";
import "jquery";
import "../../assets/css/dashforge.css";
import { getChallans, updateChallans } from "../../controllers/ChallanController";
import $ from 'jquery'
import {challanhelper} from '../../helper/challanhelper'

export default class EditChallan extends Component {
  constructor(props) {
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      allChallan: [],
      client_names: [],
      currChallan: {},
      ...props.challan,
    };
  }
  onSubmit(e) {
    e.preventDefault();
    const data = this.state;
    updateChallans(data._id, data);
    window.location.href = "/challandetail?data=" + data.mobile_number;
  }
  onChangeHandler(e) {
    let val = e.target.value;
    this.setState({
      [e.target.name]: val,
    });
    // const newVal = {
    //   [e.target.name]: e.target.value,
    // };
    // console.log(newVal);
  }
  componentDidMount() {
    challanhelper();
    const self=this
    let currChallan = this.props.challan;
    var challans = getChallans();
    challans
      .then((data) => data)
      .then((json) => {
        var users = json;
        var clientNames = [];
        users.forEach((element) => {
          clientNames.push(element.client_name);
        });
        this.setState({
          allUsers: json,
          currChallans: currChallan,
          client_names: clientNames,
        });
      });
    $(document).ready(function () {
      let due = $(".due").html().replace("₹", "");
      self.setState({ balance: due });
      if (self.props.addState) {
        var client_name = $("#clnt_name");
        $("#sbmtBtn").click(function () {
          $("#myForm").submit();
          console.log(client_name);
        });
      }
    });
  }
  render() {
    // const { allUsers, client_names, currChallans } = this.state;

    return (
      <div id="contactInformation" className=" pd-20 pd-xl-25">
        <div className="d-flex align-items-center justify-content-between mg-b-25">
          <form action="">
            <div className="row">
              <div className="col-sm-4">
                <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                  challan number
                </label>
                <p className="mg-b-0">
                  <input
                    onChange={this.onChangeHandler}
                    name="challan_num"
                    value={this.state.challan_num}
                  />
                </p>
              </div>
              {/* col */}
              <div className="col-sm-4">
                <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                  date
                </label>
                <p className="mg-b-0">
                  <input
                    id="date"
                    onChange={this.onChangeHandler}
                    name="challan_date"
                    defaultValue={this.state.challan_date}
                    required
                  />
                </p>
              </div>
              {/* col */}
              <div className="col-sm-4">
                <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                  due date
                </label>
                <p className="mg-b-0">
                  <input
                    onChange={this.onChangeHandler}
                    name="due_date"
                    value={this.state.due_date}
                  />
                </p>
              </div>
            </div>
            <div className="row mg-t-10">
              <div className="col-4">
                <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                  client Name
                </label>
                <p className="mg-b-0">
                  <input
                    className="col-10"
                    onClick={this.showClientTable}
                    onChange={this.onChangeHandler}
                    name="client_name"
                    value={this.state.client_name}
                  />
                </p>
              </div>
              <div className="col-sm-6 col-lg-8 mg-t-10 mg-sm-t-0 mg-md-t-5">
                <label className="tx-sans tx-uppercase tx-10 tx-medium tx-spacing-1 tx-color-03">
                  Billed To
                </label>
                <div
                  className="mg-t-n5"
                  style={{ flexDirection: "row", display: "flex" }}
                >
                  <h6 className="tx-15 mg-b-2" id="cn">
                    {this.state.client_name}
                  </h6>
                  &nbsp;
                  <h6 className="tx-15 mg-b-2" id="cc">
                    {this.state.company}
                  </h6>
                </div>
                <p className="tx-12 mg-b-0" id="gst">
                  GST No: {this.state.gst_num}
                </p>
                <p className="tx-12 mg-b-0" id="mob">
                  Mob:{" " + this.state.mobile_number || ""}{" "}
                </p>
              </div>
            </div>
            {/* col */}
            {/* row */}

            {/* <h6 className="mg-t-40 mg-b-20"></h6> */}
            <div className="row row-sm" id="item-row">
              <div className="col-4 mx-0 px-1" id="item-name">
                <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                  item name
                </label>
                <input
                  className="col-sm-12"
                  onChange={this.onChangeHandler}
                  id="item-name"
                  placeholder="Item Name"
                  name="item_name"
                  value={this.state.item_name}
                />
                <input
                  className="col-sm-12"
                  id="description"
                  placeholder="Description"
                  onChange={this.onChangeHandler}
                  name="item_description"
                  value={this.state.item_desc}
                />
                <div id="delete" className="mx-0 px-0 py-0 my-0">
                  <p className="tx-14 tx-danger my-0">X</p>
                </div>
              </div>

              <div className="col-1 mx-0 px-1">
                <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                  Quantity
                </label>
                <input
                  className="col-sm-12"
                  id="qty"
                  onChange={this.onChangeHandler}
                  name="quantity"
                  value={this.state.quantity}
                />
              </div>
              <div className="col-2 mx-0 px-1">
                <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                  item cost
                </label>
                <input
                  className="col-sm-12"
                  onChange={this.onChangeHandler}
                  id="cost"
                  name="item_cost"
                  value={this.state.item_cost}
                />
              </div>
              <div className="col-2 mx-0 px-1">
                <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                  Disc.
                </label>
                <input
                  className="col-sm-12"
                  onChange={this.onChangeHandler}
                  id="disc"
                  name="item_disc"
                  value={this.state.item_disc}
                />
              </div>
              <div className="col-2 mx-0 px-1">
                <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                  SubTotal
                </label>
                <span
                  color="fff"
                  className="col-sm-12"
                  onChange={this.onChangeHandler}
                  id="price"
                  name="item_price"
                  value={this.state.item_price}
                  readOnly
                ></span>
              </div>
            </div>

            <div className="row row-sm" id="addrow">
              <div className="col-sm mg-t-20 mg-sm-t-10">
                <p className="tx-12 tx-medium tx-spacing-1 tx-primary">
                  Add a row
                </p>
              </div>
            </div>

            <div className="row row-sm">
              <div className="col-sm mg-t-20 mg-sm-t-0">
                {" "}
                <div className="d-flex px-5 justify-content-end mr-5">
                  <div style={{ flexDirection: "column" }}>
                    <div
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p className="mg-b-0 mr-2">Total</p>
                      <div id="subtotal">₹0.00</div>
                    </div>
                    <div
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p className="mg-b-0 mr-2">Disc.:</p>
                      <div id="gDisc">₹0.00</div>
                    </div>
                    <div
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p className="mg-b-0 mr-2">Grand Total:</p>
                      <div id="total">₹0.00</div>
                    </div>
                    <div
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p className="mg-b-0 mr-2">Paid</p>
                      <div id="paid">₹0.00</div>
                    </div>
                    <div
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p className="mg-b-0 mr-2">Balance</p>
                      <div className="due">₹0.00</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* row */}
            <div className="row row-sm">
              <div className="col-sm mg-t-20 mg-sm-t-10">
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
                    className="btn btn-sm  btn-icon px-5 btn-primary"
                    style={{ zIndex: 1000 }}
                  >
                    Add
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
