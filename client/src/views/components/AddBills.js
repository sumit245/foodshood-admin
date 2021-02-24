import React, { Component } from "react";
import "jquery";
import "../../assets/css/dashforge.css";
import $ from "jquery";
import { addBills, getBills } from "../../controllers/BillController";
import { challanhelper } from "../../helper/challanhelper";
let Bills = getBills();
export default class AddBills extends Component {
  constructor(props) {
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      supplier: "",
      mobile_number: "",
      phone_number: "",
      company: "",
      sector: "",
      block: "",
      address: "",
      gst_num: "",
    };
  }
  onChangeHandler(e) {
    const value = e.target.value;
    this.setState({
      [e.target.name]: value,
    });
    const newVal = {
      [e.target.name]: value,
    };
    console.log(newVal);
  }
  onSubmit(e) {
    e.preventDefault();
    const data = this.state;
    data.challan_date = $("#date").val();
    data.item_price = $("#subtotal").html().replace("₹", "");
    data.grand_disc = $("#gDisc").html().replace("₹", "");
    data.grand_total = $("#total").html().replace("₹", "");
    data.balance = $(".due").html().replace("₹", "");
    addBills(data);
    console.log(data);
    // window.location.href = "/Bills";
  }
  componentDidMount() {
    const self = this;
    challanhelper();
    const { clients } = this.state;
    Bills.then((data) => data)
      .then((json) => {
        this.setState({ clients: json });
      })
      .catch((err) => {
        console.log(err);
      });

    $(document).ready(function () {
      let due = $(".due").html().replace("₹", "");
      self.setState({ balance: due });
      if (self.props.addState) {
        var supplier = $("#clnt_name");
        $("#sbmtBtn").click(function () {
          $("#myForm").submit();
          // addBill(newBill)
          console.log(supplier);
        });
      }
    });
    // document.querySelector("form").addEventListener("submit", this.onSubmit);
  }
  render() {
    if (this.props.addState) {
      return (
        <div id="contactInformation" className=" pd-20 pd-xl-25">
          <div className="d-flex align-items-center justify-content-between mg-b-25">
            <h6 className="mg-b-0">Personal Details</h6>
          </div>
          <div className="row">
            <div className="col-6 col-sm">
              <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                Supplier Name
              </label>
              <p className="mg-b-0">
                <input id="clnt_name" name="supplier" value="" />
              </p>
            </div>
            {/* col */}
            <div className="col-6 col-sm">
              <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                Mobile Number
              </label>
              <p className="mg-b-0">
                <input id="mob" name="mobile_number" required value="" />
              </p>
            </div>
            {/* col */}
            <div className="col-sm mg-t-20 mg-sm-t-0">
              <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                Phone Number
              </label>
              <p className="mg-b-0">
                <input id="ph_num" name="phone_number" value="" />
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
                <input id="eid" name="email_id" value="" />
              </p>
            </div>
            <div className="col-6 col-sm-4">
              <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                Company
              </label>
              <p className="mg-b-0">
                <input id="comp" name="company" value="" />
              </p>
            </div>
            <div className="col-6 col-sm-4 mg-t-20 mg-sm-t-0">
              <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                GST Number
              </label>
              <p className="mg-b-0">
                <input id="gstn" name="gst_num" value="" />
              </p>
            </div>
            <div className="col-sm-4 mg-t-20 mg-sm-t-30">
              <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                Sector
              </label>
              <p className="mg-b-0">
                <input id="sect" name="sector" value="" />
              </p>
            </div>
            <div className="col-sm-4 mg-t-20 mg-sm-t-30">
              <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                Block
              </label>
              <p className="mg-b-0">
                <input id="blk" name="block" value="" />
              </p>
            </div>
            <div className="col-sm-4 mg-t-20 mg-sm-t-30">
              <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                Address
              </label>
              <p className="mg-b-0">
                <input id="addr" name="address" value="" />
              </p>
            </div>
          </div>
          {/* row */}
          <div className="row row-sm">
            <div className="col-sm mg-t-20 mg-sm-t-30">
              {" "}
              <div className="d-flex px-5 justify-content-end mr-5">
                <button
                  type="reset"
                  className="btn btn-sm btn-white mr-2"
                  style={{ zIndex: 1000 }}
                >
                  Reset
                </button>
                <button
                  id="submitBtn"
                  onClick={() => {
                    console.log("I am pressed");
                  }}
                  className="btn btn-sm  btn-icon mr-4 btn-primary"
                  style={{ zIndex: 1000 }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="contact-content">
          <div className="tab-content">
            <div id="contactInformation" className=" pd-20 pd-xl-25">
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
                        value={this.state.bill_num}
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
                        value={this.state.challan_date}
                        required
                      />
                    </p>
                  </div>
                  {/* col */}
                  {/* <div className="col-sm-4">
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
                  </div> */}
                  <div className="col-4">
                    <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                      supplier Name
                    </label>
                    <p className="mg-b-0">
                      <input
                        className="col-10"
                        onChange={this.onChangeHandler}
                        name="supplier"
                        value={this.state.supplier}
                      />
                    </p>
                  </div>
                </div>
                <div className="row mg-t-10">
                  {/* <div className="col-sm-6 col-lg-8 mg-t-10 mg-sm-t-0 mg-md-t-5">
                    <label className="tx-sans tx-uppercase tx-10 tx-medium tx-spacing-1 tx-color-03">
                      Billed by
                    </label>
                    <div
                      className="mg-t-n2"
                      style={{ flexDirection: "row", display: "flex" }}
                    >
                      <h6 className="tx-15 mg-b-2">{client.client_name}</h6>
                      &nbsp;
                      <h6 className="tx-15 mg-b-2">{client.company}</h6>
                    </div>
                    <p className="tx-12 mg-b-0">GST No: {client.gst_num}</p>
                    <p className="tx-12 mg-b-0">
                      Mob:{" " + client.mobile_number}{" "}
                    </p>
                  </div> */}
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
        </div>
      );
    }
  }
}
